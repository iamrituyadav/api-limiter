const express = require("express");
const connect = require("./configs/db");
const redis = require("./redis-client");
const User = require("./models/index.model");

const app = express();
app.use(express.json());

const indexController = require("./controllers/index.controller");


app.post(
  "/users",
  async (req, res, next) => {
    const ip = (
      req.headers[" x-forwarded-for"] || req.connection.remoteAddress
    ).slice(0, 9);

    const calls = await redis.incr(ip);

    if (calls === 1) {
      await redis.expire(ip, 60);
    }

    if (calls > 10) {
      return res.status(503).json({
        response: " error ",
        callsInAMinute: calls,
      });
    }

    next();

    
  },
  async (req, res) => {
    try {
      const users = await User.find().lean().exec();
      return res.send(users);
    } catch (e) {
      console.log(e.message);
    }
  }
);

app.listen(8080, async function () {
  try {
    await connect();
    console.log("Listening to port 8080");
  } catch (err) {
    console.log(err.message);
  }
});
