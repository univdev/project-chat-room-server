const jwt = require('../helpers/jwt');

module.exports.user = async (req, res, next) => {
  try {
    const token = req.headers.Authorization || req.query.token;
    if (!token) return res.status(401);
    const user = await jwt.verify(token);
    if (!user) return res.status(401);
    req.user = user;
    return next();
  } catch (e) {
    console.error(e);
    res.status(401).end();
  }
};