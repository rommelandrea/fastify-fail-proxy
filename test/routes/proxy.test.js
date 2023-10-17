import { test } from 'tap'
import { buildApp } from '../helper.js'

test('proxy route with valid query parameters', async (t) => {
  const app = await buildApp(t)

  const sv = new Date().getTime()
  const exp = sv + 60000

  const res = await app.inject({
    url: `/api/v1/proxy?sv=${sv}&exp=${exp}`
  })
  t.equal(res.statusCode, 200)
})

test('proxy route with invalid query parameters', async (t) => {
  const app = await buildApp(t)

  const res = await app.inject({
    url: '/api/v1/proxy?sv=abc&exp=def'
  })
  t.equal(res.statusCode, 400)
})

test('proxy route with expired link', async (t) => {
  const app = await buildApp(t)

  const res = await app.inject({
    url: '/api/v1/proxy?sv=123&exp=456'
  })
  t.equal(res.statusCode, 401)
})

test('proxy route with link that expires too far in the future', async (t) => {
  const app = await buildApp(t)

  const res = await app.inject({
    url: '/api/v1/proxy?sv=123&exp=9999999999999'
  })
  t.equal(res.statusCode, 401)
})