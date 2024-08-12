import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { setSession } from '../utils/db';
import { getAllUsers, createDefaultUser } from '../utils/userDb';

function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        createDefaultUser();

        const rememberMe = localStorage.getItem('rememberMe');
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        if (rememberMe === 'true' && rememberedEmail && rememberedPassword) {
            setData({
                email: rememberedEmail,
                password: rememberedPassword,
                remember: true,
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const users = await getAllUsers();
        const user = users.find((user) => user.email === data.email && user.password === data.password);

        if (user) {
            if (data.remember) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('rememberedEmail', data.email);
                localStorage.setItem('rememberedPassword', data.password);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }

            await setSession({ email: data.email, fullName: user.name });

            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Log in</h2>
                {error && <div className="mt-2 text-red-600">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={handleChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 dark:text-indigo-400"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                            Forgot your password?
                        </a>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log in
                        </button>
                        <Link
                            to="/"
                            className="my-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
