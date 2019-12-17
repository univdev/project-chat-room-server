const jwt = require('jsonwebtoken');
const JWT_SECRET = '3txcD67HnRarbAfAbzkkEteFMkd2';

module.exports.sign = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, {}, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

module.exports.verify = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, {}, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};