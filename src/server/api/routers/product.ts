import { z } from "zod";
import { CreateProduct, ProductSchema, ServerCreateProductSchema } from "~/lib/schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({

  create: protectedProcedure
    .input(ServerCreateProductSchema)
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

    getAll: publicProcedure
    .query(async({ctx}) => {

      return ctx.db.product.findMany({
        take: 8, // Limits the result to 8 products
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          images: true,
          price: true,
        }
      })
    },
    ),
    deleteProduct: protectedProcedure
    .input(z.string())
    .mutation(async ({ctx,input})=>{

      return ctx.db.product.delete({
        where: {
          id: input,
        },
      });
    }

    ),
    getOneProduct: publicProcedure
    .input(z.string())
    .query(async({ctx,input})=>{

      return ctx.db.product.findUnique({
        where: {
          id: input,
        },
      })
    }),

    AddFittingPicture: protectedProcedure
    .input(z.object({image:z.string()}))
    .mutation(async({ctx,input})=>{
      
      return ctx.db.fittingPicture.create({
        data: {
          image: input.image,
          user: {
            connect: { id: ctx.session.user.id } // Associate with the user
          }
        }
      })

      ;
    }
      
    ),

    getFittingPicture: protectedProcedure
    .query(async({ctx})=>{
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          fittingPicture: true // Include the fitting picture associated with the user
        }
      });
  
      if (user && user.fittingPicture) {
        return user.fittingPicture.image; // Return the image URL of the fitting picture
      } else {
        console.log('Fitting picture not found for the user.');
        return null;
      }
    }),
    returnAllVisitedProducts: publicProcedure
    .query(async({ctx})=>{
      const user = await ctx.db.visited.findMany({
        include: {
          products: true // Include the fitting picture associated with the user
        }
      });
  
    }),


});
