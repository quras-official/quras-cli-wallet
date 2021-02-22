const Quras = require('quras-js');
const fs = require('fs');
const homedir = require('os').homedir();

const path = require('path');
var aes256 = require('aes256');

module.exports = async (args) => {

    const toAddress = args._[1];
    const amount = args._[2];
    const password = args._[3];

    if(!toAddress || !amount || !password) {
        error(`"${Transfer}" has no valid parameter!`, true);
        return;
    }

    var nodeAddress = Quras.CONST.QURAS_NETWORK.MAIN;
    if(args.test) {
        nodeAddress = Quras.CONST.QURAS_NETWORK.TEST;
    } else if (args.dev) {
        nodeAddress = Quras.CONST.QURAS_NETWORK.DEV;
    }

    const rpcServer = new Quras.rpc.RPCClient(nodeAddress);

    var fromAddress = '';
    var privateKey = '';

    try {
        const data = fs.readFileSync(homedir + path.sep + 'wallet.dat', 'utf8');
        const decrypted = aes256.decrypt(password, data);
        const wallet = JSON.parse(decrypted);
        privateKey = wallet.priv_key;
        fromAddress = wallet.address;
      } catch (err) {
        console.error(err)
    }

    const data = await Quras.api.qurasDB.getBalance(nodeAddress, fromAddress) // Get the balance of from address.
    const balance = new Quras.wallet.Balance(data)
    const scriptHash = Quras.wallet.getScriptHashFromAddress(toAddress); // To address.
    const outputs = [{
        assetId: Quras.CONST.ASSET_ID['XQC'], // The type of asset that you want to send.
        value: amount, // amount to send.
        fee: 0.1, // fee
        scriptHash: scriptHash // The scripthash of "To address".
    }];

    const testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // create a transaction.

    testTx.sign(privateKey); // Sign the transaction using private key

    const result = await rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
    return result;
}