const Quras = require('quras-js');
var aes256 = require('aes256');
const homedir = require('os').homedir();
const fs = require('fs');
const path = require('path');

module.exports = async (args) => {

  const password = args._[1];
  if(!password) {
    console.log("Password required");
    return;
  }

  const myAccount = new Quras.wallet.Account();
  const account = {
    priv_key: myAccount.privateKey,
    pub_key: myAccount.publicKey,
    address: myAccount.address,
    script_hash: myAccount.scriptHash
  };

  const walletStr = JSON.stringify(account);
  const encrypted = aes256.encrypt(password, walletStr);
  fs.writeFileSync(homedir + path.sep + 'wallet.dat', encrypted);
  return account;
}
