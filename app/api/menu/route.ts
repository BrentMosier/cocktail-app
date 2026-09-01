import { Recipe } from "../../lib/definitions";
import { NextResponse } from "next/server";
import recipes from "@/data/recipes.json";

//pass in a list of comma seperated ids for recipes
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const idString = searchParams.get("ids");
    const idArray: string[] = idString ? idString.split(",") : [];

    //fetch recipe data that matches each id
    const results: Recipe[] = [];

    for (const entry of idArray) {
        const recipe = (recipes as Recipe[]).find((rec) => rec.id === entry);
        if (!recipe) {
            return NextResponse.json(
                { error: "Recipe not found" },
                { status: 404 },
            );
        }
        results.push(recipe);
    }
    return NextResponse.json(results);
}
