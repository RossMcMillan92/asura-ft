import { getOr, pipe } from 'lodash/fp'
import { parseCookies, setCookie } from 'nookies'

const TODO_COOKIE_KEY = 'todos'

export const getTodosFromCookies = pipe(
  parseCookies,
  getOr('null', TODO_COOKIE_KEY),
  JSON.parse
)

export const setTodosCookie = pipe(
  JSON.stringify,
  todos =>
    setCookie({}, TODO_COOKIE_KEY, todos, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
)
