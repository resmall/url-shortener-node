const validUrl = require('valid-url');

exports.isValid = uri => validUrl.isUri(uri);
