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
export const fetchRecipes = async ({
    limit = 10,
    page = 1,
    query = "",
    base = [],
}: RecipeParams): Promise<Recipe[]> => {
    const formattedBase = base.join("-");
    // Automatically switch between Vercel production and local host
    // const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    //     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    //     : "http://localhost:3000";
    // If calling from a Client Component, a relative path `/api/recipes...` works perfectly too
    // const response = await fetch(
    //     `${baseUrl}/api/recipes?limit=${limit}&page=${page}&query=${query}&base=${formattedBase}`,
    // );

    // Using a relative path eliminates CORS because the origin always matches perfectly
    const response = await fetch(
        `/api/recipes?limit=${limit}&page=${page}&query=${query}&base=${formattedBase}`,
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
    // Automatically switch between Vercel production and local host
    // const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    //     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    //     : "http://localhost:3000";

    // If calling from a Client Component, a relative path `/api/recipes...` works perfectly too
    // const response = await fetch(`${baseUrl}/api/recipes/${id}`);

    // // Using a relative path eliminates CORS because the origin always matches perfectly
    const response = await fetch(`/api/recipes/${id}`);
    const data = await response.json();
    return data as Recipe;
};

export const useRecipe = (id: string) => {
    return useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipe(id),
    });
};
