const express = require("express");
const Router = express.Router();

Router.get("/",(req,res)=>{
    return res.render("login")
})
Router.get("/create",(req,res)=>{
    return res.render("index");
})
Router.get("/credit",(req,res)=>{
    return res.render("Clogin");
})

module.exports = Router;
