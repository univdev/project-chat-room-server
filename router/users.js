const { Router } = require('express');
const { Users } = require('../models');
const router = Router();
const sha256 = require('sha256');
const auth = require('../middlewares/auth');
const jwt = require('../helpers/jwt');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username, password: sha256(password) });
    if (!user) res.status(400).json({ message: '계정을 찾을 수 없습니다.' });
    const token = await jwt.sign({ user });
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/me', auth.user, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/users', (req, res) => {
  const users = Users.find();
  res.json(users);
});

router.post('/users', async (req, res) => {
  try {
    const { username, nickname, password } = req.body;
    const payload = { username, nickname, password: sha256(password) };
    const user = await new Users(payload).save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;