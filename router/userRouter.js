const express = require("express");
const Router = express.Router();

const app = express();

const user = require("../model/user");

Router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!req.body) return res.err("not working");
    await user.create({
      name,
      password,
      amount: 100,
    });
    return res.render("index", {
      message: "account creaated susscesfully",
    });
  } catch (err) {}
});

Router.post("/debit/login", async (req, res) => {
  const { name, password } = req.body;

  const result = await user.findOne({ name, password });
  if (!result)
    return res.render("login", {
      message: "invalid password or username ",
    });

  return res.render("debit", {
    name: name,
    amount: result.amount,
  });
});

Router.post("/debit", async (req, res) => {
  const { name, Amount, debitAmount } = req.body;
  const result = await user.findOne({ name, Amount });
  if (debitAmount > 0) {
    const FinalAmount = result.amount - debitAmount;
    const updateAmount = await user.findOneAndUpdate(
      { name: name }, // filter
      { $set: { amount: FinalAmount } }, // update
      { returnDocument: "after" }, // updated document return karega
    );
    return res.render("debit", {
      name: name,
      amount: updateAmount.amount,
    });
  }
});

Router.post("/credit/login", async (req, res) => {
  const { name, password } = req.body;

  const result = await user.findOne({ name, password });
  if (!result)
    return res.render("clogin", {
      message: "invalid password or username ",
    });
  return res.render("credit", {
    name: name,
    amount: result.amount,
  });
});

Router.post("/credit", async (req, res) => {
  try {
    const { name, creditAmount } = req.body;

    // Convert to number
    const amountToAdd = Number(creditAmount);

    if (amountToAdd > 0) {
      const result = await user.findOne({ name });

      if (!result) {
        return res.render("error", { message: "User not found" });
      }

      const FinalAmount = result.amount + amountToAdd;

      const updateAmount = await user.findOneAndUpdate(
        { name },
        { $set: { amount: FinalAmount } },
        { returnDocument: "after" } // or { new: true }
      );

      return res.render("credit", {
        name: updateAmount.name,
        amount: updateAmount.amount,
      });
    } else {
      return res.render("Clogin", { message: "Invalid credit amount" });
    }
  } catch (err) {
    console.error(err);
    return res.render("error", { message: "Something went wrong" });
  }
});


module.exports = Router;
