"use client";

import Image from "next/image";
// import { urlFor } from "../lib/sanity";
import { useState } from "react";

// interface iAppProps {
//   images: any;
// }

export default function ImageGallery() {
//   const [bigImage, setBigImage] = useState(images[0]);

//   const handleSmallImageClick = (image: any) => {
//     setBigImage(image);
//   };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div> */}

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src="https://utfs.io/f/edd1575a-b3d2-404d-b368-3e14ba46eb37-ujjlvi.jpg"
          alt="Photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center "
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}