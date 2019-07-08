const UrlModel = require('../models/url');
const Url = require('../url/url');
const { getExpirationDate, getUnixTimestamp, hasExpired } = require('../services/date');

module.exports = {
  health(ctx) {
    ctx.body = {
      data: 'URL Shorten API',
    };
  },

  async shorten(ctx) {
    const { url } = ctx.request.body;

    if (url && Url.isValid(url)) {
      const expirationDate = getExpirationDate(process.env.SECONDS_TO_EXPIRE_URL);
      const expirationTimeUnixTimestamp = getUnixTimestamp(expirationDate);

      try {
        const saved = await UrlModel.create({
          url,
          expires_at: expirationDate,
        });

        ctx.body = {
          newUrl: `${process.env.SERVICE_URL}/${saved._id}`,
          expiresAt: expirationTimeUnixTimestamp,
        };
      } catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = { message: 'There was a problem with your request.' };
      }
    } else {
      ctx.status = 400;
      ctx.body = { message: 'Invalid url.' };
    }
  },

  async get(ctx) {
    const { id } = ctx.params;

    if (id) {
      try {
        const url = await UrlModel.findById(id);
        if (url) {
          if (hasExpired(url.expires_at)) {
            ctx.body = { message: 'URL has expired.' };
            ctx.status = 410;
            return;
          }
          ctx.redirect(url.url);
          return;
        }
      } catch (e) {
        console.error(e);
        ctx.throw(500, 'There was a problem with your request.');
      }
    }
    ctx.body = { message: 'URL not found.' };
    ctx.status = 404;
  },
};
