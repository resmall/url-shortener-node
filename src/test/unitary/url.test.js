/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const Url = require('../../url/url');

describe('url validator', () => {
  it('should return true', () => {
    expect(Url.isValid('http://google.com')).to.not.be.undefined;
  });

  it('should return undefined', () => {
    expect(Url.isValid('asdasdogle@asdasd.com')).to.be.undefined;
  });
})