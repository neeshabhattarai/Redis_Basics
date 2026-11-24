const { createClient, defineScript } = require("redis");
const { createIndex } = require("../service/search");

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  // password: process.env.REDIS_PASSWORD,
  scripts: {
    releaseLock: defineScript({
      NUMBER_OF_KEYS: 1,
      SCRIPT: `
       if(redis.call('GET',KEYS[1]) == ARGV[1]) then
        return redis.call('DEL',KEYS[1])
       else
        return 0
       end
      `,
      transformArguments: (key,lockValue) => [String(key),String(lockValue)],
      transformReply: (reply) => reply,
    }),
    getHighestBid: defineScript({
      NUMBER_OF_KEYS: 1,
      SCRIPT: `
      return redis.call('HMGET',KEYS[1],ARGV[1],ARGV[2])
      `,
      transformArguments: (key, arg1, arg2) => [
        String(key),
        String(arg1),
        String(arg2),
      ],
      transformReply: (reply) => reply,
    }),
    storeHighestBid: defineScript({
      NUMBER_OF_KEYS: 4,
      SCRIPT: `
      local itemKey=KEYS[1]
      local bidListKey=KEYS[2]
      local highestBidKey=KEYS[3]
      local userBidListKey=KEYS[4]
      local serializedBid=ARGV[1]
      local name=ARGV[2]
      local amount=ARGV[3]
      local userId=ARGV[4]

      if(redis.call('EXISTS',itemKey) == 0) then
       return {-1,0,0,0,0}
       end

       local amountInNumber=tonumber(amount)
       if( not amountInNumber or amountInNumber <= 0 ) then
       return {-2,0,0,0,0}
       end

      local currentHighestBid=tonumber(redis.call('HGET',itemKey,'highestBid'))
      if( not currentHighestBid or amountInNumber <= currentHighestBid ) then
        return {-3,0,0,0,0}
      end
      local result1= redis.call('RPUSH',bidListKey,serializedBid)
      redis.call('HSET',itemKey,'highestBid',amount,'highestBidUser',userId)
      redis.call('HINCRBY',itemKey,'bidsCount',1)
     local result3= redis.call('SADD',userBidListKey,serializedBid)
     local result4= redis.call('ZADD',highestBidKey,amountInNumber,name)
      return {1,result1,result3,result4}
      `,
      transformArguments: (KEY1,KEY2,KEY3,KEY4,serializedBid,name,amount,userId) => [
        String(KEY1),
        String(KEY2),
        String(KEY3),
        String(KEY4),
        String(serializedBid),
        String(name),
        String(amount),
        String(userId),
      ],
      transformReply: (reply) => [reply[0],reply[1],reply[2],reply[3]],
    }),
  },
});

redisClient.on('connect',async()=>{
  await createIndex(redisClient);
});

const connectRedis = async () => {
  await redisClient.connect();
  const result = await redisClient.getHighestBid(
    "item:apple",
    "highestBid",
    "highestBidUser",
  );
  console.log(result);
};

connectRedis().catch(console.error);
module.exports = redisClient;
