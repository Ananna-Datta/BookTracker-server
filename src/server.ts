import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routes from "./modulers/routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",routes);

app.get("/", (req, res) => {
  res.send({ success: true, message: "I am here" });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

async function server() {
  try {
    await mongoose.connect(config.database_url!, {
      serverSelectionTimeoutMS: 30000, // optional: increase timeout
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

server();