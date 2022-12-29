const app = require("./app");
const { connectMongodb } = require("./db/conection");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectMongodb();

    app.listen(PORT, () => {
      console.log("Database connection successful!");
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
    process.exitCode = 1;
  }
};
startServer();
