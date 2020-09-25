const express = require("express");
const cors = require("cors");
const twitter = require("./twitter");
require("dotenv").config();
twitter.key(process.env.TWITTER_TOKEN);

const server = express();
server.use(cors());
const port = 5000;

// create helper middleware so we can reuse server-sent events
const useServerSentEventsMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  // only if you want anyone to access this endpoint
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.flushHeaders();

  const sendEventStreamData = (data) => {
    const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
    res.write(sseFormattedResponse);
  };

  // we are attaching sendEventStreamData to res, so we can use it later
  Object.assign(res, {
    sendEventStreamData,
  });

  next();
};

const streamTwitterData = (req, res) => {
  twitter.connectToStream((data) => {
    console.log(data);
    res.sendEventStreamData(data);
  });
};

server.get(
  "/stream-twitter-data",
  useServerSentEventsMiddleware,
  streamTwitterData
);

server.get("/twitter-stats/:conversationId", (req, res) => {
  res.json({
    likes: 3923,
    comments: 382,
    retweets: 104,
  });
});

twitter
  .resetAllRules()
  .catch((e) => {
    console.error(`Error setting up Twitter: ${e.message}`);
    console.error(e.stack);
    process.exit(-1);
  })
  .then(() => {
    server.listen(port, () =>
      console.log(`Example app listening at 
      http://localhost:${port}`)
    );
  });
