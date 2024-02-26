import ImageGallery from "~/app/_components/ImageGallery";
// import { fullProduct } from "@/app/interface";
// import { client } from "@/app/lib/sanity";
import { Star, Truck } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { usePathname } from "next/navigation";
import { EachProduct } from "./components/EachProduct";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params: { id } }: Props) {
  const idObject = { id: id };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <EachProduct params={idObject}/>
        </div>
      </div>
    </div>
  );
}