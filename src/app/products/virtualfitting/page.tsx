"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";

type Props = {}

const page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay using setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after a delay (e.g., 3000 milliseconds)
    }, 3000); // Adjust the delay time (in milliseconds) as needed

    // Clear the timeout when the component unmounts to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (

    <>
       <div>
     {isLoading ? (
      <div>Loading...</div> // Display loading indicator while isLoading is true
    ) : (
    <div className="grid grid-cols-2 gap-4">
  <div className="relative overflow-hidden rounded-lg bg-gray-100">
  <Image
      src="/mask_image.png"
      alt="Photo"
      width={500}
      height={500}
      className="h-full w-full object-cover object-center"
    />
    
  </div>
  <div className="relative overflow-hidden rounded-lg bg-gray-100">
  <Image
      src="/image.png"
      alt="Photo"
      width={500}
      height={500}
      className="h-full w-full object-cover object-center"
    />
  </div>
</div>
 )}
 </div>

</>
  )
}

export default page;