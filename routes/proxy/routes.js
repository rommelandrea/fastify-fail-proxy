import proxy from '@fastify/http-proxy'

export const prefixOverride = '/api/v1/proxy'

export default async function (fastify, opts) {
  fastify.register(proxy, {
    upstream: fastify.secrets.UPSTREAM_URL,
    rewritePrefix: '/get',
    httpMethods: ['GET'],
    preHandler: async (request, reply) => {
      const { sv, exp } = request.query

      if (!sv || !exp || isNaN(sv) || isNaN(exp)) {
        throw fastify.httpErrors.badRequest()
      }

      if ((parseInt(exp, 10) - parseInt(sv, 10)) > fastify.secrets.EXPIRE_IN) {
        throw fastify.httpErrors.unauthorized()
      }

      if (parseInt(exp, 10) < new Date().getTime()) {
        throw fastify.httpErrors.unauthorized('link expired')
      }
    }
  })

}
