
const axios = require('axios');
let gameData;

const getGameData = async () => { 
   if (!gameData) {
        const response = await axios.get('https://raw.githubusercontent.com/OpenZeppelin/ethernaut/master/client/src/gamedata/gamedata.json')
        gameData = response.data
    }
    return gameData
}

module.exports = getGameData;