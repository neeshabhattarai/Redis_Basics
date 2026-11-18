const redisClient =require('../model/redisConnector');
const {DateTime}=require('luxon');
const {serializeBid,deserializeBid, itemKey,highestBidKey,userBidListKey,bidListKey}=require('../service/key');
const createBid = async (req,res)=>{
    const {amount,name,userId} = req.body;
    if(!name || !userId || !amount){
        return res.status(400).json({message:'Name, user and amount are required'});
    }
    const item=await redisClient.hGetAll(itemKey(name));
    if(!item){
        return res.status(404).json({message:'Item not found'});
    }
    if(Number(amount)<=Number(item.highestBid)){
        return res.status(400).json({message:'Bid amount is less than the highest bid'});
    }
    const dateInMilliseconds=DateTime.now().toMillis();
    await redisClient.executeIsolated(async(client)=>{
        await redisClient.watch(itemKey(name));
        const multi=await client.multi();
        multi.rPush(bidListKey(),serializeBid(amount,dateInMilliseconds));
        multi.hSet(itemKey(name),{
            highestBid:amount,
            highestBidUser:userId,
            bidsCount:`${Number(item.bidsCount)+1}`.toString(),
        });
        multi.sAdd(userBidListKey(userId),serializeBid(amount,dateInMilliseconds));
        multi.zAdd(highestBidKey(),{
            score:Number(amount),
            value:name,
        });
        await multi.exec();
        res.status(200).json({message:'Bid created successfully'});
    });
}

const getBids = async (req,res)=>{
    const {offset=0,count=10}=req.query;
    const end=-1-offset;
    const start=-1*offset-count;
    const bids=await redisClient.lRange('bids',start,end);
    const bidsData=bids.map(deserializeBid);
    res.status(200).json({bids:bidsData});
}

const getUserBids = async (req,res)=>{
    const {userId}=req.params;
    if(!userId){
        return res.status(400).json({message:'UserId is required'});
    }
    const bids=await redisClient.sMembers(userBidListKey(userId));
  const bidsData = bids.map(deserializeBid);
  res.status(200).json({ bids: bidsData });
};

module.exports = { createBid, getBids, getUserBids };