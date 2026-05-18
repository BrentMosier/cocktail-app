export type TypeName = {
    id: string;
    name: string;
};

export interface OldRecipe {
    id: string;
    title: string;
    content: string;
    date: string;
}

export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    directions: string[];
    base: "gin" | "rum" | "tequila" | "whiskey" | "vodka" | "other";
    link?: string;
    tags?: string[];
}
