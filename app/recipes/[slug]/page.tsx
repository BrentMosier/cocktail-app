"use client";
import { Recipe } from "../../lib/definitions";
import { useRecipe } from "../../../server/recipes";
import { use } from "react";

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = use(params);
    const { data: cocktail } = useRecipe(resolvedParams.slug);

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 gap-4 bg-white dark:bg-black sm:items-start">
                <div>Svg image of cocktail</div>
                <div className="w-full">
                    <p className="text-4xl text-center underline font-bold">
                        {cocktail?.name}
                    </p>
                </div>
                <div className="w-full border border-cyan-500 rounded-lg p-4 flex flex-col">
                    <p className="text-2xl text-center underline mb-2">
                        Ingredients
                    </p>
                    <ul className="list-disc pl-4">
                        {cocktail?.ingredients.map((ingredient) => (
                            <li className="text-left" key={ingredient}>
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full border border-cyan-500 rounded-lg p-4 flex flex-col">
                    <p className="text-2xl text-center underline mb-2">
                        Directions
                    </p>
                    <ol className="list-decimal pl-4">
                        {cocktail?.directions.map((ingredient) => (
                            <li className="text-left" key={ingredient}>
                                {ingredient}
                            </li>
                        ))}
                    </ol>
                </div>
                {cocktail?.link ? (
                    <div className="w-full border border-cyan-500 rounded-lg p-4 flex flex-col">
                        <a
                            href={cocktail.link}
                            className="text-2xl text-center mb-2 hover:underline hover:text-cyan-500"
                            target="_blank"
                        >
                            Source
                        </a>
                    </div>
                ) : null}
            </main>
        </div>
    );
}
