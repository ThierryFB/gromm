pragma solidity ^0.8.26;

contract Catalog {
    
    struct Product {
        address catalogAddress;
        string name;
        uint256 price;
        string description;
        string unitOfMeasure;
        string sku;
    }
    
    struct Supplier {
        string name;
    }

    struct Order {
        uint orderNumber;
        uint256 date;
        OrderItem[] items;
    }

    struct OrderItem {
        string sku;
        uint256 quantity;
    }

    Order public order;
    Order[] public orders;

    Product public product;
    Product[] public products;
    Supplier public supplier;
    string public catalogName;
    address public owner;

    mapping (string => Product) public skuToProduct;
    mapping (uint => Order) public orderNumberToOrder;

    event ProductUpdated(string name, string _sku, uint256 price);
    event ProductCreated(uint id, string name, uint256 price, string description, string unitOfMeasure, string _sku);

    event OrderCreated(uint indexed orderNumber);

    constructor(string memory _supplierName, string memory _catalogName) {
        supplier = Supplier(_supplierName);
        catalogName = _catalogName;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the supplier can call this function");
        _;
    }

    // function updateProduct(string memory _sku, string memory _name, uint256 _price, string memory _description, string memory unitOfMeasure) public onlyOwner {
    //     product.name = _name;
    //     product.price = _price;
    //     product.description = _description;
    //     product.unitOfMeasure = unitOfMeasure;
    //     emit ProductUpdated(_name, _sku, _price);
    // }

    function createProduct(string memory _name, uint256 _price, string memory _description, string memory unitOfMeasure, string memory _sku) public onlyOwner {
        uint id = products.length;
        Product memory newProduct = Product(address(this), _name, _price, _description, unitOfMeasure, _sku);
        products.push(newProduct);
        skuToProduct[_sku] = newProduct;
        emit ProductCreated(id, _name, _price, _description, unitOfMeasure, _sku);
        emit ProductUpdated(_name, _sku, _price);
    }

    function getProductBySku(string memory _sku) public view returns (Product memory) {
        return skuToProduct[_sku];
    }

    function generateOrderReference(uint index) internal pure returns (uint) {
        return index;
    }

    function createOrder(OrderItem[] memory _items) public {
        require(_items.length > 0, "Order must contain at least one item");
        uint256 orderDate = block.timestamp;
        uint orderIndex = orders.length + 1;
        uint orderNumber = generateOrderReference(orderIndex);
        Order storage newOrder = orders.push();
        newOrder.orderNumber = orderNumber;
        newOrder.date = orderDate;

        for(uint i = 0; i < _items.length; i++) {
            newOrder.items.push(OrderItem({
                sku: _items[i].sku,
                quantity: _items[i].quantity
            }));
        }

        orderNumberToOrder[orderNumber] = newOrder;
        emit OrderCreated(orderNumber);
    }

    function getOrderByOrderNumber(uint _orderNumber) public view returns (Order memory) {
        return orderNumberToOrder[_orderNumber];
    }

    function productCount() public view returns (uint) {
        return products.length;
    }

    function deleteAllProducts() public {
        delete products;
    }
}