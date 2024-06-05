import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectDB } from "./db/mongo.js";
import UserRouter  from "./routers/User.js"
import FoodRouter  from "./routers/Food.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});
app.use("/api/user/",UserRouter)
app.use("/api/food/",FoodRouter)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
const startServer = () => {
  try {
    connectDB();
    app.listen(8080, () =>
      console.log("server started on http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
};
startServer();
