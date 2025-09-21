const { sendResponse } = require("./sendResponse");

const globalErrorHandler = async (err, req, res) => {
  console.log(err.info);
  res.status(err.status || 500).json(sendResponse.fail(err.message, err));
};

module.exports = {
  globalErrorHandler,
};
