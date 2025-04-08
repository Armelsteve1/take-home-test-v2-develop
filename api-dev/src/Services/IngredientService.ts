import { Ingredient } from "../Entities/Ingredient";
import { AppDataSource } from "../data-source";

export class IngredientService {
  static async list(): Promise<Ingredient[]> {
    const ingredient = await AppDataSource.getRepository(Ingredient).find();
    return ingredient;
  }

  static async create(ingredient: Ingredient): Promise<Ingredient> {
    const newIngredient = await AppDataSource.getRepository(Ingredient).save(ingredient);
    return newIngredient;
  }

  static async update(ingredient: Ingredient): Promise<Ingredient> {
    const updatedIngredient = await AppDataSource.getRepository(Ingredient).save(ingredient);
    return updatedIngredient;
  }

  static async delete(id: number): Promise<void> {
    await AppDataSource.getRepository(Ingredient).delete(id);
  }
}
