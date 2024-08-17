var express = require("express");
var router = express.Router();
const queries = require("../db/queries");

// const messageSchema = require("../schema/message");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const messages = await queries.getMessages();
    console.log(messages);
    // res.json({
    //   success: true,
    //   messages: messages,
    // });
    res.render("index", { title: "Mini Message Board", messages: messages });
  } catch (error) {
    res.json({
      error: error.messages,
    });
  }
});

router.get("/addMessage", function (req, res) {
  res.render("form");
});

module.exports = router;
