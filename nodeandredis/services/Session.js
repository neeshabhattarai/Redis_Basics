const {client} = require('../model/RedisConnector');
const {sessionKey, serializeSession, deserializeSession, genSessionId} = require('../utils/Key');

const createSession = async (user) => {
    // console.log(user);
    const session = serializeSession(user);
    const id =genSessionId();

    await client.hSet(sessionKey(id), session);
    return id;
}

const getSession = async (id) => {
    const session = await client.hGetAll(sessionKey(id));
    return deserializeSession({id,session});
}

const deleteSession = async (id) => {
    await client.hDel(sessionKey(id));
}

module.exports = {createSession, getSession, deleteSession};