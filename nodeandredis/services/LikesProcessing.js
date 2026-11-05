const {client}=require('../model/RedisConnector');

const addLike=async(userKeys,itemKeys)=>{

    if(await client.sIsMember(userKeys,itemKeys)){
        throw new Error('Like already exists');
    }
   return await client.sAdd(userKeys,itemKeys);
};

const removeLike=async(userKeys,itemKeys)=>{
    if(!await client.sIsMember(userKeys,itemKeys)){
        throw new Error('Like does not exist');
    }
    return await client.sRem(userKeys,itemKeys);
};

const getLikes=async(userKeys)=>{
    return await client.sMembers(userKeys);
};


module.exports={addLike,removeLike,getLikes};