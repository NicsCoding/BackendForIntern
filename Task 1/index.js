const express = require("express");
const { MongoClient } = require("mongodb");
const router = require("./routes/routes");
require("dotenv").config();

const app = express();
app.use(express.json());

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
// const multer = require("multer");
const dbName = "events";

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const db = client.db(dbName);
    app.locals.db = db;

    app.use("/api/v3/app", router);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main().catch(console.error);
