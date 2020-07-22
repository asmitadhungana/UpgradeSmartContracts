require('dotenv').config()

const HDWalletProvider = require("@truffle/hdwallet-provider");

const rinkebyMnemonic = process.env.MY_MNEMONIC
const infuraKey = process.env.INFURA_RINKEBY_KEY

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },

    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          rinkebyMnemonic,
          infuraKey
        );
      },
      network_id: 4,
    },
  },
};
