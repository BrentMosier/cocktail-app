import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

//get all recipes
export async function GET(request: Request) {
    //point to the recipe.json file
    const filePath = path.join(process.cwd(), "data", "recipes.json");
    //load file data
    const fileData = await fs.readFile(filePath, "utf8");
    //make it js friendly
    const recipes = JSON.parse(fileData);

    //extract search query from request
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    //if no search query, return nothing
    if (!query) {
        return NextResponse.json(recipes);
    } else {
        //search for recipes that match the query
        const filteredRecipes = recipes.filter((recipe: any) => {
            return recipe.name.toLowerCase().includes(query.toLowerCase());
        });
        return NextResponse.json(filteredRecipes);
    }
}
