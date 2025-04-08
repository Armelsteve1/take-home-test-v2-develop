import app from "./app";
import { AppDataSource } from "./data-source";
import { Logger } from "./logger";

AppDataSource.initialize()
.then(() => {
  app.listen(3001, () => {
    Logger.info("Server is running on port 3001");
  });
})
.catch((error) => {
  Logger.error("Error during Data Source initialization", error);
});