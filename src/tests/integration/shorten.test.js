const request = require('supertest');
const app = require('../../index');


afterEach(() => {
    app.close();
});

test("Response", async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
})

test("Requests a new url", async () => {
    const res = await request(app)
        .post('/shorten')
        .send({
            url: "http://google.com"
        });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('newUrl')
})