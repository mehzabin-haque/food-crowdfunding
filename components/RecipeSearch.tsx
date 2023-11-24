// pages/RecipeFinder.tsx
import { useState, useEffect } from 'react';

const RecipeFinder = () => {
  const [BIRIYANI_DATASET, setBIRIYANI_DATASET] = useState([]);

  const findAllRecipesFor = (searchQuery: string) => {
    const app_id = "c05ec00d";
    const app_key = "0df19a775461dc23dda06c760c5868d1";
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`;

    useEffect(() => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setBIRIYANI_DATASET(data.hits);
          console.log("Maximum Matching:" + searchRecipe(["Green chilies"], data.hits));
        })
        .catch((error) => console.error(error));
    }, []);

    const getRecipeAndItsIngredients = (jsonRecipeData: any) => {
      return jsonRecipeData.recipe.ingredients;
    }

    const searchRecipe = (myIngredientList: string[], db: any) => {
      let matchedRecipes: string[] = [];

      for (let i = 0; i < db.length; i++) {
        for (let j = 0; j < db[i].recipe.ingredients.length; j++) {
          for (let k = 0; k < myIngredientList.length; k++) {
            if (db[i].recipe.ingredients[j].food === myIngredientList[k]) {
              console.log(db[i].recipe.label);
              matchedRecipes.push(db[i].recipe.label);
            }
          }
        }
      }

      return mode(matchedRecipes);
    }

    const mode = (arr: string[]) => {
      // Calculate the mode (most common element) of the array
      // You can implement the mode function as per your requirements.
      // For simplicity, this example just returns the first element.
      return arr.length > 0 ? arr[0] : null;
    }

    return (
      <div>
        {/* Your JSX content here */}
      </div>
    );
  }

  return <div>{BIRIYANI_DATASET}</div>;
};

export default RecipeFinder;
