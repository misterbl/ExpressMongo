import express from "express";
const app = express();
import bodyParser from "body-parser";

const port = process.env.PORT || 5656;
// routes go here
import bookRouter from "./Routes/bookRouter";
import mongoose from "mongoose";

const db = mongoose.connect("mongodb://127.0.0.1:27017/ProjectDataBase");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/Books", bookRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
