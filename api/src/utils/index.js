const { formatUnits } = require('ethers').utils

exports.asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

exports.cleanStruct = ({ solidityObject, decimals = 2 }) => {
  const cleaned = Object.fromEntries(
    Object.entries(solidityObject)
      .filter(([key]) => isNaN(key))
      .map(([key, value]) => {
        // Check if the value is a BigNumber
        if (value && value._isBigNumber) {
          return [key, parseFloat(formatUnits(value, decimals))]
        }
        return [key, value]
      })
  )
  return cleaned
}
