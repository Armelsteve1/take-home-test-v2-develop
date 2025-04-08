import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Ingredient, IngredientType } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";

export class RecipeService {
  static async list(): Promise<Recipe[]> {
    const recipes = await AppDataSource.getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    return recipes;
  }

  static async validateIngredients(recipe: Recipe): Promise<void> {
    const ingredientsRepo = AppDataSource.getRepository(Ingredient);
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const ingredients = await ingredientsRepo.find({
      where: { id: In(recipe.ingredients.map((i:any)=> i.id || i )) },
    });

    //comptage
    let proteinCount =0;
    let carbCount =0;

    for (const ing of ingredients) {
      if (ing.tag === IngredientType.PROTEIN) proteinCount++;
      if (ing.tag === IngredientType.CARB) carbCount++;
    }
    if (proteinCount>1) {
      throw new Error("Too many proteins");
    }
    if (carbCount>1) {
      throw new Error("Too many carbs");
    }
    //validation

    const existingRecipes = await recipeRepo.find({
      relations: ["ingredients"],
    });

    for (const recipeItem of existingRecipes) {
      if (recipeItem.id === recipe.id) continue;
      for (const ing of recipeItem.ingredients) {
        if (
          ing.tag === IngredientType.PROTEIN &&
          ingredients.find(i=> i.id === ing.id)
        ){
          throw new Error(
            `the protein ${ing.name} is already used in the recipe ${recipeItem.name}`);
        }
      }
    }
    recipe.ingredients= ingredients;
  }

  static async create(recipe: Recipe): Promise<Recipe> {
   await this.validateIngredients(recipe);
   const newRecipe = await AppDataSource.getRepository(Recipe).save(recipe);
    return newRecipe;
  }

  static async update(recipe: Recipe): Promise<Recipe> {
    await this.validateIngredients(recipe);
    const updatedRecipe = await AppDataSource.getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await AppDataSource.getRepository(Recipe).delete(id);
  }
}
