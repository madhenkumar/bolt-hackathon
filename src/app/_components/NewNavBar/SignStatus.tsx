"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { ShoppingBag } from "lucide-react";
import NewUserAccountNav from "./NewUserAccountNav";


// className={buttonVariants({
//     variant: 'ghost',
//     class: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
// })}

const SignStatus = () => {

    const session = useSession();
    return (
        <div className='ml-auto flex items-center'>
            <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>


                {session?.status === 'authenticated' ? <NewUserAccountNav /> : (
                    <Link
                        href='/api/auth/signin'
                        className="text-lg font-semibold transition duration-100 text-blue-500 hover:text-blue-700"
                       >
                        Sign In
                    </Link>
                )}

                {/* {session?.status === 'authenticated' ? (
                    <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                    />
                ) : null}

                {session ? null : (
                    <div className='flex lg:ml-6'>
                        <span
                            className='h-6 w-px bg-gray-200'
                            aria-hidden='true'
                        />
                    </div>
                )} */}

                {/* {session?.status === 'authenticated' ? (<div className='ml-4 flow-root lg:ml-6'>
                    <div className="flex divide-x border-r sm:border-l">

                        <ShoppingBag />
                        <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                            Cart
                        </span>

                    </div>
                </div>) : null} */}



            </div>
        </div>


    );
}

export default SignStatus;