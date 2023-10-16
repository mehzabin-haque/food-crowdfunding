import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="h-12 font-bold text-sm text-red-500 p-4 flex items-center 
    justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className=" md:flex gap-4 flex-1">
        <Link href="/">Homepage </Link>
        <Link href="/feature" className="px-3">Items </Link>
        {/* <Link href="/">Contact</Link> */}
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">FoodieGoodie</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 
        cursor-pointer bg-red-500 rounded-md py-2 px-4">
          <div className="text-md text-white md:font-bold flex-1 md:text-center">
            <Link href="/offers">Exciting Offers</Link>
          </div>
        </div>
        {!user ? (
          <Link href="/signin">Sign In</Link>
        ) : (
          <><Link href="/recipe"> Upload Recipe</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/recipes">Recipes</Link>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-500 text-white py-2 px-4 rounded-md">Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
