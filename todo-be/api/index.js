const app = require("./server");

module.exports = (req, res) => {
  return app(req, res); // Use the Express app to handle the request
};
