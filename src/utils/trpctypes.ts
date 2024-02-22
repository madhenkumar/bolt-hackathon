import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;


export type GetEveryProductOutput = RouterOutput['product']['getAll']
// type PostCreateInput = RouterInput['post']['create'];
           
// type PostCreateInput = {
//     title: string;
//     text: string;
// }
// type ProductDisplayOutput = RouterOutput['post']['create'];