
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import Hero from "./_components/Hero";
import Newest from "./_components/Newest";

export default async function Home(){
  const session = await getServerAuthSession();
  return(
    <>
    <Hero />
    <Newest/>
    {/* <Link
              href='/api/auth/signin'
              className={buttonVariants({
                variant: 'ghost',
              })}>
              Sign In
            </Link>
            <p> {session?.user.name}</p> */}

    
    </>
  );
}
