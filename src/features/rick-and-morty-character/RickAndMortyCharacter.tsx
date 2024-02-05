import { useState } from "react";
import { useRickAndMortyCharacters } from "./useRickAndMortyCharacters.ts";

export const RickAndMortyCharacter = () => {
    const { characters, updateCharacterIds } = useRickAndMortyCharacters();
    const [id, setId] = useState(1);

    return (
        <div>
            <button onClick={() => {
                setId(old => old + 4);
                updateCharacterIds([String(id), String(id + 1), String(id + 2), String(id + 3)]);
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
