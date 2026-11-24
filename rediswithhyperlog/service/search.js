const { itemKey } = require("./key");

const createIndex = async (redisClient) => {
  const indexName = "idx:items";
  const result = await redisClient.ft._list();

  if (result.includes(indexName)) {
    return;
  }
  await redisClient.ft.create(
    indexName,
    {
      name: {
        type: "TEXT",
        weight: 5.0,
      },
    },
    {
      ON: "HASH",
      PREFIX: ['item:'],
    },
  );
};



const searchItems = async (redisClient,indexName,query, size = 5) => {
  const result = await redisClient.ft.search(indexName, query, {
    LIMIT: {
      from: 0,
      size: size,
    },
  });
  return result.documents.map((doc) => doc.value.name);
}

module.exports = {
  createIndex,
  searchItems,
};
