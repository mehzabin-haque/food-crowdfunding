import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import RecipeForm from "../components/RecipeForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ConnectButton />
      <RecipeForm />
    </div>
  );
}
