"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";

export default function RecipeSearch({
    onSearchAction,
}: {
    onSearchAction: (term: string) => Promise<void>;
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        onSearchAction(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearchAction]);

    return (
        <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
        />
    );
}
