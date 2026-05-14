import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { Recipe } from "@/lib/definitions";
import { Recipe } from "../lib/definitions";

async function getRecipes() {
    const res = await fetch("http://localhost:3000/api/recipes");
    return res.json();
}

export default async function Page() {
    const posts: Recipe[] = await getRecipes();
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="w-full">
                    <Input placeholder="Search recipes..." />
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
                            Voka
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
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="border border-cyan-500 rounded-lg p-4 my-2 flex justify-between"
                        >
                            <div>
                                <h2 className="">{post.name}</h2>
                            </div>
                            <div>Right</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
