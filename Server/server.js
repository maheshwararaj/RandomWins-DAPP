// BackEnd Here
const {toEther,contract}=require('./ether');

const gameData=(luckyNumber,totalBetAmount,winners,share)=>{
    console.log(share);
    return{
        luckyNumber:luckyNumber,
        totalBetAmount:totalBetAmount,
        winners:winners,
        share:share
    }
}

let currentData;
let currentBets;
const betStats=[0,0,0,0];

const gameStats=(address,betAmount,selectedNumber,noOfbets)=>{
    betStats[selectedNumber-1]++;
    currentBets=noOfbets;
};
contract.on("NewBet",(a,b,c,d)=>{
    // console.log(`Player Address ${a} BetAmount ${toEther(b)} Number ${c} noOfbets ${d}`);
    currentStats=gameStats(Number(a),toEther(b),Number(c),Number(d));
    console.log(currentBets);
})
contract.on("GameResult", (a, b, c, d) => {
    // console.log(`luckyNumber ${a} totalBetAmount ${toEther(b)} winners ${c} share ${toEther(d)}`);
    gameData(Number(a),toEther(b),Number(c),toEther(d));
    resetBets();

    // console.log(currentData.luckyNumber);
});
function resetBets(){
    for(let i=0;i<4;i++){
        betStats[i]=0;
    }
}

module.exports={currentBets,betStats,currentData}



