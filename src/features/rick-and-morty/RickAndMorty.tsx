import { useRickAndMortyCharacters } from "./useRickAndMortyCharacters.ts";


export const RickAndMorty = ({ page }: { page: number }) => {
    const { isLoading, characters, isPlaceholderData } = useRickAndMortyCharacters(page);

    if (isLoading) return <span>Loading...</span>;

    return (
        <div>
            <span>IsPlaceholder: {String(isPlaceholderData)}</span>

            {characters.map((character) => (
                <div key={character.id}>
                    <h1>{character.name}</h1>
                    <p>{character.species}</p>
                    <p>{character.status}</p>
                </div>
            ))}
        </div>
    );
};
