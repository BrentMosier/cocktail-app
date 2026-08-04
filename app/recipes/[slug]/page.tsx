import {
    HydrationBoundary,
    dehydrate,
    QueryClient,
} from "@tanstack/react-query";
import RecipeDetails from "../../../components/recipe-details";
import { fetchRecipe } from "../../../server/recipes";
//added for github actions
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../../lib/definitions";

// 1. Tell Next.js all the possible slugs at build time
export async function generateStaticParams() {
    try {
        const filePath = path.join(process.cwd(), "data", "recipes.json");
        const fileData = await fs.readFile(filePath, "utf8");
        const recipes = JSON.parse(fileData);

        // Ensure the key matches your folder name [slug]
        // Note: If your JSON uses 'id' instead of 'slug', change 'recipe.slug' to 'recipe.id' below
        return recipes.map((recipe: Recipe) => ({
            slug: recipe.id,
        }));
    } catch (error) {
        console.error("Failed to generate static params for recipe pages:", error);
        return [];
    }
}

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
