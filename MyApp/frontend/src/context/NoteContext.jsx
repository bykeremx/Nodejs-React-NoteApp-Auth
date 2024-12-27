import { createContext, useReducer } from "react";

const NoteContext = createContext();
//note için reducer tanımlama 

const initalState = {
    notes: [],
}


const noteReducer = (state, action) => {
    switch (action.type) {
        case 'GET_NOTES':
            return {
                notes: action.payload,
            }
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] }
        case 'DELETE_NOTE':
            return { ...state, notes: state.notes.filter((note) => note._id !== action.payload) }
        default:
            return state;
    }
}



export const NoteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, initalState);
    return (
        <NoteContext.Provider value={{ state, dispatch }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteContext
