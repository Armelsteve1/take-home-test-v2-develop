import { DataSource } from "typeorm";
import { Ingredient } from "./Entities/Ingredient";
import { Recipe } from "./Entities/Recipe";
import { ShoppingList } from "./Entities/ShoppingList";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db-dev",
  port: 5432,
  username: "postgres",
  password: "test",
  database: "api-rls",
  entities: [Ingredient, Recipe, ShoppingList],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false,
  logging: true,
});
