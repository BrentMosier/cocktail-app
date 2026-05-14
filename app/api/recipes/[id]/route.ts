//get recipe by id
//post recipe
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../../../lib/definitions";
import { NextRequest, NextResponse } from "next/server";

//"route handlers" in nextjs
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        //point to the recipe.json file
        const filePath = path.join(process.cwd(), "data", "recipes.json");
        //load file data
        const fileData = await fs.readFile(filePath, "utf8");
        //make it js friendly
        const recipes = JSON.parse(fileData);
        const recipe = recipes.find((r: Recipe) => r.id === id);

        if (!recipe) {
            return NextResponse.json(
                { error: "Recipe not found" },
                { status: 404 },
            );
        }
        // return Response.json(recipe);
        return NextResponse.json(recipe);
    } catch (error) {
        return NextResponse.json(
            { error: "Recipe not found" },
            { status: 500 },
        );
    }
}
