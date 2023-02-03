const getGameData = require("./getGameData.cjs");

const evaluateTotalDifficultyInEthernautGame = async () => {
    const difficultyMap = await getGameData();
    let totalDifficulty = 0;
    difficultyMap.forEach((level) => {
      totalDifficulty += parseInt(level.difficulty);
    });
    console.log(totalDifficulty)
    return totalDifficulty
  }

  evaluateTotalDifficultyInEthernautGame();