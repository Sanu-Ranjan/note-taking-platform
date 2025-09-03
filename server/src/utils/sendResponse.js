const sendResponse = {
  success(message, data) {
    return {
      success: true,
      message: message,
      data: data,
    };
  },
  fail(message, details) {
    return {
      success: false,
      error: message,
      details: details,
    };
  },
};

module.exports = {
  sendResponse,
};
