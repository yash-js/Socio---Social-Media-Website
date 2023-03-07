import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";
import cors from "cors";
const app = express();

// To Serve Images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));

const options = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

dotenv.config();

app.use(cors(options));

// MiddleWares
app.use(
  express.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

const mongoDb = process.env.DB;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

// Usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
const port = process.env.PORT;
app.listen(port, () => console.log("Server Running on Port : ", port));
