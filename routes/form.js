const express = require("express");
const queries = require("../db/queries");

const submitRoute = express.Router();

submitRoute.post("/", async (req, res) => {
  try {
    const insertResponse = await queries.createMessage(
      req.body.userName,
      req.body.userMessage
    );
    if (insertResponse.rowCount > 0) {
      res.redirect("/");
    } else {
      alert("form error");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = submitRoute;
