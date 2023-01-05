const tryCatchWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const errorHanler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  console.error("API Error: ", err.message);

  return res.status(500).json({ message: `Internal Server Error` });
};

module.exports = {
  tryCatchWrapper,
  errorHanler,
};
