"use client"
import React from 'react'
import { signOut } from "next-auth/react"




const page = () => {
  return (
    <>
       <button onClick={() => signOut()}>Sign out</button>

    </>
  )
}

export default page




