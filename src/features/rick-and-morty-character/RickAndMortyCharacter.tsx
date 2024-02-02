import { useState } from "react";
import { useRickAndMortyCharacters } from "./useRickAndMortyCharacters.ts";

export const RickAndMortyCharacter = () => {
    const { characters, updateCharacterIds } = useRickAndMortyCharacters();
    const [id, setId] = useState(1);

    return (
        <div>
            <button onClick={() => {
                setId(old => old + 1);
                updateCharacterIds([String(id)]);
            }}>Add new character
            </button>
            {characters.map((character) => (
                <div key={character.id}>
                    <h1>{character.name}</h1>
                </div>
            ))}
        </div>
    );
};
