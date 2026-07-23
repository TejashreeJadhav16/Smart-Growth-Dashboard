exports.formatResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

exports.errorResponse = (message = "Error") => {
  return {
    success: false,
    message,
  };
};