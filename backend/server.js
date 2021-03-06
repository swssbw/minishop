const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const productsRouter = require("./routes/product");
const connectDatabase = require("./configDB");
const errorMiddleware = require("./middlewares/error");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routes/order");
const cors = require("cors");

app.use(cors());
dotenv.config();

app.set("port", process.env.PORT || 4000);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// config file 설정
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// DB연결
connectDatabase();

// Routes
app.use("/api/v1", productsRouter);
app.use("/api/v1", auth);
app.use("/api/v1", orderRouter);

// Middleware to handle errors
app.use(errorMiddleware);

app.listen(app.get("port"), () => {
  console.log(
    app.get("port"),
    "번 포트에서 대기중",
    `${process.env.NODE_ENV} 모드`
  );
});

// Handle 'Unhandled Promise rejections'
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("shutting down the server due to Unhandled Promise rejections");
  server.close(() => {
    process.exit(1);
  });
});
