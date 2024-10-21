const { ethers } = require("ethers");
require('dotenv').config();
const contractJSON = require('../build/contracts/Game.json');
const network = process.env.ETHEREUM_NETWORK;

// Check if using Ganache or Infura
let provider;
if (network === 'ganache') {
    // Use JsonRpcProvider for local Ganache instance
    provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
} else {
    // Use InfuraProvider for other networks
    console.log('Using Infura for network:', network);
    provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY);
}

// Create a signer using the private key
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

// Connect with the deployed contract
// change network if not using ganache
const contractAddress = contractJSON.networks[5777]?.address; 
if (!contractAddress) {
    throw new Error('Contract address is undefined. Check your contract deployment.');
}
const contractABI = contractJSON.abi;
const contract = new ethers.Contract(contractAddress, contractABI, signer);

//wei TO Ether
const toEther=(wei)=>{
    return wei/Math.pow(10,18);
} 

const gameResult = async () => {
    try {
        const tx = await contract.generateNumber();
        console.log(`Transaction sent: ${tx.hash}`);
        await tx.wait();
        
    } catch (e) {
        console.error("Error generating number:", e);
    }
};

module.exports = {toEther,contract,gameResult};
