const redisClient = require("../model/redisConnector");
const { userKey,userList } = require("../service/key");

const addUser = async (req, res) => {
    const { name } = req.body;
    if(!name){
        return res.status(400).send({message:"Name is required"});
    }
    const key=userKey(name);
    const result=await redisClient.sAdd(userList(),name.toString());
    if(result){
        await redisClient.hSet(key,{name:name});
        return res.status(200).send({message:"User added successfully"});
    }
    else{
        return res.status(400).send({message:"User with this username already exists"});
    }
};

const getUser = async (req, res) => {
    const { userId } = req.params;
    if(!userId){
        return res.status(400).send({message:"UserId is required"});
    }
    const key=userKey(userId);
    const result=await redisClient.hGetAll(key);
    return res.status(200).send({message:"User fetched successfully",result});
};

const removeUser = async (req, res) => {
    const { userId } = req.params;
    if(!userId){
        return res.status(400).send({message:"UserId is required"});
    }
    const key=userKey(userId);
    await redisClient.sRem(userList(),userId);
    await redisClient.del(key);
    return res.status(200).send({message:"User removed successfully"});
};

module.exports = { addUser, getUser, removeUser };