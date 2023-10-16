import { ConnectButton } from "@rainbow-me/rainbowkit";
import RecipeForm from "../components/RecipeForm";
import Recipes from "../components/Recipes";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-12">
      {/* <ConnectButton />
      <RecipeForm /> */}
      <Recipes />
    </div>
  );
}
