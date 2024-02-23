'use client'

import { User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
// import { User } from '@/payload-types'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'


const NewUserAccountNav = () => {
  const {data,status} = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          <User className='text-gray-600 transition duration-100 hover:text-primary'/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-white w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>
              {data?.user.name}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/profile'>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <p className='text-red-500' onClick={() => signOut()}>Sign Out</p>  
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NewUserAccountNav