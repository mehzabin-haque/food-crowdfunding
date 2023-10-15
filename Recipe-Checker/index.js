const misc = require("./misc");
let BIRIYANI_DATASET;

function findAllRecipesFor(searchQuery){
    const app_id = "c05ec00d";
    const app_key = "0df19a775461dc23dda06c760c5868d1";
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`;

    //console.log(apiUrl);

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data)=>{
        //console.log(JSON.stringify(data));
        /*for(let i=0; i<data["hits"].length; i++){
            console.log(getRecipeAndItsIngredients(data["hits"][i]));
        }*/
        //console.log(JSON.stringify(data["hits"]));
        BIRIYANI_DATASET = data["hits"];
        console.log("Maximum Matching:" + searchRecipe(["Green chilies"],BIRIYANI_DATASET));

    })
    .catch(error => console.error(error));
}

function getRecipeAndItsIngredients(jsonRecipeData){
    return jsonRecipeData.recipe.ingredients;
}

function searchRecipe(myIngredientList, db){
    let matchedRecipes = [];

    for(let i=0; i<db.length; i++){
        for(let j=0; j<db[i]["recipe"]["ingredients"].length; j++){
            for(let k=0; k<myIngredientList.length; k++){
              if(db[i]["recipe"]["ingredients"][j]["food"]==myIngredientList[k]){
                    console.log(db[i]["recipe"]["label"]);
                    matchedRecipes.push(db[i]["recipe"]["label"]);
                }
            }
        }
    }

    return misc.mode(matchedRecipes);
}

findAllRecipesFor("biriyani");
