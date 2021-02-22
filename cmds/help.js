const menus = {
  main: `
    quras-cli [command] <options> <--server>

    create .............. Create wallet
    balance ............. Check Balance
    transfer ............ Transfer Quras Coin
    history ............. Transaction History
    validate   ............. Validate Address
    
    Example:
    quras-cli balance [Address] --dev
    quras-cli balance [Address] --test`,

  create: `
    quras-cli create [Password]`,

  balance: `
    quras-cli balance [Address]`,

  transfer: `
    quras-cli transfer [To] [Amount] [Password]`,

  validate: `
    quras-cli validate [Address]`,

  history: `
    quras-cli history [Address]`
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
