import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

export type RickAndMortyResponse = {
    id: number;
    name: string;
};

export const useRickAndMortyCharacters = (): { characters: RickAndMortyResponse[]; updateCharacterIds: (characterIds: string[]) => void } => {
    const [characterIds, setCharacterIds] = useState<string[]>([]);
    // const characters = queryClient.getQueriesData<RickAndMortyResponse>({ queryKey: ["rick-and-morty-character"] })
    //                               .map(query => query[1])
    //                               .filter((character): character is RickAndMortyResponse => !!character);
    const characters = useQuery({
        queryKey: ["rick-and-morty-character"],
        enabled: false
    });

    useQueries({
        queries: characterIds.map(characterId => {
            return {
                queryKey: ["rick-and-morty-character", characterId],
                queryFn: async () => {
                    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);

                    return await response.json();
                },
                staleTime: Infinity
            };
        })
    });

    const updateCharacterIds = useCallback((newCharacterIds: string[]) => {
        setCharacterIds(newCharacterIds);
    }, [setCharacterIds]);

    return useMemo(() => {
        return {
            characters: [],
            updateCharacterIds
        };
    }, [characters, updateCharacterIds]);
};
