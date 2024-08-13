import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import ThemeContext from "../ThemeContext";
import axios from "axios";

const Navbar = ({ scrollToOurmenu, scrollToAbout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.data && response.data.data) {
                        setUser(response.data.data);
                    } else {
                        console.error('Invalid response structure', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.post(
                'http://127.0.0.1:8000/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem('authToken');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 text-primary dark:text-white">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-14 py-4">
                <Link to="/" className="text-2xl font-semibold flex items-center">
                    Tugas 1 PT Aksamedia
                </Link>
                <div className="flex items-center">
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
                                />
                            </svg>
                        </button>
                    </div>
                    <ul
                        className={`flex-col md:flex-row md:flex md:space-x-12 absolute md:static left-0 w-full md:w-auto bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${isOpen ? "top-16 opacity-100" : "top-[-490px] opacity-0"} md:opacity-100 z-20 md:z-auto`}
                    >
                        <li>
                            <Link
                                to="/"
                                className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                onClick={handleLinkClick}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    scrollToOurmenu();
                                    handleLinkClick();
                                }}
                                className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                            >
                                OurProject
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    scrollToAbout();
                                    handleLinkClick();
                                }}
                                className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                            >
                                About
                            </button>
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <button
                                onClick={toggleTheme}
                                className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </button>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link
                                        to="/divisions"
                                        className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                        onClick={handleLinkClick}
                                    >
                                        Divisions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/employees"
                                        className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                        onClick={handleLinkClick}
                                    >
                                        Employees
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/nilai"
                                        className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                        onClick={handleLinkClick}
                                    >
                                        Nilai
                                    </Link>
                                </li>
                                <li className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                    >
                                        {user.name} ({user.phone})
                                        <svg
                                            className="ml-2 w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="block md:inline-block py-2 px-4 md:px-0 md:py-0 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
