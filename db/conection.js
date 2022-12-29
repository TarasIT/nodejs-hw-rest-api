const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectMongodb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = {
  connectMongodb,
};
