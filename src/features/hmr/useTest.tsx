import { Test } from "./Test.tsx";

export const useTest = () => {
    return {
        onRender: () => <Test />,
        test: 'dpa'
    };
};
