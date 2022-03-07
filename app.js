const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/route");
const appError = require("./utils/appError");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const connectDb = async () => {
  try {
    const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch {
    console.log("Failed to connect to database");
  }
};
connectDb();
app.get("/", (req, res) => {
  res.json({
    ok: true,
    res: "the request was successful,no data to show",
  });
});
app.use("/api", router);

//error handler for
// all = get,post,etc etc requests
app.all("*", (req, res, next) => {
  next(
    new appError(`The requested page ${req.originalUrl} was not found`),
    404
  );
});

//global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
