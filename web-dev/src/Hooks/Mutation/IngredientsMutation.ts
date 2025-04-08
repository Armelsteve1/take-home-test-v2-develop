import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
type IngredinetPayload = {
  name: string;
  price: number;
  tag: string;
};
export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  IngredinetPayload
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price ,tag}: IngredinetPayload) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        tag,
      });
    },
    {
      onSuccess: () => {
        //Common mistake: invalidating the wrong query (recipes instead of ingredients) -corrected now
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};
