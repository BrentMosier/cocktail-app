import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

//get all recipes
export async function GET() {
    //point to the recipe.json file
    const filePath = path.join(process.cwd(), "data", "recipes.json");
    //load file data
    const fileData = await fs.readFile(filePath, "utf8");
    //make it js friendly
    const recipes = JSON.parse(fileData);
    return NextResponse.json(recipes);
}
