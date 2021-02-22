const minimist = require('minimist')
const error = require('./utils/error')

module.exports = async () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  switch (cmd) {
    case 'create':
      const wallet = await require('./cmds/create')(args);
      console.log(wallet);
      return wallet;
    case 'balance':
      const balance = await require('./cmds/balance')(args);
      console.log(balance);
      return balance;
    case 'transfer':
      const result = await require('./cmds/transfer')(args);
      console.log(result);
      return result;
    case 'history':
      const history = await require('./cmds/history')(args);
      console.log(history);
      return history;
    case 'validate':
      const isAddress = await require('./cmds/validate')(args);
      console.log(isAddress);
      return isAddress;
    case 'help':
      require('./cmds/help')(args);
      break;
    case 'version':
      require('./cmds/version')(args);
      break;
    default:
      error(`"${cmd}" is not a valid command!`, true);
      break
  }
}
