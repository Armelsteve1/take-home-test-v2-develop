import { AppDataSource } from "../data-source";
import { Recipe } from "../Entities/Recipe";
import { ShoppingList } from "../Entities/ShoppingList";

export class ShoppingListService {
  static async getOne(id: number): Promise<ShoppingList | undefined> {
    const shoppingList = await AppDataSource.getRepository(ShoppingList).findOne({
      where: { id },
      relations: ["recipes", "recipes.ingredients"],
    });
    return shoppingList ?? undefined;
  }

  static async list(): Promise<ShoppingList[]> {
    const shoppingListList = await AppDataSource.getRepository(ShoppingList).find({
      relations: ["recipes"],
    });
    return shoppingListList;
  }

  static async create(shoppingList: {
    name: string;
    numberOfMeals: number;
    maximumPrice: number | undefined;
    numberOfPeople: number | undefined;
  }): Promise<ShoppingList> {
    const recipesQuery = AppDataSource.getRepository(Recipe)
      .createQueryBuilder("recipe")
      .select("recipe")
      .addSelect("SUM(ingredient.price * recipe.numberOfPeople)", "sum")
      .innerJoin("recipe.ingredients", "ingredient")
      .groupBy("recipe.id");

    if (shoppingList.maximumPrice !== undefined) {
      recipesQuery.having(
        "SUM(ingredient.price * recipe.numberOfPeople) <= :maximumPrice",
        {
          maximumPrice: shoppingList.maximumPrice,
        }
      );
    }

    if (shoppingList.numberOfPeople !== undefined) {
      recipesQuery.andWhere("recipe.numberOfPeople <= :numberOfPeople", {
        numberOfPeople: shoppingList.numberOfPeople,
      });
    }

    recipesQuery.limit(shoppingList.numberOfMeals).orderBy("RANDOM()");

    const recipes = await recipesQuery.getMany();

    const shoppingListWithRecipes = new ShoppingList();
    shoppingListWithRecipes.name = shoppingList.name;
    shoppingListWithRecipes.recipes = recipes;

    const newShoppingList = await AppDataSource.getRepository(ShoppingList).save(
      shoppingListWithRecipes
    );
    return newShoppingList;
  }

  static async update(shoppingList: ShoppingList): Promise<ShoppingList> {
    const updatedShoppingList = await AppDataSource.getRepository(ShoppingList).save(
      shoppingList
    );
    return updatedShoppingList;
  }

  static async delete(id: number): Promise<void> {
    await AppDataSource.getRepository(ShoppingList).delete(id);
  }
}
