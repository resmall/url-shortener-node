/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../index');
const Url = require('../../url/url');

afterEach(() => {
  app.close();
});

test('response', async () => {
  const res = await request(app).get('/');
  expect(res.status).toEqual(200);
});

test('requests a new url', async () => {
  const res = await request(app)
    .post('/shorten')
    .send({
      url: 'http://google.com',
    });
  expect(res.status).toEqual(200);
  expect(res.body).toHaveProperty('newUrl');
});

test('requests to shorten url passing a invalid url', async () => {
  const invalidUrl = 'johndoe';
  const res = await request(app)
    .post('/shorten')
    .send({
      url: invalidUrl,
    });
  expect(res.status).toEqual(400);
  expect(res.body).toHaveProperty('message');
});

test('requests to shorten url passing a valid url', async () => {
  const validUrl = 'http://google.com';
  const res = await request(app)
    .post('/shorten')
    .send({
      url: validUrl,
    });
  expect(res.status).toEqual(200);
  expect(res.body).toHaveProperty('newUrl');
  expect(res.body).toHaveProperty('expiresAt');
});

test('response should have valid values', async () => {
  const validURL = 'http://google.com';
  const res = await request(app)
    .post('/shorten')
    .send({
      url: validURL,
    });

  expect(Url.isValid(res.body.newUrl)).toBeTruthy();
  expect(res.body.expiresAt).not.toEqual('');
  const milliseconds = res.body.expiresAt * 1000;
  const dt = new Date(milliseconds);
  expect(dt instanceof Date && !isNaN(dt)).toBeTruthy();
});
