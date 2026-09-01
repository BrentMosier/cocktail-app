"use client";
import { useMenu } from "@/server/menu";

//take in recipes from parent
// display each recipe distinctly
//cut off measurements, just show ingredients
//add style to each recipe, should be inviting
export default function Menu({ menuIds }: { menuIds: string }) {
    const { data: recipes, isLoading, error } = useMenu(menuIds);

    function parseIngredients(ingredients: string[]): string[] {
        const res: string[] = [];
        ingredients.forEach((ingredient) => {
            //don't include garnishes
            if (!ingredient.includes("Garnish")) {
                //remove numbers and measurements
                let fil = ingredient.replace(
                    /[\d\/]+\s*(oz|ml|dashes|dash)?/gi,
                    "",
                );
                //remove everything after ( character, as it's a direction
                fil = fil.split("(")[0];
                //remove whitespace at ends
                fil = fil.trim();
                res.push(fil);
            }
        });
        // return res.join(", ");
        return res;
    }

    return (
        <div className="flex flex-col flex-1 items-center p-8 bg-zinc-50 font-sans bg-linear-to-tr from-white dark:from-black to-cyan-200 dark:to-cyan-950">
            <header className="text-5xl pb-4">Cocktails</header>
            <div className="w-full bg-amber-500 border-b mb-1" />
            <div className="w-full bg-amber-500 border-b mb-4" />
            {isLoading && <div>Loading...</div>}
            {error && <p>Error: {error.message}</p>}
            {!isLoading && (!recipes || recipes.length === 0) && (
                <div className="flex justify-center py-4 text-gray-500">
                    No cocktails found
                </div>
            )}
            <div className="grid grid-cols-1 gap-8 w-full">
                {recipes &&
                    recipes?.map((recipe) => (
                        <article
                            key={recipe.id}
                            className="border border-amber-500 rounded-sm p-4"
                        >
                            <div className="flex justify-center text-3xl pb-4">
                                {recipe.name}
                            </div>
                            <div className="text-xl pb-2 flex flex-wrap gap-2">
                                {parseIngredients(recipe.ingredients).map(
                                    (item, index) => (
                                        <div key={item} className="flex-none">
                                            <span>{item}</span>
                                            {index <
                                                parseIngredients(
                                                    recipe.ingredients,
                                                ).length -
                                                    1 && (
                                                <span className="pl-2">
                                                    &bull;
                                                </span>
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>
                            <div className="text-gray-500 italic">
                                {recipe.description || "Description..."}
                            </div>
                        </article>
                    ))}
            </div>
        </div>
    );
}
