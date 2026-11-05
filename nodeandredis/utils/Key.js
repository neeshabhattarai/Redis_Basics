const userKey = (id) => {
  return `user:${id}`;
};

const genUserId = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

const genSessionId = () => {
  return Math.floor(Math.random() * 1000) + 1;
};
const serialize = ({ user }) => {
  return {
    username: user.username,
    password: user.password,
  };
};

const deserialize = ({ id, user }) => {
  const { password, ...userData } = user;
  return { id, ...userData, password };
};

const sessionKey = (id) => {
  return `session:${id}`;
};

const serializeSession = (user) => {
    // console.log(user);
  return {
    username: user.username,
    password: user.password,
    expiresAt: new Date().getMilliseconds() + 60 * 60 * 3000,
    createdAt: new Date().getMilliseconds(),
  };
};

const deserializeSession = ({ id, session }) => {
  const { expiresAt, createdAt, ...userData } = session;
  return {
    id,
    ...userData,
    expiresAt: new Date(parseInt(expiresAt)),
    createdAt: new Date(parseInt(createdAt)),
  };
};

const userLikesKey = (userId) => {
  return `user:${userId}:likes`;
};

const itemKey = (id) => {
  return `item:${id}`;
};

module.exports = { userKey, genUserId, serialize, deserialize, sessionKey, serializeSession, deserializeSession ,genSessionId,userLikesKey,itemKey};
