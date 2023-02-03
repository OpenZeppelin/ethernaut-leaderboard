

let gameData;

const getGameData = async () => { 
   if (!gameData) {
        const response = await fetch('https://raw.githubusercontent.com/OpenZeppelin/ethernaut/master/client/src/gamedata/gamedata.json')
        gameData = await response.json()
    }
    return gameData
}

module.exports = getGameData;