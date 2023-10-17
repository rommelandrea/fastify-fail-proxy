import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

async function configLoader (fastify, opts) {
  await fastify.register(fastifyEnv, {
    confKey: 'secrets',
    data: opts.configData,
    schema: fastify.getSchema('schema:dotenv')
  })
}

export default fp(configLoader, {
  name: 'application-config',
  dependencies: ['application-schemas']
})
