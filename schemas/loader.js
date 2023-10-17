import fp from 'fastify-plugin'
import { readFileSync } from 'fs'
import { join } from 'desm'

import { bearerSchema } from './bearer.js'

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
async function schemaLoaderPlugin (fastify, opts) {
  const dotenv = await JSON.parse(readFileSync(join(import.meta.url, './dotenv.json')))

  fastify.addSchema(dotenv)
  fastify.addSchema(bearerSchema)
}

export default fp(schemaLoaderPlugin, { name: 'application-schemas' })