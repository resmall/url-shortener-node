const mongoose = require('mongoose');
const shortid = require('shortid');

const Url = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  url: String,
  expires_at: Date,
}, {
  timestamps: true,
  versionKey: false,
});

Url.index({ createdAt: 1 }, { expireAfterSeconds: parseInt(process.env.SECONDS_TO_EXPIRE_URL) });
module.exports = mongoose.model('Url', Url);
