const Koa = require('koa');
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');

const Url = require('./url/url');
const router = new Router();
const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(bodyParser());

router.get('/', async ctx => {
    ctx.body = {
        data: 'URL Shorten API'
    };
});

router.post('/shorten', async ctx => {
    const url = ctx.request.body.url;

    if (url && Url.isValid(url)) {
        ctx.body = {
            newUrl: 'http://localhost/',
            expiresAt: ''
        }
    } else {
        ctx.status = 400;
        ctx.body = {'message': 'ok'};
    }

});

app.use(router.routes());

const server = app.listen(PORT).on('error', err => {
    console.error(err);
});

module.exports = server;