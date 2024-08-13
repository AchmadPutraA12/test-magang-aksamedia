import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const NilaiTable = () => {
    const [nilaiData, setNilaiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState('/nilai');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetchNilaiData();
    }, [selectedRoute, currentPage, itemsPerPage]);

    const fetchNilaiData = async () => {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api${selectedRoute}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,
                    per_page: itemsPerPage
                },
            });

            if (response.data && response.data.data) {
                setNilaiData(response.data.data);
                setCurrentPage(response.data.pagination?.current_page || 1);
                setLastPage(response.data.pagination?.last_page || 1);
            } else {
                console.error("Invalid response structure", response.data);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching nilai data:", error);
            toast.error("Error fetching nilai data.");
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const handleRouteChange = (event) => {
        setSelectedRoute(event.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-16">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">Nilai Data</h1>
                <div className="mb-4 flex space-x-4">
                    <select
                        value={selectedRoute}
                        onChange={handleRouteChange}
                        className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                        <option value="/nilai">All Nilai</option>
                        <option value="/nilairt">Nilai RT</option>
                        <option value="/nilaist">Nilai ST</option>
                    </select>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={15}>15 per page</option>
                    </select>
                </div>
                {loading ? (
                    <p className="dark:text-white">Loading...</p>
                ) : (
                    <table className="min-w-full bg-white dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b dark:text-white">No</th>
                                <th className="py-2 px-4 border-b dark:text-white">Nama</th>
                                <th className="py-2 px-4 border-b dark:text-white">NISN</th>
                                <th className="py-2 px-4 border-b dark:text-white">Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nilaiData.map((nilai, index) => (
                                <tr key={index} className="dark:bg-gray-700">
                                    <td className="py-2 px-4 border-b dark:text-white">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="py-2 px-4 border-b dark:text-white">{nilai.nama}</td>
                                    <td className="py-2 px-4 border-b dark:text-white">{nilai.nisn}</td>
                                    <td className="py-2 px-4 border-b dark:text-white">{nilai.nilai || nilai.nilaiST}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Previous
                    </button>
                    <span className="dark:text-white">
                        Page {currentPage} of {lastPage}
                    </span>
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

export default NilaiTable;
