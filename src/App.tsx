import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTest } from "./features/hmr/useTest.tsx";
import { RickAndMortyCharacter } from "./features/rick-and-morty-character/RickAndMortyCharacter.tsx";
import { RickAndMortyCharacterCopy } from "./features/rick-and-morty-character/RickAndMortyCharacterCopy.tsx";

const queryClient = new QueryClient();

function App() {
    const { onRender, test } = useTest();

    return (
        <QueryClientProvider client={queryClient}>
            <RickAndMortyCharacter/>
            <RickAndMortyCharacterCopy/>

            {onRender()}
            {test}
        </QueryClientProvider>
    );
}

export default App;
