const dotenv = require('dotenv');

dotenv.config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const router = new Router();
const app = new Koa();

const PORT = process.env.PORT || 3000;

const urlController = require('./controllers/UrlController');

mongoose.connect(`${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
});

app.use(bodyParser());

router.get('/health', urlController.health);
router.post('/shorten', urlController.shorten);
router.get('/:id', urlController.get);

app.use(router.routes());

const server = app.listen(PORT).on('error', (err) => {
  console.error(err);
});

module.exports = server;
