import express from "express";
import { router } from "./Router/router";
import { testDatabaseConnection } from "./Services/database";
import { ENV } from "./configuration";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', router);

const port: number = ENV.PORT;

testDatabaseConnection()
  .then(() => {
    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });