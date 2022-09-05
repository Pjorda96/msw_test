// src/mocks/handlers.js
import { rest } from 'msw'

const responseResolver = () => (req, res, ctx) => res(ctx.status(403));

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    const username = req.url.searchParams.get('userId')

    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username,
      }),
    )
  }),

  // Conditional passthrough
  rest.get('/user/:userId', (req, res, ctx) => {
    const { userId } = req.params;

    if (userId === 'abc-123') {
      // Return a mocked response only if the `userId` query parameter
      // equals to a specific value.
      return res(
        ctx.json({
          firstName: 'John',
          lastName: 'Maverick',
        }),
      )
    }

    // Otherwise, explicitly state that you wish to perform this request as-is.
    return req.passthrough()
  }),
  
  // Intercept all requests to the "/user" endpoint
  rest.all('/user', responseResolver),

  rest.post('https://api.backend.dev/users', responseResolver)
]