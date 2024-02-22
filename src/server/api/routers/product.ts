import { z } from "zod";
import { ProductSchema } from "~/lib/schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({

  create: protectedProcedure
    .input(ProductSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.product.create({
        data: {
        //   name: input.name,
        //   createdBy: { connect: { id: ctx.session.user.id } },
            title: input.title,
            description: input.description,
            images: input.images,
            price: input.price,
            brand: {
                connect: { id: "clsvzutu9000012vfuv0tytqk" } // Connect the product to a brand by its ID
              },
            categories:{
                connect:{id:"clsvzvikp000112vfk5u7qp25"}
            }
        },
      });
    }),
});
