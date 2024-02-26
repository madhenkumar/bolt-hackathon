import { z } from "zod";
import OpenAI from "openai";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.array(z.object({ role: z.enum(["assistant", "user"]), content: z.string()})))
    .mutation(async ({ input }) => {
      const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a shopping assistant called IntelChat. You have knowledge about the current user's shirt size is XL, the current user's pant size is 38. The current user's name is Aakhil, and he likes golfing equipment and golfing clothes. Answer all relevent questions" }, ...input
    ],
        model: "gpt-3.5-turbo",
      });
    
      console.log("INPUT FROM SERVER")
      console.log(input)
      return completion.choices[0]?.message.content;
    }),
});
