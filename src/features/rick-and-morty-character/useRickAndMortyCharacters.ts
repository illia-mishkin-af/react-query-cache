import { useQueries, useQuery } from "@tanstack/react-query";
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
    // @Omer - This part selects all the characters, but it won't update when the characterIds change from another place
    // const characters = queryClient.getQueriesData<RickAndMortyResponse>({ queryKey: ["rick-and-morty-character"] })
    //                               .map(query => query[1])
    //                               .filter((character): character is RickAndMortyResponse => !!character);
    // @Omer - I thought that it's possible to take first part of queryKey and I gonna select all queries that start with "rick-and-morty-character"
    const characters = useQuery({
        queryKey: ["rick-and-morty-character"],
        enabled: false
    });

    // Always undefined
    console.log(characters);

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
