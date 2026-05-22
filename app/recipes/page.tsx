import { fetchRecipes } from "../../server/recipes";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import RecipeSearch from "../../components/recipe-search";

export default async function Page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["recipes"],
        queryFn: () => fetchRecipes({ limit: 10, page: 1, query: "" }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <RecipeSearch />
        </HydrationBoundary>
    );
}
