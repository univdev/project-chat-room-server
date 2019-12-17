const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const friendSchema = new mongoose.Schema({
  profile: { type: String, required: false },
  nickname: { type: String, required: true }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  profile: { type: String, required: false },
  nickname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [friendSchema],
}, { timestamps: true });
const Users = mongoose.model('Users', userSchema);

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  author: { type: ObjectId, required: true, ref: 'Users' },
}, { timestamps: true });
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Users, Comment };