const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const redisConnector = async () => {
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Redis error:", error);
  }
  return null;
};
redisConnector().then((client) => {
  client.on('error', (error) => {
    console.error("Redis error:", error);
  });
});
module.exports = {client};
