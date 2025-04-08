import { RecipeService } from "../Services/RecipeService";

export class RecipeController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await RecipeService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[RecipeController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeService.create(req.body);
      res.status(201).send({
        status: "success",
        message: "Recipe created successfully",
        data: recipe,
      });
    } catch (err: any) {
      console.error("[RecipeController.create] Error creating recipe", err);
      const errorMessage = err.message || "An error occurred while creating the recipe";
      res.status(400).send({ status: "error", errorMessage });
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeService.update(req.body);
      res.status(200).send({
        status: "success",
        message: "Recipe updated successfully",
        data: recipe,
      });
    } catch (err:any) {
      console.error("[RecipeController.update] Error updating recipe", err);
      const errorMessage = err.message || "An error occurred while updating the recipe";
      res.status(400).send({ status: "error", errorMessage });
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await RecipeService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[RecipeController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
