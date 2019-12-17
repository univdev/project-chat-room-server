const jwt = require('../helpers/jwt');

module.exports.user = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'token이 없습니다.' });
    if (token.indexOf('Bearer ' === 0)) token = token.slice(7);
    const user = await jwt.verify(token);
    if (!user) return res.status(401).json({ message: '올바른 token이 아닙니다.' });
    req.user = user.user;
    return next();
  } catch (e) {
    console.error(e);
    res.status(401).end();
  }
};