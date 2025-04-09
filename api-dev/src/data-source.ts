import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Ingredient } from "./Entities/Ingredient";
import { Recipe } from "./Entities/Recipe";
import { ShoppingList } from "./Entities/ShoppingList";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Ingredient, Recipe, ShoppingList],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false,
  logging: true,
});