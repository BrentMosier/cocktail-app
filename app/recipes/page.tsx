"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Recipe } from "../lib/definitions";
import RecipeSearch from "../../components/recipe-search";
import { useRecipes } from "../../server/recipes";
import { useState } from "react";
import Link from "next/link";

//options for how to handle the app:
export default function Page() {
    const [query, setQuery] = useState("");
    const [selectedBase, setSelectedBase] = useState<string[]>([]);

    async function handleSearch(query: string) {
        setQuery(query);
    }

    //add conditional rendering for when isLoading and error are true
    const { data, isLoading, error } = useRecipes({
        limit: 10,
        page: 1,
        query: query,
        base: selectedBase,
    });
    const cocktails: Recipe[] = data ?? [];

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="w-full">
                    <RecipeSearch onSearchAction={handleSearch} />
                    <ToggleGroup
                        className="mt-4 flex justify-between w-full"
                        size="lg"
                        defaultValue={[]}
                        variant="outline"
                        spacing={2}
                        multiple
                        value={selectedBase}
                        onValueChange={setSelectedBase}
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
                        <Link
                            key={cocktail.id}
                            href={`/recipes/${cocktail.id}`}
                        >
                            <div className="border border-cyan-500 rounded-lg group p-4 my-2 relative overflow-hidden h-20">
                                <div className="flex justify-between items-center group-hover:brightness-50">
                                    <h2 className="">{cocktail.name}</h2>
                                    <div className="bg-secondary p-1 rounded">
                                        {cocktail.base}
                                    </div>
                                </div>
                                <div
                                    className="invisible group-hover:visible absolute inset-0 flex flex-col pl-[38%] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100
                                               group-hover:animate-[scrollUp_6s_linear_infinite_0.5s]"
                                >
                                    {cocktail.ingredients.map((ingredient) => (
                                        <span
                                            className="text-left"
                                            key={ingredient}
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
