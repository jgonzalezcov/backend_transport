const request = require('supertest');
const server = require('../../app');

describe('Test of transport', () => {
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

  it('create a transport', async () => {
    const response = await request(server)
      .post('/transport/signin')
      .send(testUser);
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('log in with a transport', async () => {
    const { email, password } = testUser;
    const payload = { email, password };
    const response = await request(server)
      .post('/transport/login')
      .send(payload);
    const status = response.statusCode;
    token = response.text;
    expect(status).toBe(200);
  });

  it('show transport list', async () => {
    const response = await request(server)
      .get('/transport')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('show a single transport info', async () => {
    const response = await request(server)
      .get('/transport/4')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('Delete test user', async () => {
    const response = await request(server)
      .delete(`/transport/deleteByEmail/${testUser.email}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    const status = response.statusCode;
    expect(status).toBe(200);
  });
});
