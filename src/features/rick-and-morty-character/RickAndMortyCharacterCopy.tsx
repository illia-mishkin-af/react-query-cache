import { useRickAndMortyCharacters } from "./useRickAndMortyCharacters.ts";

export const RickAndMortyCharacterCopy = () => {
    const { characters } = useRickAndMortyCharacters();

    return (
        <div>
            {characters.map((character) => (
                <div key={character.id}>
                    <h1>{character.name}</h1>
                </div>
            ))}
        </div>
    );
};
