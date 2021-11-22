require("dotenv").config();
const { initializeServer } = require("./server/index");
const { initializeMongoDBServer } = require("./database/index");

const port /*: number | string */ =
  process.env.PORT ?? process.env.LOCAL_PORT ?? 5000;

(async () => {
  try {
    await initializeServer(port);
    await initializeMongoDBServer(process.env.MONGODB_STRING);
  } catch (error) {
    process.exit(1);
  }
})();
