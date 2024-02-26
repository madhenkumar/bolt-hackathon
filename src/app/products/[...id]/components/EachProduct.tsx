import { Star, Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ImageGallery from '~/app/_components/ImageGallery'
import { Button, buttonVariants } from '~/components/ui/button'
import { api } from '~/trpc/server'

type Props = {
  params: {
    id: string;
  };
};
export const EachProduct = ({ params: { id } }: Props) => {

    const data = api.product.getOneProduct.query(id);
    console.log(data);
    const exampleObject = {
        id: "1",
        title: "Jean Jacket",
        description: "Introducing our timeless denim jacket, a wardrobe essential that seamlessly blends style and versatility.",
        images: "https://utfs.io/f/1bdcc798-52d1-4cde-a061-da46d95cc2d7-jb6l2q.jpg",
        price: 100000,
        brandId: "Levi's",
        createdAt: new Date("2024-02-23T08:00:00Z"),
        updatedAt: new Date("2024-02-23T08:30:00Z")
      };

    //   const fittingPicturePath = fittingPicture ?? 'public/intel1.jpg';


  return (
    <>
    <div> 
    <ImageGallery id={exampleObject.images} />

    </div>
    <div className="md:py-8">
    <div className="mb-2 md:mb-3">
      <span className="mb-0.5 inline-block text-gray-500">
        Men
      </span>
      <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
        {exampleObject.title}
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
        ${exampleObject.price}
        </span>
        <span className="mb-0.5 text-red-500 line-through"> 
            Price
         ${exampleObject.price+30}
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
    <Button className="mt-2.5 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
    Try using Virtual Fitting Room
    </Button>

    <p className="mt-12 text-base text-gray-500 tracking-wide">
    {exampleObject.description}
    </p>
  </div>
  </>
  )
}