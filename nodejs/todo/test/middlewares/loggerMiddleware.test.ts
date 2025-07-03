import { loggerMiddleware } from '../../middlewares/loggerMiddleware';
import express from 'express';
import request from 'supertest';

describe('loggerMiddleware', () => {
  let app: express.Express;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    app = express();
    app.use(loggerMiddleware);
    app.get('/test', (req, res) => {res.status(200).json({ ok: true })});
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log the request method and url', async () => {
    await request(app).get('/test');
    expect(consoleSpy).toHaveBeenCalled();
    const logCall = consoleSpy.mock.calls[0][0];
    expect(logCall).toMatch(/GET \/test/);
  },7000);

  it('should call next()', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
