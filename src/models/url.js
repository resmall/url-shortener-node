const mongoose = require('mongoose');

const Url = mongoose.Schema({
  url: String,
  expires_at: Date,
}, {
  timestamps: true,
  versionKey: false,
});

Url.index({ createdAt: 1 }, { expireAfterSeconds: parseInt(process.env.SECONDS_TO_EXPIRE_URL) });
module.exports = mongoose.model('Url', Url);
