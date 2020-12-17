//// this file is basically gonna store all our results from cmc for now...

const fetch = require("node-fetch");

let cache = {};

const updateCache = () => {
  getLatestListings().then(data => {
    cache.latestListings = data;
  });
};

const getCache = what => {
  if (cache[what]) {
    return cache[what];
  } else return { error: "not found in cache" };
}; //used to access cache in other files

const getLatestListings = async () => {
  console.log(process.env.APIKEY);
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  const headers = {
    "X-CMC_PRO_API_KEY": process.env.APIKEY
  };
  const response = await fetch(url, { method: "GET", headers: headers });
  return response.json();
};

updateCache();
setInterval(() => {
  console.log("updating cache!");
  updateCache();
}, 1200000);


module.exports = {getCache:getCache}