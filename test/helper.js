// This file contains code that we reuse
// between our tests.

import fcli from 'fastify-cli/helper.js'

const startArgs = '-l silent --options app.js'

const defaultEnv = {
  NODE_ENV: 'test',
  UPSTREAM_URL: 'https://httpbin.org',
  EXPIRE_IN: 60000
}

function config (env) {
  return {
    configData: env
  }
}

// automatically build and tear down our instance
async function buildApp (t, env, serverOptions) {
  const app = await fcli.build(startArgs,
    config({ ...defaultEnv, ...env }),
    serverOptions
  )
  t.teardown(() => { app.close() })
  return app
}

export {
  config,
  buildApp
}
