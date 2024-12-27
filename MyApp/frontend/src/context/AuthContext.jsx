import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

// Reducer
const initialState = {
    isAuthenticated: !!JSON.parse(localStorage.getItem('user')), // Kullanıcı varsa true
    user: JSON.parse(localStorage.getItem('user'))?.user || null,
    token: JSON.parse(localStorage.getItem('user'))?.token || null,
};

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            localStorage.removeItem('user');
            return initialState;
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const LoginStatus = () => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.token) {
                dispatch({ type: 'LOGIN', payload: { user, token: user.token } });
            }
        };
        LoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ AuthState: state, AuthDispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
