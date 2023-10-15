"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide.jpg",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.jpg",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide1.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col w-screen md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1 className="text-5xl text-balance text-center uppercase p-4 md:p-10 md:text-4xl xl:text-5xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-red-500 text-white text-lg py-4 px-8 rounded-md">Start Crowd Funding</button>
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
{/* <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div> */}