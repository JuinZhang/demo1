let axios = require("axios");
const request = axios.create({
  baseURL: "https://conduit.productionready.io"
});
module.exports = { request };
