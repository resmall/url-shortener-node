const moment = require('moment');

exports.getExpirationDate = (seconds) => {
  const expirationTime = moment(new Date()).add(seconds, 's').toDate();
  return expirationTime;
};

exports.getUnixTimestamp = date => Math.round(date.getTime() / 1000);

exports.hasExpired = expirationDate => moment(expirationDate).isBefore(new Date());
