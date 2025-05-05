// utils/jsonRpc.js
const axios = require('axios');

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL; // Ensure this is set in your .env file

const jsonRpcRequest = async (method, params = []) => {
  try {
    const response = await axios.post(
      SEPOLIA_RPC_URL,
      {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(`Error in JSON-RPC request: ${method}`, error);
    throw error;
  }
};

module.exports = jsonRpcRequest;
