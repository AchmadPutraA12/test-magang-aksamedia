import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, addUser, updateUser, deleteUser } from '../utils/userDb';
import { getSession, setSession, updateSession } from '../utils/db';
import Navbar from '../Components/Navbar';

const ITEMS_PER_PAGE = 5;

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [editUserId, setEditUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (!session) {
                navigate('/login');
            } else {
                setLoggedInUser(session);
            }
        };
        checkSession();
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getAllUsers();
            setUsers(allUsers);
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editUserId !== null) {
            await updateUser({ id: editUserId, ...newUser });
            if (loggedInUser && loggedInUser.email === newUser.email) {
                await updateSession({ name: newUser.name, email: newUser.email });
                setLoggedInUser({ ...loggedInUser, name: newUser.name, email: newUser.email });
            }

            setEditUserId(null);
        } else {
            await addUser(newUser);
        }
        setNewUser({ name: '', email: '', password: '' });
        const updatedUsers = await getAllUsers();
        setUsers(updatedUsers);
    };

    const handleEdit = (user) => {
        setEditUserId(user.id);
        setNewUser({ name: user.name, email: user.email, password: user.password });
    };

    const handleDelete = async (id) => {
        const userToDelete = users.find((user) => user.id === id);
        if (userToDelete && loggedInUser && loggedInUser.email === userToDelete.email) {
            alert("You cannot delete the account currently logged in.");
            return;
        }

        await deleteUser(id);
        const updatedUsers = await getAllUsers();
        setUsers(updatedUsers);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage);
        navigate(`?${params.toString()}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const params = new URLSearchParams(window.location.search);
        params.set('search', e.target.value);
        navigate(`?${params.toString()}`);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page'), 10);
        const search = params.get('search');
        if (page) setCurrentPage(page);
        if (search) setSearchTerm(search);
    }, []);

    return (
        <>
            <Navbar />
            <div className="my-16 min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Management</h2>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <button
                                type="submit"
                                className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                {editUserId !== null ? 'Update User' : 'Add User'}
                            </button>
                        </div>
                    </form>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-300 rounded w-full md:w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded mb-4">
                        <thead>
                            <tr className="text-gray-900 dark:text-white">
                                <th className="border-b dark:border-gray-700 p-2 text-left">Name</th>
                                <th className="border-b dark:border-gray-700 p-2 text-left">Email</th>
                                <th className="border-b dark:border-gray-700 p-2 text-left">Password</th>
                                <th className="border-b dark:border-gray-700 p-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="text-gray-900 dark:text-white">
                                    <td className="border-b dark:border-gray-700 p-2">{user.name}</td>
                                    <td className="border-b dark:border-gray-700 p-2">{user.email}</td>
                                    <td className="border-b dark:border-gray-700 p-2">{user.password}</td>
                                    <td className="border-b dark:border-gray-700 p-2 text-right">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 rounded ${index + 1 === currentPage
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserManagement;
