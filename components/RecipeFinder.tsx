import { useState, useEffect } from 'react';

function mode(array: string[]) {
  if (array.length === 0) return null;
  const modeMap: Record<string, number> = {};
  let maxEl = array[0];
  let maxCount = 1;

  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (modeMap[el] === undefined) modeMap[el] = 1;
    else modeMap[el]++;

    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }

  return maxEl;
}

const RecipeFinder = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [BIRIYANI_DATASET, setBIRIYANI_DATASET] = useState<any[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = () => {
    const app_id = "c05ec00d";
    const app_key = "0df19a775461dc23dda06c760c5868d1";
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setBIRIYANI_DATASET(data.hits);
            if (searchQuery) {
                const result = searchRecipe([searchQuery], data.hits);
                setResult(`Maximum Matching: ${result}`);
            }
            console.log(data);
        })
        .catch((error) => console.error(error));
  };

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

    return (matchedRecipes);
  }

return (
    <div className='max-w-sm bg-white rounded-lg overflow-hidden shadow-lg dark:bg-neutral-700'>
        <input
            type="text"
            placeholder="Search for a recipe..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <div >

        {result && (
        <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg dark:bg-neutral-700">
          <div className="px-6 py-4">
            <p className="text-xl font-semibold text-primary">{result}</p>
          </div>
        </div>
      )}
        </div>
        {/* Your JSX content here */}
    </div>
);
};

export default RecipeFinder;
