const { client } = require("../model/RedisConnector");

const batchProcessing = async () => {
  const list = [1, 2, 3];
  for (const item of list) {
    await client.hSet(`item:${item}`, {
      name: `Item ${item}`,
      description: `Description of Item ${item}`,
    });
  }
  const results = await Promise.all(
    list.map(async (i) => {
      const result = await client.hGetAll(`item:${i}`);
      if (Object.keys(result).length == 0) {
        throw new Error(`Item ${i} not found`);
      }
      return result;
    }),
  ).then((results) => {
    return results;
  }).catch((error) => {
    throw new Error(error);
  });
    return results;
};
module.exports = { batchProcessing };
