import React, { useState, useContext } from 'react';
import axios from 'axios';
/*Contexts*/
import { AuthContext } from '../contexts/AuthContext.js';

const Login = () => {
    const { isAuthenticated, handleLogin } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://nn-wines.onrender.com/api/database/login', {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            handleLogin();

        } catch (error) {
            console.error(error);
            setError('Error de inicio de sesión. Por favor, verifica tus credenciales.');
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;