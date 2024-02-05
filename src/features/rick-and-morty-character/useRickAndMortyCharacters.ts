import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

export type RickAndMortyResponse = {
    id: number;
    name: string;
};

/**
 * The same situtaion as in useJiraAvatars. We have array of characterIds and we want to update and keep in cache them.
 */
export const useRickAndMortyCharacters = (): { characters: RickAndMortyResponse[]; updateCharacterIds: (characterIds: string[]) => void } => {
    const [characterIds, setCharacterIds] = useState<string[]>([]);
    const characterQueries: UseQueryResult<RickAndMortyResponse>[] = useQueries({
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
        const characters = characterQueries.map(query => query.data)
                                           .filter((query): query is RickAndMortyResponse => !!query);

        return {
            characters,
            updateCharacterIds
        };
    }, [characterQueries, updateCharacterIds]);
};
