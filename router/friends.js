const { Router } = require('express');
const { Users } = require('../models');
const router = Router();
const auth = require('../middlewares/auth');

router.get('/my-friends', auth.user, async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    if (!user) return res.status(404).end();
    return res.status(200).json(user.friends);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
});

router.post('/friends/:username', auth.user, async (req, res) => {
  try {
    const { username } = req.params;
    if (req.user.username === username) return res.status(400).json({ message: '본인은 친구로 등록할 수 없습니다.' });
    const user = await Users.findById(req.user._id);
    const friend = await Users.findOne({ username });
    if (!user) return res.status(404).json({ message: '회원을 찾지 못했습니다.' });
    if (!friend) return res.status(404).json({ message: '해당 아이디와 일치하는 회원이 없습니다.' });
    user.friends = [...user.friends, friend];
    await user.save();
    return res.status(200).json(friend);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

module.exports = router;