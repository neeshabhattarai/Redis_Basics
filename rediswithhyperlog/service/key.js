const { DateTime } = require("luxon");
const itemKey = (name) => `item:${name}`;
const itemLikesKey = (name) => `item:likes:${name}`;
const itemViewedKey = (name) => `item:viewed:${name}`;
const highestBidKey = () => `item:highestBid`;
const bidListKey = () => `item:bidList`;
const userBidListKey = (userId) => `user:bidList:${userId}`;

const userKey = (userId) => `user:${userId}`;
const userList = () => "user:list";
const userLikesItemKey = (userId) => `user:likes:${userId}`;

const serializeBid = (amount, dateInMilliseconds) => {
  return `${amount}:${dateInMilliseconds}`;
};

const deserializeBid = (bid) => {
  const [amount, dateInMilliseconds] = bid.split(":");
  return { amount, date:DateTime.fromMillis(Number(dateInMilliseconds)).toISO() };
};

module.exports = {
  itemKey,
  itemLikesKey,
  itemViewedKey,
  userKey,
  userList,
  userLikesItemKey,
  serializeBid,
  deserializeBid,
  highestBidKey,
  bidListKey,
  userBidListKey,
};
