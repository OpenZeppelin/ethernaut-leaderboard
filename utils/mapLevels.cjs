const fs = require("fs");
const networks = require("./networkDetails.json");
const getGameData = require("./getGameData.cjs");

let gameData;

const createDifficultyMaps = async () => {
  gameData = getGameData();
  for (network of networks) {
    const difficultyMapPath = `networks/${String(network.name).toLowerCase()}/difficultyMap${network.name}.json`;
    const difficultyMap = await mapLevels(network);
    fs.writeFileSync(difficultyMapPath, JSON.stringify(difficultyMap));
  }
};

const getGameDataDeploy = async (network) => { 
  const result = await fetch(`https://raw.githubusercontent.com/OpenZeppelin/ethernaut/master/client/src/gamedata/deploy.${network}.json`)
  const data = await result.json()
  return data;
}

const mapLevels = async (network) => {
  const networkLevelsObject = await getGameDataDeploy(String(network.deployName).toLowerCase())
  let gameLevelsArray = gameData["levels"];
  let nameData = [];
  const figureOutGameAddressFromIndex = (index) => {
    let address = networkLevelsObject[index]
    return address;
  }
  gameLevelsArray.forEach((level, index) => {
    try {
      let entry = {
        name: level.name,
        difficulty: level.difficulty,
        address: figureOutGameAddressFromIndex(index),
      };
      nameData.push(entry);
    } catch (error) {}
  });

  return nameData;
};



module.exports = createDifficultyMaps
