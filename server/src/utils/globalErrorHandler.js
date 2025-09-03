const { sendResponse } = require("./sendResponse");

const globalErrorHandler = async (err, req, res) => {
  res.status(err.status || 500).json(sendResponse.fail(err.message, error));
};

module.exports = {
  globalErrorHandler,
};
