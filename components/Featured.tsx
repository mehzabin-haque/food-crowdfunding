import { featuredProducts } from "../pages/api/data";
import Image from "next/image";
import React from "react";
import { Carousel } from "@material-tailwind/react";
import toast from "react-hot-toast";
const Featured = () => {
  
  const fundRaise = () => {
    toast.success("Funds Raised Successfully");
  }

  
  return (
    <div className="w-screen mx-auto overflow-x-scroll text-black">
      {/* WRAPPER */}
      
      <div className="w-max flex ">
        {/* SINGLE ITEM */}
        
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className=" shadow-md rounded-md w-screen h-[60vh] flex flex-col 
            items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 
            md:w-[50vw] xl:w-[33vw] xl:h-[80vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 mt-2 w-full hover:rotate-[60deg] 
              transition-all duration-500">
                <Image src={item.img} alt="" fill className="w-1/6 object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center pt-8 gap-4">
              
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              
              <p className="pt-3 text-justify px-12"><b> Ingredients: </b> {item.ingr}</p>
              {/* <br /> */}
              <p className="pt-1 text-balance"> <b>Taste: </b> {item.taste}</p>
              <span className="text-xl font-bold">${item.price}</span>
              
              <button onClick={fundRaise} className="bg-red-500 text-white p-2 rounded-md">
                Fund Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Featured;
