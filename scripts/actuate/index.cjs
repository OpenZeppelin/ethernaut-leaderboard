const refreshEthernautBasedData = require("./refreshEthernautBasedData.cjs");
const crawlForFreshEntriesAndUpdateNetworkBoard = require("../crawlers/crawlNewData/index.cjs");
const writeLeaderBoards = require("./writeLeaderBoards.cjs");
const consoleCustomiser = require("../../utils/consoleCustomiser.cjs");
const { logger } = consoleCustomiser({ delay: 50, randomized: true }); 
const axios = require('axios');



const trigger = async () => {
  /**
   * trigger this script to run the entire leaderboard update process. run $ yarn "leaderboard:triggerNextCrawl"
   * NB fetchAndAddAliases is not yet functional, contained within scripts/crawlers/crawlNewData/crawlForFreshEntriesAndUpdateNetworkBoard()
   */
  await setGameData()
  await refreshEthernautBasedData();
  await crawlForFreshEntriesAndUpdateNetworkBoard();
  await writeLeaderBoards(logger);  

  // await logger("gather round, all ye faithful! The crawl was a success! See you next cron job, git hubber!")
};

const setGameData = async () => { 
  const response = await axios.get('https://raw.githubusercontent.com/OpenZeppelin/ethernaut/master/client/src/gamedata/gamedata.json')
  const gameData = response.data
  globalThis.gameData = gameData
}

trigger();
