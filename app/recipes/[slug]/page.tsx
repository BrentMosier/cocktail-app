import { Recipe } from "../../lib/definitions";

async function getRecipe(id: string) {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
    return res.json();
}
export default async function Page() {
    const recipe: Recipe = await getRecipe("1");
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1>Specific Recipe</h1>
                <div>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.ingredients.join(", ")}</p>
                </div>
            </main>
        </div>
    );
}
