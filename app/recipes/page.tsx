import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Recipe } from "../lib/definitions";
import RecipeSearch from "../../components/recipe-search";

async function getRecipes() {
    const res = await fetch("http://localhost:3000/api/recipes");
    return res.json();
}

//options for how to handle the app:
//1. client side: keep this page async to search for all recipes, then pass that as a prop to a component that handles the recipe search and display all on the client. Keeps the search logic on the client side.
//2. server side: keep this page async for each recipe search, then use a server action to handle the search logic on the server side. Involves updating the server state on api calls, likely using tanstack query.
export default async function Page() {
    const cocktails: Recipe[] = await getRecipes();

    // This is your Server Action
    async function handleSearch(query: string) {
        "use server";
        console.log("Server received query:", query);
        // Perform database operations or mutate server state here
        // use query string to search recipes
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="w-full">
                    <RecipeSearch onSearchAction={handleSearch} />
                    <ToggleGroup
                        className="mt-4 flex justify-between w-full"
                        size="lg"
                        defaultValue={["whiskey"]}
                        variant="outline"
                        spacing={2}
                    >
                        <ToggleGroupItem value="gin" aria-label="Toggle gin">
                            Gin
                        </ToggleGroupItem>
                        <ToggleGroupItem value="rum" aria-label="Toggle rum">
                            Rum
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="tequila"
                            aria-label="Toggle tequila"
                        >
                            Tequila
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="whiskey"
                            aria-label="Toggle whiskey"
                        >
                            Whiskey
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="vodka"
                            aria-label="Toggle vodka"
                        >
                            Vodka
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="other"
                            aria-label="Toggle other"
                        >
                            Other
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="w-full">
                    {cocktails.map((cocktail) => (
                        <div
                            key={cocktail.id}
                            className="border border-cyan-500 rounded-lg group p-4 my-2 relative"
                        >
                            <div className="flex justify-between items-center group-hover:brightness-50">
                                <h2 className="">{cocktail.name}</h2>
                                <div className="bg-secondary p-1 rounded">
                                    {cocktail.base}
                                </div>
                            </div>
                            <div className="invisible group-hover:visible absolute inset-0 flex flex-col justify-start items-center group-hover:-translate-y-12 transition-transform duration-300 ease-linear">
                                {cocktail.ingredients.map((ingredient) => (
                                    <span
                                        className="justify-self-start"
                                        key={ingredient}
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
