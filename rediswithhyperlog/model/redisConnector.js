const { createClient, defineScript } = require("redis");

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  // password: process.env.REDIS_PASSWORD,
  scripts: {
    addNumber: defineScript({
      NUMBER_OF_KEYS: 1,
      SCRIPT: `
      return redis.call('HMGET',KEYS[1],ARGV[1],ARGV[2])
      `,
      transformArguments: (key,arg1,arg2) => [String(key),String(arg1),String(arg2)],
      transformReply: (reply) => (reply),
    }),
  },
});

const connectRedis = async () => {
  await redisClient.connect();
  const result = await redisClient.addNumber('item:apple','highestBid','highestBidUser');
  console.log(result);
};

connectRedis().catch(console.error);
module.exports = redisClient;
