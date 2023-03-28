const jwt = require('jsonwebtoken');
const { SIGNKEY } = require('./constants');

const setToken = function (email) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({ name: email }, SIGNKEY, { expiresIn: '1h' });
    resolve(token);
  });
};

const verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    const info = jwt.verify(token.split(' ')[1], SIGNKEY);
    resolve(info);
  });
};

export { setToken, verifyToken };
