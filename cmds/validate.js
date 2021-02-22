const Quras = require('quras-js');

module.exports = async (args) => {
  const address = args._[1];
  const isAddress = Quras.wallet.isAddress(address);
  return isAddress;
}
