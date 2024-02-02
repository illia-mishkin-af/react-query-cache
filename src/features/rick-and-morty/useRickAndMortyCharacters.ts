import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type RickAndMortyResponse = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: {
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
    }[]
};

export const useRickAndMortyCharacters = (page: number = 0) => {
    const { isLoading, data, isPlaceholderData } = useQuery<RickAndMortyResponse>({
        queryKey: ["rick-and-morty", page],
        queryFn: async ({ signal }) => {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, { signal });

            return await response.json();
        },
        staleTime: Infinity
    });
    const [characters, setCharacters] = useState<RickAndMortyResponse["results"]>([]);

    useEffect(() => {
        setCharacters(data?.results || []);
    }, [data, setCharacters]);

    return {
        characters,
        isLoading,
        isPlaceholderData
    };
};
