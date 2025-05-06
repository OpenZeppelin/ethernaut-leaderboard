const { Alchemy , Network} = require("alchemy-sdk");
const Web3 = require("web3");
require("dotenv").config();

const resolveNetworkApiKey = (network) => {
  let apiKey;

  switch (network.name) {

    case "Sepolia": {
      apiKey = process.env.SEPOLIA_API_KEY ? process.env.SEPOLIA_API_KEY : 0;
      break;
    }

    case "Arbitrum": {
      apiKey = process.env.ARB_SEPOLIA_API_KEY
        ? process.env.ARB_SEPOLIA_API_KEY
        : 0;
      break;
    }

    case "Optimism": {
      apiKey = process.env.OPT_SEPOLIA_API_KEY
        ? process.env.OPT_SEPOLIA_API_KEY
        : 0;
      break;
    }

    case "Amoy": {
      apiKey = process.env.AMOY_API_KEY ? process.env.AMOY_API_KEY : 0;
      break;
    }

    default: {
      apiKey = -1;
    }
  }

  return apiKey;
};

const initialiseAlchemy = (network) => {
  const apiKey = resolveNetworkApiKey(network);
  if (apiKey === 0) throw new Error(`API KEY for ${network.name} is missing`);
  if (apiKey === -1) throw new Error(`Unknown network ${network.name}`);
  const settings = {
    apiKey: apiKey,
    network: network.networkDeclaration  ,
  };
  const alchemy = new Alchemy(settings);
  return alchemy.core;
};

const initialiseInfura = (network) => {
  const apiKey = resolveNetworkApiKey(network);
  if (apiKey === 0) throw new Error(`API KEY for ${network.name} is missing`);
  if (apiKey === -1) throw new Error(`Unknown network ${network.name}`);
  const infuraWeb3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network.name.toLowerCase()}.infura.io/v3/${apiKey}`
    )
  );
  return {
    ...infuraWeb3.eth,
    getLogs: infuraWeb3.eth.getPastLogs,
  };
};

const initialiseNodeProvider = (network) => initialiseAlchemy(network);

module.exports = initialiseNodeProvider;
