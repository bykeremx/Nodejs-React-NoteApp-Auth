import { useContext } from 'react';
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router';



const useAuth = () => {
    const { AuthState, AuthDispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const Login = async (email, password) => {
        try {
            const LoginFetch = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!LoginFetch.ok) {
                const errorData = await LoginFetch.json();
                throw new Error(errorData.message || "Giriş başarısız oldu.");
            }

            const data = await LoginFetch.json();
            AuthDispatch({
                type: 'LOGIN',
                payload: {
                    token: data.token,
                    user: data.user,
                },
            });
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/'); // Giriş başarılıysa yönlendirme
        } catch (error) {
            console.error("Giriş Hatası:", error.message);
            return error.message;
        }
    };

    const Register = async (name,email, password) => {
        try {
            const LoginFetch = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name,email, password }),
            });

            if (!LoginFetch.ok) {
                const errorData = await LoginFetch.json();
                throw new Error(errorData.message || "Kayıt başarısız oldu.");
            }

            const data = await LoginFetch.json();
            AuthDispatch({
                type: 'LOGIN',
                payload: {
                    token: data.token,
                    user: data.user,
                },
            });
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/'); // Giriş başarılıysa yönlendirme
        } catch (error) {
            console.error("Giriş Hatası:", error.message);
            return error.message;
        }
    };
    const Logout = () => {
        AuthDispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        navigate('/login');
    }

    return {
        AuthState,
        Login,
        Logout,
        Register
    };
};

export default useAuth;