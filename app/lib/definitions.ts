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
    link?: string;
    tags?: string[];
}
