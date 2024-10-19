import { ethers } from "ethers";
import Game from "../../../build/contracts/Game.json";
  //To Interect with Deployed contract 
  
  async function placeBet (num) {
    console.log(num);
    if(window.ethereum){
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress=Game.networks[5777].address;
      const contractABI=Game.abi;
      const signer=provider.getSigner();
      const contract=new ethers.Contract(contractAddress,contractABI,signer);
      try{
        const amount=ethers.utils.parseEther("0.01");
        const tx=await contract.addBet(1,{value:amount});
        await tx.wait();
      }
      catch(e){
        console.error(e);
      }
    }
      
    }

   export default placeBet;