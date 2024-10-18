const{ethers}=require('ethers');

//TO CONNECT WITH INFURA
const network=process.env.ETHEREUM_NETWORK;
const provider=new ethers.InfuraProvider(network,process.env.INFURA_API_KEY);
const signer=new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY).connect(provider);

//TO CONNECT WITH REMIX DEPLOYED CONTRACT
const contractAddress="0x65Cad9685add8277BB86f081C39bda00a240f5c6";
const contractABI=[
    "function addBet(uint8 _id) payable external",
    "function generateNumber() external",
    "event NewBet(address indexed player,uint amount,uint8 number)",
    "event GameResult(uint8 luckyNumber, uint256 totalBetAmount, uint256 winners, uint256 Share)"
];
const contract=new ethers.Contract(contractAddress,contractABI,provider);

const gameResult=async ()=>{
    try{
        const signContract=contract.connect(signer);
        await signContract.generateNumber();
    }
    catch(e){
        console.error(e);
    }
    

}