import react, { createContext } from "react";

const initialState = {
    user: null,
}

export const GlobalContext = createContext(initialState)
export const GlobalProvider =({children}) => {
    const [state, setState] =useState(initialState);

    
}