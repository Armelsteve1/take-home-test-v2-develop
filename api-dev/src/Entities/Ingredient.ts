import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum IngredientType {
  VEGETABLE = "légumes",
  PROTEIN = "protéines",
  CARB="féculents",
}
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
  @Column({
    type: "enum",
    enum: IngredientType,
    default: IngredientType.VEGETABLE,
  })
  tag: IngredientType;
}
