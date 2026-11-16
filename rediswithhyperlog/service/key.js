const itemKey=(name)=>`item:${name}`;
const itemLikesKey=(name)=>`item:likes:${name}`;
const itemViewedKey=(name)=>`item:viewed:${name}`;

const userKey=(userId)=>`user:${userId}`;
const userList=()=>"user:list";
const userLikesItemKey=(userId)=>`user:likes:${userId}`;

module.exports = { itemKey,itemLikesKey,itemViewedKey,userKey,userList,userLikesItemKey };