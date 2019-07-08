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

Url.index({ expires_at: 1 });
module.exports = mongoose.model('Url', Url);
