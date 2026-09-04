const express = require("express");
const dns = require("dns");
const path = require("path")

const app = express();

const { connect } = require("./connection");
const userRouter = require("./router/userRouter");
const staticRouter = require("./router/staticRouter");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dns.setServers(["1.1.1.1", "8.8.8.8"]);


connect(
  "mongodb+srv://prince:prince_001@cluster0.ayi7vnf.mongodb.net/ATM?appName=Cluster0",
);

app.set("view engine","ejs");
app.set("viwes",path.resolve("./views"));

app.use("/", staticRouter);
app.use("/user",userRouter);

app.listen("18012", () => console.log("server start on 18012"));
