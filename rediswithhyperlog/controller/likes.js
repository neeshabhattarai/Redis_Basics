const redisClient = require("../model/redisConnector");
const {itemKey,itemViewedKey,userKey,itemLikesKey, userLikesItemKey}=require("../service/key");

const addView=async(req,res)=>{
    const {name,userId}=req.body;
    if(!name || !userId){
        return res.status(400).send({message:"Name and userId are required"});
    }
    const key=itemViewedKey(name);
    const viewed=await redisClient.pfAdd(key,userKey(userId).toString());
    if(viewed){
        return res.status(200).send({message:"Viwed added successfully"});
    }
    else{
        return res.status(400).send({message:"User has already viewed the item"});
    }
};

const addLike=async(req,res)=>{
    const {name,userId}=req.body;
    if(!name || !userId){
        return res.status(400).send({message:"Name and userId are required"});
    }
    const key=itemKey(name);
    const liked=await redisClient.sAdd(itemLikesKey(name),userId.toString());
    if(liked){
        await redisClient.hIncrBy(key,"likes",1);
        await redisClient.zAdd(userLikesItemKey(userId),{score:Date.now(),value:key});
        return res.status(200).send({message:"Liked added successfully"});
    }else{
        return res.status(400).send({message:"User has already liked the item"});
    }
};

module.exports = { addView, addLike };