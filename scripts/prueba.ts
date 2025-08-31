import { Web3 } from 'web3';

// Instantiate a web3 object by passing the RPC URL of Lisk Sepolia.
const web3 = new Web3('https://rpc.sepolia-api.lisk.com');

async function getLatestBlock() {
    const latestBlock = await web3.eth.getBlockNumber()
    console.log("The latest block's number is:", latestBlock);
}

getLatestBlock();

