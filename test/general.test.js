const supertest = require('supertest');

const app = require('../src/server/app.js');
const database = require('../src/config/database');

const request = supertest(app);

let token;
let registerToken;

// eslint-disable-next-line no-undef
beforeAll(async (done) => {
  try {
    const response = await request.post('/login').send({
      email: 'test@gmail.com',
      password: 'testpassword',
    });

    token = response.body.token;

    done();
  } catch (error) {
    // eslint-disable-next-line no-undef
    fail(error);
  }
});

// eslint-disable-next-line no-undef
afterAll(async () => {
  await request
    .delete('/character')
    .send({
      digitalId: 1233213,
    })
    .set('x-access-token', token);
  await request
    .delete('/comic')
    .send({
      digitalId: 1233213,
    })
    .set('x-access-token', token);
  await request.delete('/delete').set('x-access-token', registerToken);
  await database.close();
});

// eslint-disable-next-line no-undef
describe('Test route user', () => {
  // eslint-disable-next-line no-undef
  test('Register a new user', async () => {
    const emailValid = `${Date.now().toString()}@gmail.com`;
    try {
      const response = await request.post('/register').send({
        name: 'TestRegister',
        email: emailValid,
        password: 'testpassword',
      });
      const login = await request.post('/login').send({
        email: emailValid,
        password: 'testpassword',
      });

      registerToken = login.body.token;
      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });

  // eslint-disable-next-line no-undef
  test('It should login and return a token', async () => {
    try {
      const response = await request.post('/login').send({
        email: 'test@gmail.com',
        password: 'testpassword',
      });

      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
      // eslint-disable-next-line no-undef
      expect(response.body.token).toBeDefined();
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });

  // eslint-disable-next-line no-undef
  test('It should require authorization', async () => {
    try {
      const response = await request.patch('/update').send({
        name: `Teste ${Date.now()}`,
        email: 'test@gmail.com',
      });
      // eslint-disable-next-line no-undef
      expect(response.status).toBe(401);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });

  // eslint-disable-next-line no-undef
  test('Update the user informations', async () => {
    try {
      const response = await request
        .patch('/update')
        .send({
          name: `Teste${Date.now().toString()}`,
          email: 'test@gmail.com',
        })
        .set('x-access-token', token);
      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });
});

// eslint-disable-next-line no-undef
describe('Test route character', () => {
  // eslint-disable-next-line no-undef
  test('Return all favorite characters', async () => {
    try {
      const response = await request
        .get('/character')
        .set('x-access-token', token);

      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });
  // eslint-disable-next-line no-undef
  test('Save a new character', async () => {
    try {
      const response = await request
        .post('/character')
        .send({
          name: 'Teste',
          thumbnail: 'teste.jpg',
          digitalId: 1233213,
        })
        .set('x-access-token', token);

      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });
});

// eslint-disable-next-line no-undef
describe('Test route comic', () => {
  // eslint-disable-next-line no-undef
  test('Return all favorite comics', async () => {
    try {
      const response = await request.get('/comic').set('x-access-token', token);

      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });

  // eslint-disable-next-line no-undef
  test('Save a new comic', async () => {
    try {
      const response = await request
        .post('/comic')
        .send({
          title: 'Teste',
          thumbnail: 'teste.jpg',
          digitalId: 1233213,
        })
        .set('x-access-token', token);

      // eslint-disable-next-line no-undef
      expect(response.status).toBe(200);
    } catch (error) {
      // eslint-disable-next-line no-undef
      fail(error);
    }
  });
});
