"use client"
import { Star, Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '~/components/ui/button'
import { api } from '~/trpc/react'

type Props = {
    id: string
}

export const EachProduct = (props: Props) => {
    const data = api.product.getOneProduct.useQuery(props.id).data;
  return (
    <div className="md:py-8">
    <div className="mb-2 md:mb-3">
      <span className="mb-0.5 inline-block text-gray-500">
        Men
      </span>
      <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
        {data?.title}
      </h2>
    </div>

    <div className="mb-6 flex items-center gap-3 md:mb-10">
      <Button className="rounded-full gap-x-2">
        <span className="text-sm">4.2</span>
        <Star className="h-5 w-5" />
      </Button>

      <span className="text-sm text-gray-500 transition duration-100">
        56 Ratings
      </span>
    </div>

    <div className="mb-4">
      <div className="flex items-end gap-2">
        <span className="text-xl font-bold text-gray-800 md:text-2xl">
        {data?.price}
        </span>
        <span className="mb-0.5 text-red-500 line-through">
         ${data?.price+30}
        </span>
      </div>

      <span className="text-sm text-gray-500">
        Incl. Vat plus shipping
      </span>
    </div>

    <div className="mb-6 flex items-center gap-2 text-gray-500">
      <Truck className="w-6 h-6" />
      <span className="text-sm">2-4 Day Shipping</span>
    </div>

    <div className="flex gap-2.5">
    <Link
      href='/cart'
      className={buttonVariants({
        variant:"default",
      })}>
      Add to Cart
    </Link>
    <Link
      href='/checkout'
      className={buttonVariants({
        variant:"default",
      })}>
      Check Out 
    </Link>
    </div>

    <p className="mt-12 text-base text-gray-500 tracking-wide">
    {data?.description}
    </p>
  </div>
  )
}