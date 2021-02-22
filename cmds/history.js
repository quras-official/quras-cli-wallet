const Quras = require('quras-js');

module.exports = async (args) => {
    const address = args._[1];

    var nodeAddress = Quras.CONST.QURAS_NETWORK.MAIN;
    if(args.test) {
        nodeAddress = Quras.CONST.QURAS_NETWORK.TEST;
    } else if (args.dev) {
        nodeAddress = Quras.CONST.QURAS_NETWORK.DEV;
    }

    const history = await Quras.api.qurasDB.getTransactionHistory(nodeAddress, address);
    return history;
}
