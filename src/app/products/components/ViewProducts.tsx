import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { GetEveryProductOutput } from '~/utils/trpctypes'

export const ViewProducts = ({products}: {products: GetEveryProductOutput}) => {
  return (
    <div className="w-full grid grid-cols-3 gap-3 p-20">
        {
            products.map((product) => {
                return (
                    <div className="w-full h-full ">
                        <Image width={500} height ={500} src={product.images} alt={product.title} />
                        <Link className="relative inline-block h-full w-full" href={`/product/${product.id}`}>
                            {product.title}
                        </Link>
                    </div>
                )
            })
        }
     

    </div>
  )
}
