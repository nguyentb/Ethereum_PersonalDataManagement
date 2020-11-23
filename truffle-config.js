const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "atom green circle false illness morning humor comic ethics token dice legend";
//const mnemonic = process.env.NMEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b35ad1a0dfe64f8296a415a89c4c7bac");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },

  compilers: {
    solc: {
      version: '0.4.25',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
