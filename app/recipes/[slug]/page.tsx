import {
    HydrationBoundary,
    dehydrate,
    QueryClient,
} from "@tanstack/react-query";
import RecipeDetails from "../../../components/recipe-details";
import { fetchRecipe } from "../../../server/recipes";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["recipe", slug],
        queryFn: () => fetchRecipe(slug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <RecipeDetails params={params} />
        </HydrationBoundary>
    );
}
