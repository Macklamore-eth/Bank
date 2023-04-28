const CONTRACT_ADDRESS = "0x7ae63800846df3D8C38d094686C95BDEF08D7D44";
const ABI = JSON.parse(`[{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }]`);



let web3;
let contract;
let userAddress;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("No Ethereum provider detected");
      }
      
    

  userAddress = (await web3.eth.getAccounts())[0];
  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  updateBalance();
}

async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  const weiAmount = web3.utils.toWei(amount, "ether");
  await contract.methods.deposit().send({ from: userAddress, value: weiAmount });
  updateBalance();
}

async function withdraw() {
    const amount = document.getElementById("withdrawAmount").value;
    const weiAmount = web3.utils.toWei(amount, "ether");
    await contract.methods.withdraw(weiAmount).send({ from: userAddress }); // Corrected method name
    updateBalance();
  }

async function updateBalance() {
  const weiBalance = await contract.methods.getBalance(userAddress).call();
  const ethBalance = web3.utils.fromWei(weiBalance, "ether");
  document.getElementById("balance").innerText = `${ethBalance} ETH`;
}

document.getElementById("depositButton").addEventListener("click", deposit);
document.getElementById("withdrawButton").addEventListener("click", withdraw);

init();
