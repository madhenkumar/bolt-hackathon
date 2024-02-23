"use client"
import React from 'react'
import Profile from '../_components/Profile'
import { useSession } from 'next-auth/react'
import { api } from '~/trpc/react'

type Props = {}

const page = (props: Props) => {
    const session = useSession();
    const user = session.data?.user;
    const imagePath = session.data?.user.image ?? 'public/intel1.jpg';

    const fittingPicture = api.product.getFittingPicture.useQuery().data;
    const fittingPicturePath = fittingPicture ?? 'public/intel1.jpg';


    return (
      <div className="w-full py-6 space-y-6 lg:py-12">
        <div className="container grid max-w-2xl gap-6 px-4 md:gap-10 lg:grid-cols-profile lg:max-w-5xl xl:gap-14 xl:px-6">
          <div className="flex flex-col items-center gap-2 lg:items-start lg:gap-4">
            <div className="rounded-full overflow-hidden border-4 border-gray-100">
              <img
                alt="Profile"
                className="rounded-full object-cover"
                height="128"
                src={imagePath}
                style={{
                  aspectRatio: "128/128",
                  objectFit: "cover",
                }}
                width="128"
              />
            </div>
            <div className="space-y-1 text-center lg:text-left">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
            </div>
          </div>
          <h1>Picture used for Virtual Fitting Room:</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
            <div className="aspect-[1/1] rounded-lg overflow-hidden">
              <img
                alt="Post"
                className="object-cover object-center"
                height="500"
                src={fittingPicturePath}
                style={{
                  aspectRatio: "500/500",
                  objectFit: "cover",
                }}
                width="500"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

export default page