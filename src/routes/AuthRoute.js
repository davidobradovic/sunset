import React, { useState } from 'react';
import axios from 'axios';
import { useAppData } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';

const AuthRoute = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setIsUserAuthed } = useAppData();

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/sunset/api/auth/login', { username, password });
            const token = response.data.token;

            // Store the token in localStorage or a secure storage method of your choice
            localStorage.setItem('token', token);

            setIsUserAuthed(true);
            navigate('/moderator')
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
            // Handle login failure, show an error message, etc.
        }
    };

    return (
        <div style={{ backgroundColor: '#132547', height: '100vh'}} className='flex items-center flex-col justify-center text-white'>
            <h1 className='text-3xl uppercase font-semibold pb-5'>Login</h1>
            <form style={{ backgroundColor: '#132547'}} className='flex flex-col w-4/5' onSubmit={handleLogin}>
                <label className='text-xs font-semibold pb-1 uppercase' htmlFor="username">Username:</label>
                <input
                    className='w-full bg-gray-900 text-white p-3 text-sm'
                    placeholder='Unesite username'
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <label className='text-xs font-semibold pb-1 uppercase' htmlFor="password">Password:</label>
                <input
                    className='w-full bg-gray-900 text-white p-3 text-sm'
                    placeholder='Unesite sifru'
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button className='w-full p-3 bg-blue-600' type="submit">Login</button>
            </form>
        </div>
    );
};

export default AuthRoute;
