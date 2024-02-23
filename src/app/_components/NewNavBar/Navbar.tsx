"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import SignStatus from "./SignStatus";
// import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "All Products", href: "/Products" },
  { name: "Women", href: "/Women" },
  { name: "Men", href: "/Men" },
];

export default function Navbar() {
  const pathname = usePathname();
//   const { handleCartClick } = useShoppingCart();
  return (
    <header className="mb-8 border-b p-5">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Intel<span className="text-primary">Store</span>
          </h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
                    <SignStatus/>


        </nav>
        

        
      </div>
    </header>
  );
}