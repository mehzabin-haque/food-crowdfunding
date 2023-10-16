import { useState } from "react";
import prisma from "../libs/prisma";
import axios from "axios";
import recipeContract from "../abi.json";

import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { useAccount } from "wagmi";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    flavors: "",
    name: "",
    fundAmount: "",
    time: "",
  });

  const { address } = useAccount();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // You can send the recipe data to your Prisma backend here\
      console.log("hello-----------");
      // const response = await axios.post("/api/recipe", {
      //   // method: 'POST',

      //   name: recipe.name,
      //   ingredients: recipe.flavors,
      //   fundAmount: recipe.fundAmount,
      //   time: recipe.time,
      // });

      // write nontract data

      // Prepare for transaction
      const { request } = await prepareWriteContract({
        abi: recipeContract,
        address: "0xefa16EC8b5d68533eCa44C66A9Ad4C20426Ed032",
        functionName: "createRecipe",
        args: [recipe.name, [recipe.flavors], recipe.fundAmount, recipe.time],
      });

      // Contract write
      const { hash } = await writeContract(request);

      // Get transaction receipt
      const receipt = await waitForTransaction({ hash });

      console.log({ receipt });

      if (response.status === 200) {
        console.log("Recipe submitted successfully.");
      } else {
        console.error("Recipe submission failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-2/5 mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="flavors"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Flavors
          </label>
          <input
            type="text"
            id="flavors"
            name="flavors"
            value={recipe.flavors}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fundAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Fund Amount
          </label>
          <input
            type="number"
            id="fundAmount"
            name="fundAmount"
            value={recipe.fundAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Time
          </label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            value={recipe.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-xl focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
