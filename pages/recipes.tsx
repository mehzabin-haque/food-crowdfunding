import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function Recipes() {
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    const res = await axios.get('/api/recipe')
    setRecipes(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div className="flex flex-wrap h-screen bg-black items-center justify-center gap-8">
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
            Fund: {' '} {recipe.fund_amount}
            <br />
            Created at: {' '} {new Date(recipe.time).toLocaleString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}