const express = require("express");
const redis = require("redis");
const app = express();
const itemViewKey=()=>"itemView";
const itemKey=()=>"item";
app.use(express.json());

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const connectRedis = async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
};


app.post("/setItem", async (req, res) => {
  const {name}=req.body;
  const key=`item:${name}`;
  await Promise.all([
    redisClient.hSet(key, {name:name,view:0}),
    redisClient.zAdd(itemViewKey(), {score:0, value:name}),
  ]);
  res.status(200).send({message:"Item set successfully",key});
});

app.get("/getItem", async (req, res) => {
  const {name}=req.body;
  const key=`item:${name}`;
  const result=await redisClient.hGetAll(key);
  if(result){
    res.status(200).send({message:"Item get successfully",result});
  }else{
    res.status(500).send({message:"Failed to get item"});
  }
});

app.post("/addProduct", async (req, res) => {
    const {itemKey}=req.body;
    const key="product";
    await redisClient.sAdd(key, itemKey);
    res.status(200).send({message:"Product added successfully",key});
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/addView", async (req, res) => {
  const {name}=req.body;
const itemKey=`item:${name}`;

  await Promise.all([
    redisClient.hIncrBy(itemKey, "view", 1),
    redisClient.zIncrBy(itemViewKey(), 1, name),
  ]);
  res.status(200).send({message:"View added successfully",itemKey});
});
app.post("/getScoreItem", async (req, res) => {
  const {itemKey}=req.body;
  const result=await redisClient.zScore(itemViewKey(), `item:${itemKey}`);
  res.status(200).send({message:"Top item get successfully",result});
});

app.get("/getTopItems", async (req, res) => {
  const result=await redisClient.zRangeWithScores(itemViewKey(), 10, 0,{
    BY:"SCORE",
    REV:true,
    LIMIT:{ 
      offset:0,
      count:10,
    }
  });
  res.status(200).send({message:"Top items get successfully",result});
});  

app.get("/sortItem", async (req, res) => {
  const result=await redisClient.sort(itemViewKey(), {
    BY:"item:*->view",
    DIRECTION: "ASC",
    GET:[`#`,itemKey()+":*->view"],
    LIMIT:{
      offset:0,
      count:10,
    },
  });
  console.log(result);
  res.status(200).send({message:"Top items get successfully",result});
});

app.post("/deleteItem", async (req, res) => {
  const {name}=req.body;
  const key=`item:${name}`;
  await redisClient.zRem(itemViewKey(), name);
  await redisClient.hDel(key, "name", "view");
  res.status(200).send({message:"Item deleted successfully",key});
});

app.get("/allitems",async (req,res)=>{
  const result=await redisClient.zRangeWithScores(itemViewKey(), 0, -1);
  res.status(200).send({message:"All items get successfully",result});
});
const startServer = async () => {
  try {
      await connectRedis();

      app.listen(3000, () => {
          console.log("Server running on port 3000");
      });
  } catch (error) {
      console.error("Application startup failed:", error);
      process.exit(1);
  }
};

startServer();