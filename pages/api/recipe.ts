import prisma from "../../libs/prisma"

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { name, ingredients, fundAmount, time } = req.body;

      // Assuming ingredients is a comma-separated string, you can split it into an array
      const ingredientsArray = ingredients.split(',');
      console.log(ingredientsArray);
      const recipe = await prisma.recipe.create({
        data: {
          name,
          ingredients: {
            set: ingredientsArray,
          },
          fund_amount: parseFloat(fundAmount), // Assuming fundAmount is a number
          time: new Date(time), // Assuming time is a string representing a valid date
        },
      });
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Recipe creation failed.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const recipes = await prisma.recipe.findMany();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Recipe fetching failed.' });
    }
  }
}