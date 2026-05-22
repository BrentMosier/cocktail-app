// "use server";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../app/lib/definitions";

interface RecipeParams {
    limit?: number;
    page?: number;
    query?: string;
    base?: string[];
}

//multiple recipe search
const fetchRecipes = async ({
    limit = 10,
    page = 1,
    query = "",
    base = [],
}: RecipeParams): Promise<Recipe[]> => {
    const formattedBase = base.join("-");
    const response = await fetch(
        `http://localhost:3000/api/recipes?limit=${limit}&page=${page}&query=${query}&base=${formattedBase}`,
    );
    const data = await response.json();
    return data as Recipe[];
};

export const useRecipes = ({
    limit = 10,
    page = 1,
    query = "",
    base = [],
}: RecipeParams) => {
    return useQuery({
        queryKey: ["recipes", limit, page, query, base],
        queryFn: () => fetchRecipes({ limit, page, query, base }),
    });
};

//single recipe search
export const fetchRecipe = async (id: string): Promise<Recipe> => {
    const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
    const data = await response.json();
    return data as Recipe;
};

export const useRecipe = (id: string) => {
    return useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipe(id),
    });
};
