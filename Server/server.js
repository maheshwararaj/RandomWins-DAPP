
const { toEther, contract } = require('./ether');
const {gameEnd}=require('./result');


let currentBets = 0;
const betStats = [0, 0, 0, 0];
let lucky = 0 ;

const gameStats = (address, betAmount, selectedNumber, noOfbets) => {
    betStats[selectedNumber - 1]++;
    currentBets = noOfbets;
};
// execute after all placing new bets
contract.on("NewBet", (playerAddress, betAmount, selectedNumber, noOfbets) => {
    gameStats(Number(playerAddress), toEther(betAmount), Number(selectedNumber), Number(noOfbets));
});
// execute after game ends
contract.on("GameResult", (luckyNumber, totalBetAmount, winners, share) => {


    gameEnd(betStats,currentBets,Number(luckyNumber), toEther(totalBetAmount), Number(winners), toEther(share));
    lucky = luckyNumber
    resetBets();
});
function getLucky(){
    return lucky
}
function resetBets() {
    betStats.fill(0);
    currentBets=0;
    
}

const getCurrentBets = () => {
    return currentBets;
};


module.exports = {
    getCurrentBets, // tofetch live no of bets
    betStats,
    getLucky
};

