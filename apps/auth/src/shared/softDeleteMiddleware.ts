import { PrismaClient } from '@prisma/client';

export function softDeleteMiddleware(prisma: PrismaClient) {
  prisma.$extends({
    query: {
      // $allModels: { // use for all model access
      auth: {
        async $allOperations({ operation, args, query }) {
          if (operation === 'delete') {
            // Change action to update and set deleted to true
            args['data'] = { deleted: true };
            operation = 'update';
          }

          if (operation === 'deleteMany') {
            // Change action to updateMany and set deleted to true
            operation = 'updateMany';
            if (args['data'] !== undefined) {
              args['data']['deleted'] = true;
            } else {
              args['data'] = { deleted: true };
            }
          }

          if (operation === 'findUnique') {
            // Convert findUnique to findFirst and filter out deleted records
            operation = 'findFirst';
            args['where'] = { ...args['where'], deleted: null };
          }

          if (operation === 'findMany' || operation === 'findFirst') {
            // Exclude deleted records unless explicitly requested
            args['where'] = args['where']
              ? { ...args['where'], deleted: args['where'].deleted ?? null }
              : { deleted: null };
          }

          // Execute the query
          return query(args);
        },
      },
    },
  });
}
