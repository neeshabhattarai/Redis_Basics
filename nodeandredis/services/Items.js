const { client } = require("../model/RedisConnector");
const { addLike, removeLike } = require("./LikesProcessing");
const { genUserId,itemKey,userLikesKey } = require("../utils/Key");

const createItem = async (item) => {
  const id=`${genUserId()}-${item.name}`;
  const key = itemKey(id);
  const itemExits=await client.hGetAll(item.name);
  if(Object.keys(itemExits).length > 0) {
    throw new Error("Item already exists");
  }
  await client.hSet(key, item);
  return id;
};

const getItem = async (id) => {
  const key = itemKey(id);
  if(Object.keys(await client.hGetAll(key)).length === 0) {
    throw new Error("Item not found");
  }
  try {
    return await client.hGetAll(key);
  } catch (error) {
    throw new Error("Failed to get item",error);
  }
};

const deleteItem = async (id) => {
  const key = itemKey(id);
  if(Object.keys(await client.hGetAll(key)).length === 0) {
    throw new Error("Item not found");
  }
  try {
    await client.del(key);
  } catch (error) {
    throw new Error("Failed to delete item");
  }
  return true;
};

const addLikeByUser = async (userId, itemId) => {
  const item = await getItem(itemId);
  if (Object.keys(item).length === 0) {
    throw new Error("Item not found");
  }
  const itemKeys=itemKey(itemId);
  const userKeys=userLikesKey(userId);
  let result;
  try {
     result = await addLike(userKeys, itemKeys);
    if (result) {
      await client.hIncrBy(itemKeys, "likes", 1);
    }
  } catch (error) {
    throw new Error("Failed to add like",error);
  }
  return result;
};
const removeLikeByUser = async (userId, itemId) => {
    const item = await getItem(itemId);
    const userKeys=userLikesKey(userId);
    if (!item) {
      throw new Error("Item not found");
    }
    const itemKeys=itemKey(itemId);
    try {
        const result = await removeLike(userKeys, itemKeys);
        if (result) {
          await client.hIncrBy(itemKeys, "likes", -1);
        }
    } catch (error) {
      throw new Error("Failed to remove like");
    }
    
  };

module.exports = { createItem, getItem, addLikeByUser, removeLikeByUser ,deleteItem};
