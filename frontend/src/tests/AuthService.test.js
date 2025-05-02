// frontend/src/tests/AuthService.test.js
import * as authService from '../services/authService';

describe('Auth Service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      token: 'testtoken',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await authService.login('user', 'pass');
    expect(result.token).toBe('testtoken');
    expect(localStorage.getItem('token')).toBe('testtoken');
  });
});
