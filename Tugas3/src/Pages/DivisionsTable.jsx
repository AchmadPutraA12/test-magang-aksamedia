// src/pages/DivisionsTable.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const DivisionsTable = () => {
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        fetchDivisions();
    }, [currentPage]);

    useEffect(() => {
        if (nameFilter === '') {
            fetchDivisions();
        } else {
            fetchFilteredDivisions();
        }
    }, [nameFilter]);

    const fetchDivisions = async () => {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/devisi', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,
                }
            });
            const data = response.data;
            setDivisions(data.data.divisions);
            setCurrentPage(data.pagination.current_page);
            setLastPage(data.pagination.last_page);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching divisions:", error);
            setLoading(false);
        }
    };

    const fetchFilteredDivisions = async () => {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/devisi', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    name: nameFilter
                }
            });
            const data = response.data;
            setDivisions(data.data.divisions);
            setCurrentPage(data.pagination.current_page);
            setLastPage(data.pagination.last_page);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching filtered divisions:", error);
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-24">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">Divisions</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filter by name"
                        value={nameFilter}
                        onChange={handleFilterChange}
                        className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>
                {loading ? (
                    <p className="dark:text-white">Loading...</p>
                ) : (
                    <table className="min-w-full bg-white dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b dark:text-white">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {divisions.map((division) => (
                                <tr key={division.id} className="dark:bg-gray-700">
                                    <td className="py-2 px-4 border-b dark:text-white">{division.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Previous
                    </button>
                    <span className="dark:text-white">Page {currentPage} of {lastPage}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default DivisionsTable;
