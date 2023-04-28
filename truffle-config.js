module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Change this to the port number used by Ganache
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.8.0", // Change this to the version of Solidity you're using
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
