const {client} = require('../model/RedisConnector');
const {userKey, genUserId, serialize, deserialize} = require('../utils/Key.js');

const createUser = async(user) => {
     
    const id = genUserId();
    await client.hSet(userKey(id), serialize({user}));
    
    return id;
};

const getUser=async(id)=>{
    const users = await client.hGetAll(userKey(id));
    if(!users){
        throw new Error('User not found');
    }
    console.log(users);
    return deserialize({id,user:users});
};

module.exports = {createUser, getUser};
