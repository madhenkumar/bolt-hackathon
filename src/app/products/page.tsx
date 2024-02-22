import React from 'react'
import { api } from '~/trpc/server'
import { ViewProducts } from './components/ViewProducts';



async function page(){
  const AllPosts = await api.product.getAll.query();
  return (
    <div>
      <ViewProducts products={AllPosts}/>
    </div>
  )
}

export default page