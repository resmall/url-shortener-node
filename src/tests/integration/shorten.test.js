const request = require('supertest');
const app = require('../../index');


afterEach(() => {
    app.close();
});

test("Response", async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
})
