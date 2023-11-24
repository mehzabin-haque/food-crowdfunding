import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import contractABI from "../artifacts/contractABI.json";
// import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Recipes() {
  const [recipes, setRecipes] = useState([])
  const { address } = useAccount();

  const contractAddress = "0xF2A46987867c148691FD8FFBe906A49937C451aF";


  const fetchRecipes = async () => {
    try {
      const data = await readContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "getAllRecipes",
      });
      setRecipes(data);
    } catch (err) {
      console.log("Error loading recipes", err);
    }
  };

  useEffect(() => {
    fetchRecipes()
  }, [])

  const sendFund = async (name: any) => {
    try {
      const request = await prepareWriteContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "sendFunding",
        args: [name],
        account: address,
      });

      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });

      // alert("Successfully sent fund");
      toast.success("Successfully fund raised");
      window.location.reload();
    } catch (err) {
      // alert("Failed to send fund");
      toast.error("Failed to send fund");
      console.log(err);
    }
  };

  const withdrawFund = async (name:any) => {
    try {
      const request = await prepareWriteContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "withdrawFunding",
        args: [name],
        account: address,
      });

      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });
      toast.success("Fund withdrawal successful");
      // alert("Fund withdrawal successful");
      window.location.reload();
    } catch (err) {
      toast.error("Only the recipe owner can withdraw the fund");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-wrap h-screen bg-gray-200 items-center justify-center gap-8">
      {recipes.map((recipe: any) => (
        <Card className="mt-6 w-96 h-fit">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {recipe.name}
            </Typography>
            <Typography>
              Ingredients: {' '}{recipe.ingredients}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            Fund: {' '} {recipe.fundAmount.toString()}
            
            {/* Created at: {' '} {new Date(recipe.time*1000).toLocaleString()} */}
            <br />
            Fund Raised: {' '} {recipe.fundRaisedSoFar.toString()}
          </CardFooter>
          <div className="flex text-center space-x-4 w-full items-center justify-center">
            <button onClick={() => sendFund(recipe.name)} className="bg-blue-500 mb-6  hover:bg-blue-700 text-white font-bold py-2 px-6 
          rounded-lg focus:outline-none">
              Raise Fund</button>

              <button onClick={() => withdrawFund(recipe.name)} className=" bg-blue-500 mb-6  hover:bg-blue-700 text-white font-bold py-2 px-6 
          rounded-lg focus:outline-none">
              Withdraw</button>
          </div>

        </Card>
      ))}
    </div>
  );
}