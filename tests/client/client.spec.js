const request = require('supertest');
const server = require('../../app');

describe('Test of client', () => {
  let token = '';

  const testUser = {
    email: 'test.user@gmail.com',
    password: '12345',
    name: 'Johnny',
    last_name: 'Test',
    phone: '',
    address: '',
    img: '',
  };

  it('create a client', async () => {
    const response = await request(server)
      .post('/client/signin')
      .send(testUser);
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('log in with a client', async () => {
    const { email, password } = testUser;
    const payload = { email, password };
    const response = await request(server).post('/client/login').send(payload);
    const status = response.statusCode;
    token = response.text;
    expect(status).toBe(200);
  });

  it('show client list', async () => {
    const response = await request(server)
      .get('/client')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('show a single client info', async () => {
    const response = await request(server)
      .get('/client/4')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('Delete test user', async () => {
    const response = await request(server)
      .delete(`/client/deleteByEmail/${testUser.email}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    const status = response.statusCode;
    expect(status).toBe(200);
  });
});
