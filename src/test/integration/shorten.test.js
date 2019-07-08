/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../index');
const Url = require('../../url/url');
const { expect } = require('chai');


describe('API', () => {

  afterEach(() => {
    app.close();
  });

  it('response', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.eq(200);
  });

  it('requests a new url', async () => {
    const res = await request(app)
      .post('/shorten')
      .send({
        url: 'http://google.com',
      });
    expect(res.status).to.eq(200);
    expect(res.body).haveOwnProperty('newUrl');
    expect(res.body).haveOwnProperty('expiresAt');
  });

  it('requests to shorten url passing a invalid url', async () => {
    const invalidUrl = 'johndoe';
    const res = await request(app)
      .post('/shorten')
      .send({
        url: invalidUrl,
      });
    expect(res.status).to.eq(400);
    expect(res.body).haveOwnProperty('message');
  });

  it('requests to shorten url passing a valid url', async () => {
    const validUrl = 'http://google.com';
    const res = await request(app)
      .post('/shorten')
      .send({
        url: validUrl,
      });
    expect(res.status).to.eq(200);
    expect(res.body).haveOwnProperty('newUrl');
    expect(res.body).haveOwnProperty('expiresAt');
  });

  it('response should have valid values', async () => {
    const validURL = 'http://google.com';
    const res = await request(app)
      .post('/shorten')
      .send({
        url: validURL,
      });

    expect(Url.isValid(res.body.newUrl)).to.not.be.undefined;
    expect(res.body.expiresAt).not.to.eq('');
    const milliseconds = res.body.expiresAt * 1000;
    const dt = new Date(milliseconds);
    expect(dt instanceof Date && !isNaN(dt)).to.be.true;
  });

});
