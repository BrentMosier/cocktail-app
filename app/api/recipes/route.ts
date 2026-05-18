import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../../lib/definitions";

import { NextResponse } from "next/server";

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
    const baseString = searchParams.get("base");
    const base = baseString ? baseString.split("-") : [];

    //if no search query or base filtering, return everything
    if (!query && !baseString) {
        return NextResponse.json(recipes);
    }
    //search for recipes that match the query and base requested
    const filteredRecipes = recipes.filter((recipe: Recipe) => {
        const hasBase =
            base.length > 0 ? base.includes(recipe.base.toLowerCase()) : true;
        const hasQuery = query
            ? recipe.name.toLowerCase().includes(query.toLowerCase())
            : true;
        return hasQuery && hasBase;
    });
    return NextResponse.json(filteredRecipes);
}
