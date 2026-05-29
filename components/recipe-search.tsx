"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecipes } from "../server/recipes";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";

export default function Page() {
    const [selectedBase, setSelectedBase] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const {
        data: cocktails,
        isLoading,
        error,
    } = useRecipes({
        limit: 10,
        page: 1,
        query: debouncedSearchTerm,
        base: selectedBase,
    });

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="w-full">
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search recipes..."
                    />
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
                    {isLoading && (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-full p-8" />
                            <Skeleton className="h-8 w-full p-8" />
                            <Skeleton className="h-4 w-full p-8" />
                            <Skeleton className="h-4 w-full p-8" />
                            <Skeleton className="h-4 w-full p-8" />
                            <Skeleton className="h-4 w-full p-8" />
                        </div>
                    )}
                    {error && <p>Error: {error.message}</p>}
                    {(!cocktails || cocktails.length === 0) && !isLoading && (
                        <div>No cocktails found</div>
                    )}
                    {cocktails &&
                        cocktails?.map((cocktail) => (
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
                                        {cocktail.ingredients.map(
                                            (ingredient) => (
                                                <span
                                                    className="text-left"
                                                    key={ingredient}
                                                >
                                                    {ingredient}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </main>
        </div>
    );
}
