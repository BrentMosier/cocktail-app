import Link from "next/link";


export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <p>
                    This application is a constant work in progress. It will house a mix of various small apps I want to have hosted, but are not big enough to spin up in their own instance.
                </p>
                <Link className="hover:underline" href="/recipes">
                    Recipes
                </Link>
            </main>
        </div>
    );
}
