const Koa = require('koa');
const Router = require("koa-router");
const router = new Router();
const app = new Koa();
const PORT = process.env.PORT || 8081;

router.get('/', async ctx => {
    ctx.body = {
        data: 'URL Shorten API'
    };
});

router.post('/shorten', async ctx => {
    ctx.body = {newUrl: 'http://localhost/'}
});

app.use(router.routes());

const server = app.listen(PORT).on('error', err => {
    console.error(err);
});

module.exports = server;