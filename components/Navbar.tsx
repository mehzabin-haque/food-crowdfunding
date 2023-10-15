import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className=" md:flex gap-4 flex-1">
        <Link href="/">Homepage </Link>
        <Link href="/feature" className="px-3">Items </Link>
        {/* <Link href="/">Contact</Link> */}
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">FoodCrowd</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <div className="text-md md:font-bold flex-1 md:text-center">
        <Link href="/offers">Exciting Offers</Link>
      </div>
        </div>
        {!user ? (
          <Link href="/signin">Signin</Link>
        ) : (
          <Link href="/orders">Orders</Link>
        )}
       <Link href="/recipe"> Upload Recipe</Link>
      </div>
    </div>
  );
};

export default Navbar;
