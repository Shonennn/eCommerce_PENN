import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    products: () => prisma.product.findMany(),
  },
  Mutation: {
    addProduct: async (_: any, args: any) => {
      return await prisma.product.create({
        data: {
          name: args.name,
          description: args.description,
          price: args.price,
          imageUrl: args.imageUrl,
        },
      });
    },
  },
};
