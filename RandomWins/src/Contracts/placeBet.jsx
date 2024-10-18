import { ethers } from "ethers";
  //To Interect with Deployed contract 
  
  async function placeBet (num) {
    if(window.ethereum){
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress="0x65Cad9685add8277BB86f081C39bda00a240f5c6";
      const contractABI=[
          "function addBet(uint8 _id) payable external"
      ];
      const signer=provider.getSigner();
      const contract=ethers.Contract(contractAddress,contractABI,provider);
      try{
        const amount=ethers.util.parseEther("0.01");
        const contractSign=contract.connect(signer);
        const tx=await contractSign.addBet(num,{value:amount});
        await tx.wait();
      }
      catch(e){
        console.error(e);
      }
    }
      
    }

   export default placeBet;