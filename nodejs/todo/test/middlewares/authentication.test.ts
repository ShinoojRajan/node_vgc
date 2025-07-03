import passport from 'passport';
import request from 'supertest';
import express from 'express';
import path from 'path';

describe('authentication middleware', () => {
  let app: express.Express;
  const validUsername = 'testuser';
  const validPassword = 'testpass';

  beforeAll(() => {
    process.env.BASIC_AUTH_USERNAME = validUsername;
    process.env.BASIC_AUTH_PASSWORD = validPassword;
    jest.resetModules();
    // Re-require passport and authentication after setting env vars
    const passportLocal = require('passport');
    require('../../middlewares/authentication');
    app = express();
    app.use(passportLocal.initialize());
    app.get('/protected',
      passportLocal.authenticate('basic', { session: false }),
      (req, res) => { res.status(200).json({ message: 'Authenticated' }); }
    );
  });

  it('should allow access with valid credentials', async () => {
    const res = await request(app)
      .get('/protected')
      .auth(validUsername, validPassword);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Authenticated' });
  },8000);

  it('should deny access with invalid credentials', async () => {
    const res = await request(app)
      .get('/protected')
      .auth('wrong', 'creds');
    expect(res.status).toBe(401);
  });

  it('should deny access with no credentials', async () => {
    const res = await request(app)
      .get('/protected');
    expect(res.status).toBe(401);
  });
});
