// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Game {
    struct Bet {
        uint256 amount;
        uint8 number;
    }

    mapping(address => Bet) public bets;
    address[] public playerList; 
    uint8 public luckyNumber;
    uint256 public totalBetAmount = 0;
    address public owner;
    uint noOfbets=0;

    event NewBet(address indexed player, uint256 amount, uint8 number,uint noOfbets);
    event GameResult(uint8 luckyNumber, uint256 totalBetAmount, uint256 winners, uint256 share);
    event GameStats(uint256[4] betStats);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender; 
    }

    function addBet(uint8 _number) external payable {
        require(bets[msg.sender].amount == 0, "You have already placed a bet");

        bets[msg.sender] = Bet(msg.value, _number);
        playerList.push(msg.sender); 
        totalBetAmount += msg.value;
        noOfbets++;

        emit NewBet(msg.sender, msg.value, _number,noOfbets);
    }

   function generateNumber() external {

    uint256 nonce = block.timestamp; 
    luckyNumber = uint8(uint256(keccak256(abi.encodePacked(nonce))) % 4 + 1);
    uint256 winners = 0;

    
    for (uint256 i = 0; i < playerList.length; i++) {
        if (luckyNumber == bets[playerList[i]].number) {
            winners++;
        }
    }

    uint256 share = 0;
    if (winners > 0) {
        uint256 payout = (totalBetAmount * 90) / 100;
        share = payout / winners;

        for (uint256 i = 0; i < playerList.length; i++) {
            if (luckyNumber == bets[playerList[i]].number) {
                payable(playerList[i]).transfer(share);
            }
        }
    }

    emit GameResult(luckyNumber, totalBetAmount, winners, share);
    resetGame();
}


    function resetGame() private {
        for (uint256 i = 0; i < playerList.length; i++) {
            delete bets[playerList[i]];
        }
        delete playerList; 
        totalBetAmount = 0;
        luckyNumber = 0;
        noOfbets = 0;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner).transfer(balance);
    }
}
