const Quras = require('quras-js');

module.exports = async (args) => {
    const address = args._[1];

    if(!address) {
        error(`"${balance}" has no valid parameter!`, true);
        return;
    }

    var nodeAddress = Quras.CONST.QURAS_NETWORK.MAIN;
    if(args.test) {
        nodeAddress = Quras.CONST.QURAS_NETWORK.TEST;
    } else if (args.dev) {
        nodeAddress = Quras.CONST.QURAS_NETWORK.DEV;
    }

    const data = await Quras.api.qurasDB.getBalance(nodeAddress, address)
    return data.assets;
}
