import S from 'fluent-json-schema'

export const bearerSchema = S.object()
  .id('schema:bearer')
  .prop('authorization', S.string().required())
