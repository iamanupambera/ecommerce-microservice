import { Prisma } from '@prisma/client';

export const softDeleteMiddleware = Prisma.defineExtension({
  query: {
    gig: {
      // Apply to all models
      async $allOperations({ operation, args, query }) {
        if (operation === 'delete') {
          // Convert delete to update and set deletedAt to the current timestamp
          operation = 'update';
          args = {
            ...args,
            data: { deletedAt: new Date() },
          };
        }

        if (operation === 'deleteMany') {
          // Convert deleteMany to updateMany and set deletedAt to the current timestamp
          operation = 'updateMany';
          args = {
            ...args,
            data: {
              ...(args['data'] || {}),
              deletedAt: new Date(),
            },
          };
        }

        if (operation === 'findUnique') {
          // Convert findUnique to findFirst and filter out soft-deleted records
          operation = 'findFirst';
          args = {
            ...args,
            where: {
              ...args['where'],
              deletedAt: null,
            },
          };
        }

        if (operation === 'findMany' || operation === 'findFirst') {
          // Add filter to exclude soft-deleted records unless explicitly overridden
          args = {
            ...args,
            where: {
              ...args['where'],
              deletedAt: args['where']?.deletedAt ?? null,
            },
          };
        }

        // Execute the modified query
        return query(args);
      },
    },
  },
});
