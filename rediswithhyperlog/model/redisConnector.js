const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});
const connectRedis = async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });

  redisClient.on("error", (err) => {
    console.log("Error connecting to Redis", err);
  });
};

connectRedis();

module.exports = redisClient;
