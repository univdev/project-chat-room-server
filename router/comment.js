const { Router } = require('express');
const { Comments } = require('../models');
const router = Router();
const auth = require('../middlewares/auth');

router.get('/comments/:userId', auth.user, async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;
    const where = {};
    const $or = [
      { author: userId, listener: myId },
      { author: myId, listener: userId }
    ];
    where.$or = $or;
    const comments = await Comments.find(where).populate('author').populate('listener');
    return res.status(200).json(comments);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
});

router.post('/comments', auth.user, async (req, res) => {
  const author = req.user._id;
  const { listener, comment } = req.body;
  if (!listener) return res.status(400).json({ message: '상대방의 id를 입력해주세요.' });
  if (!comment) return res.status(400).json({ message: '반드시 한 글자 이상을 입력해야 합니다.' });
  await new Comments({ listener, comment, author }).save();
  const data = await Comments.findOne({ listener, author })
    .sort('-createdAt')
    .populate('author')
    .populate('listener');
  return res.status(200).json(data);
})

module.exports = router;