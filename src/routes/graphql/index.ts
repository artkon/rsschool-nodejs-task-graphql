import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import resolvers from './resolvers.js';
import schema from './gqlSchema.js';


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const query = req.body.query;
      const variables = req.body.variables;

      return await graphql({
        schema,
        source: query,
        rootValue: resolvers,
        variableValues: variables,
        contextValue: { prisma: fastify.prisma },
      });
    },
  });
};

export default plugin;
