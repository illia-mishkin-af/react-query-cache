import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RickAndMortyCharacter } from "./features/rick-and-morty-character/RickAndMortyCharacter.tsx";
import { RickAndMortyCharacterCopy } from "./features/rick-and-morty-character/RickAndMortyCharacterCopy.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RickAndMortyCharacter/>
            <RickAndMortyCharacterCopy/>
        </QueryClientProvider>
    );
}

export default App;
