const express = require("express");
const cors = require("cors");
const twitter = require("./twitter");
const useServerSentEventsMiddleware = require("./useServerSentEventsMiddleware");

require("dotenv").config();
twitter.key(process.env.TWITTER_TOKEN);
const PORT = process.env.PORT;

const server = express();
server.use(cors());

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

const mockStats = {
  likes: 0,
  comments: 0,
  retweets: 0,
};

const incrementByRandomAmount = (val) => val + Math.floor(Math.random() * 5);
const incrementMockStats = () => {
  Object.entries(mockStats).forEach(
    ([key, value]) => (mockStats[key] = incrementByRandomAmount(value))
  );
  return mockStats;
};

server.get("/twitter-stats-mock/:conversationId", (req, res) => {
  res.json(incrementMockStats());
});

server.get("/twitter-stats/:conversationId", async (req, res) => {
  const resp = await twitter.getTweetMetrics(req.params.conversationId);
  console.log(resp);
  const publicMetrics = resp.data.public_metrics;
  res.json({
    likes: publicMetrics.like_count,
    comments: publicMetrics.reply_count,
    retweets: publicMetrics.retweet_count,
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
    server.listen(PORT, () =>
      console.log(`Example app listening at 
      http://localhost:${PORT}`)
    );
  });
