const dotenv = require('dotenv');

dotenv.config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const UrlModel = require('./models/url');

const Url = require('./url/url');
const shortid = require('./services/shortid');
const { getExpirationDate, getUnixTimestamp } = require('./services/date');

const router = new Router();
const app = new Koa();

const PORT = process.env.PORT || 3000;

mongoose.connect(`${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
});

app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = {
    data: 'URL Shorten API',
  };
});

router.post('/shorten', async (ctx) => {
  const { url } = ctx.request.body;

  if (url && Url.isValid(url)) {
    const newUrl = shortid.get();

    const expirationDate = getExpirationDate(process.env.SECONDS_TO_EXPIRE_URL);
    const expirationTimeUnixTimestamp = getUnixTimestamp(expirationDate);

    try {
      await UrlModel.create({
        url: newUrl,
        expires_at: expirationDate,
      });

      ctx.body = {
        newUrl: `${process.env.SERVICE_URL}/${newUrl}`,
        expiresAt: expirationTimeUnixTimestamp,
      };
    } catch (e) {
      console.error(e);
      ctx.throw(500, 'There was a problem with your request.');
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      message: 'Invalid request.'
    };
  }
});

app.use(router.routes());

const server = app.listen(PORT).on('error', (err) => {
  console.error(err);
});

module.exports = server;