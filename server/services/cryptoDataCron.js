const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cron = require("node-cron");

const DATA_DIR = path.join(__dirname, "../cachedData");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const currency = "usd";

const urls = {
  CoinList: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  TrendingCoins: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
  // Add more endpoints as needed, like HistoricalChart or SingleCoin
};

const fetchAndSave = async (label, url) => {
  try {
    const response = await axios.get(url);
    const filePath = path.join(DATA_DIR, `${label}.json`);
    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
    console.log(`[${new Date().toISOString()}] Updated: ${label}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Failed: ${label}`, err.message);
  }
};

// Run every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  console.log("⏰ Running crypto data fetch task...");
  for (const [label, url] of Object.entries(urls)) {
    await fetchAndSave(label, url);
  }
});
