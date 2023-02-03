const callBlockChain = require("./callBlockchain.cjs");
const filterLogs = require("./filterLogs.cjs");
const processFilteredData = require("./processFilteredData.cjs");
const initialiseNodeProvider = require("./initialiseNodeProvider.cjs");
const compileNetworkPlayersBoard = require("./compileNetworkPlayersBoard.cjs");
const consoleCustomiser = require("../../../utils/consoleCustomiser.cjs");
const { logger } = consoleCustomiser({ delay: 50, randomized: true });
const Web3 = require("web3");
const networks = require("../../../utils/networkDetails.json");
const fs = require("fs");

const generateAllBoards = async () => {
  for (let network of networks) {
    await generateNetworkBoard(network, logger);
  }
  compileNetworkPlayersBoard(networks, logger);
  await logger(
    "prais'ed be! the players played the players game and got written on the #NetworkPlayersBoard. right on!"
  );
};

const generateNetworkBoard = async (network, log) => {
  const fromBlock = network.fromBlock;
  const toBlock = network.toBlock;
  const switchoverBlock = network.switchoverBlock;
  const mappingData = require(`../../../networks/${String(
    network.name
  ).toLowerCase()}/levelsMapping.json`);
  const nodeProvider = initialiseNodeProvider(network, logger);
  console.log("Calling blockchain for logs", network.name);
  const blockchainLogs = await callBlockChain(
    network,
    nodeProvider,
    fromBlock,
    toBlock,
    switchoverBlock,
    log
  );
  await logger(
    "Cwor blimey, " + blockchainLogs.length + " logs have been found"
  );
  const web3 = new Web3();
  console.log("Filtering logs", network.name);
  const filteredLogs = await filterLogs(
    blockchainLogs,
    nodeProvider,
    fromBlock,
    switchoverBlock,
    web3,
    mappingData
  );
  const filteredDataPath = `client/leaderboard/networks/${String(
    network.name
  ).toLowerCase()}/filtered${network.name}Data.json`;
  fs.writeFileSync(filteredDataPath, JSON.stringify(filteredLogs));
  await logger(
    "gracious me, " + filteredLogs.length + " logs have been written"
  );
  const networkData = processFilteredData(filteredLogs);
  await logger(
    "golly gosh, " + networkData.length + " logs have been processed"
  );
  const networkDataPath = `client/leaderboard/networks/${String(
    network.name
  ).toLowerCase()}/${network.name}NetworkBoard.json`;
  fs.writeFileSync(networkDataPath, JSON.stringify(networkData));
  await logger(
    "oh my, scores on the doors for " + network.name + " have been compiled"
  );
};

generateAllBoards();
