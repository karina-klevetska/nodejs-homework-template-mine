import { jest } from '@jest/globals'
import { loginController } from './index.js'
import { httpCode } from '../../lib/constants.js'
import authService from '../../service/auth/index.js'

describe('test login', () => {
  let req, res, next
  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: '123456' } }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
    next = jest.fn()
  })

  test('success login', async () => {
    authService.getUser = jest.fn(() => ({
      email: 'test@example.com',
      subscription: 'starter',
      id: 'ddf5v4fd5vdf5v4df5v45',
    }))

    authService.getToken = jest.fn((data) => data)
    authService.setToken = jest.fn((data) => data)

    await loginController(req, res, next)

    expect(res.status).toHaveBeenCalledWith(httpCode.OK)
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: expect.any(String),
        data: {
          user: {
            email: expect.any(String),
            subscription: expect.any(String),
          },
          token: expect.anything(),
        },
      })
    )
  })
})
