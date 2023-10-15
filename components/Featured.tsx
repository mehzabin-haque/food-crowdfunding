import { featuredProducts } from "../pages/api/data";
import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <div className=" text-slate-800">
      {/* WRAPPER */}
      <div className=" grid grid-cols-3 gap-3 w-[90%] mx-auto px-3">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className=" shadow-md rounded-md p-3 hover:bg-fuchsia-50 transition-all duration-300 "
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className=" hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" width={200} height={200} className="object-contain"  />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="my-2">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button  className="ml-3 bg-red-500 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
