import { PrismaClient } from '@prisma/client';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // console.log("hello--+++++++----");
    const prisma = new PrismaClient();
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
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}