"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Let's Create Foodie Memories Together",
    image: "/tt1.jpg",
  },
  {
    id: 2,
    title: "Hungry for Success? Help Us Cook It Up!",
    image: "/slide2.jpg",
  },
  {
    id: 3,
    title: "Flavorful Dreams, Fueled by Your Support",
    image: "/tt.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const route = useRouter();
  const routing = () => {
    route.push("/feature");
  };
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col w-screen md:h-[calc(100vh-9rem)] 
    lg:flex-row bg-fuchsia-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1 className="text-4xl text-balance text-center py-4 lg:px-16 md:p-10 md:text-3xl 
        xl:text-4xl">
          {data[currentSlide].title}
        </h1>
        <button onClick={routing} className="bg-red-500 text-white text-lg py-4 px-8 rounded-md">Start Crowd Funding</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative mt-16 mr-16">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
