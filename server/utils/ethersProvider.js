const { ethers } = require("ethers");

// Replace with your actual GetBlock JSON-RPC URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.getblock.io/YOUR-TOKEN-HERE/jsonrpc";

const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);

module.exports = provider;
