const validUrl = require('valid-url')

exports.isValid = (uri) => {
    return validUrl.isUri(uri);
}