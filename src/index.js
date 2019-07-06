const dotenv = require('dotenv');

dotenv.config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const Url = require('./url/url');
const shortid = require('./services/shortid');

const router = new Router();
const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = {
    data: 'URL Shorten API',
  };
});

router.post('/shorten', async (ctx) => {
  const { url } = ctx.request.body;

  const newUrl = shortid.get();

  if (url && Url.isValid(url)) {
    ctx.body = {
      newUrl: `${process.env.SERVICE_URL}/${newUrl}`,
      expiresAt: '3423423424',
    };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'ok' };
  }
});

app.use(router.routes());

const server = app.listen(PORT).on('error', (err) => {
  console.error(err);
});

module.exports = server;
