import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, updateSession } from '../utils/db';

const EditUser = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();
            if (!session) {
                navigate('/login');
            } else {
                setFullName(session.fullName);
                setEmail(session.email);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSession({ fullName });
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
