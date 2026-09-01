import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../app/lib/definitions";

export const fetchMenu = async (ids: string): Promise<Recipe[]> => {
    const response = await fetch(`/api/menu?ids=${ids}`);
    const data = await response.json();
    return data as Recipe[];
};

export const useMenu = (ids: string) => {
    return useQuery({
        queryKey: ["menu", ids],
        queryFn: () => fetchMenu(ids),
    });
};
