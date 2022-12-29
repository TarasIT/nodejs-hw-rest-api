const tryCatchWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = {
  tryCatchWrapper,
  httpError,
};
