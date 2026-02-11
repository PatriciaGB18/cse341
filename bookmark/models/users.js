const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  githubId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String },
  displayName: { type: String }
});

module.exports = mongoose.model('User', userSchema);