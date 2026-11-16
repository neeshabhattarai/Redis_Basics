const redisClient = require("../model/redisConnector");
const { itemKey } = require("../service/key");

const addItem = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  const key = itemKey(name);
  const result = await redisClient.hSet(key, {
    name: name,
    likes: 0,
  });
  if (result) {
    return res.status(200).send({ message: "Item added successfully" });
  }
  return res.status(500).send({ message: "Failed to add item" });
};

const getItem = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  const key = itemKey(name);
  const result = await redisClient.hGetAll(key);
  return res.status(200).send({ message: "Item fetched successfully", result });
};

const updateView = async (req, res) => {
  const { name } = req.params;
  const { likes } = req.body;
  if (!name || !view) {
    return res.status(400).send({ message: "Name and likes are required" });
  }
  const key = itemKey(name);
  const result = await redisClient.hIncrBy(key, "likes", likes);
  if(result){
    return res.status(200).send({ message: "View updated successfully" });
  }
  return res.status(500).send({ message: "Failed to update view" });
};

const deleteItem = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  const key = itemKey(name);
  const result = await redisClient.del(key);
  if(result){
    return res.status(200).send({ message: "Item deleted successfully",result });
  }
  return res.status(500).send({ message: "Failed to delete item" });
};

const getView = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  const key = itemKey(name);
  const result = await redisClient.hGet(key, "view");
  return res.status(200).send({ message: "View fetched successfully",result });
};

const getAllItems = async (req, res) => {
  const result = await redisClient.keys("item:*");
  return res.status(200).send({ message: "All items fetched successfully",result });
};

const getLikes = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  const key = itemKey(name);
  const result = await redisClient.hGet(key, "likes");
  return res.status(200).send({ message: "Likes fetched successfully",result });
};
module.exports = { addItem, getItem, updateView, deleteItem ,getView,getAllItems,getLikes };
