import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import EmployeeModal from "./EmployeeModal";
import ConfirmationModal from "./ConfirmationModal";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
        fetchDivisions();
    }, [currentPage]);

    useEffect(() => {
        fetchFilteredEmployees();
    }, [nameFilter, selectedDivision]);

    const fetchEmployees = async () => {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        try {
            const params = { page: currentPage };
            if (nameFilter.trim()) params.name = nameFilter;
            if (selectedDivision) params.division_id = selectedDivision;

            const response = await axios.get('http://127.0.0.1:8000/api/employe', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            const data = response.data;
            setEmployees(data.data.employees);
            setCurrentPage(data.pagination.current_page);
            setLastPage(data.pagination.last_page);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching employees:", error);
            toast.error("Error fetching employees.");
            setLoading(false);
        }
    };

    const fetchFilteredEmployees = async () => {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        try {
            const params = { page: currentPage };
            if (nameFilter.trim()) params.name = nameFilter;
            if (selectedDivision) params.division_id = selectedDivision;

            const response = await axios.get('http://127.0.0.1:8000/api/employe', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            const data = response.data;
            setEmployees(data.data.employees);
            setCurrentPage(data.pagination.current_page);
            setLastPage(data.pagination.last_page);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching filtered employees:", error);
            toast.error("Error fetching filtered employees.");
            setLoading(false);
        }
    };

    const fetchDivisions = async () => {
        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/divisions/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setDivisions(response.data.data);
        } catch (error) {
            console.error("Error fetching divisions:", error);
            toast.error("Error fetching divisions.");
        }
    };

    const handleCreate = () => {
        setCurrentEmployee(null);
        setShowEmployeeModal(true);
    };

    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setShowEmployeeModal(true);
    };

    const handleDelete = (employee) => {
        setSelectedEmployee(employee);
        setShowConfirmationModal(true);
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

    const handleDivisionChange = (event) => {
        setSelectedDivision(event.target.value);
        setCurrentPage(1);
    };

    const handleConfirmDelete = async () => {
        if (!selectedEmployee) return;

        const token = localStorage.getItem('authToken');

        try {
            await axios.delete(`http://127.0.0.1:8000/api/employe/${selectedEmployee.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success(`Employee "${selectedEmployee.name}" deleted successfully.`);
            setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
            setShowConfirmationModal(false);
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Error deleting employee.");
            setShowConfirmationModal(false);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmationModal(false);
        setSelectedEmployee(null);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-24">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">Employees</h1>
                <div className="mb-4 flex justify-between">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Filter by name"
                            value={nameFilter}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                        <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">All Divisions</option>
                            {divisions.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Employee
                    </button>
                </div>
                {loading ? (
                    <p className="dark:text-white">Loading...</p>
                ) : (
                    <table className="min-w-full bg-white dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b dark:text-white">Image</th>
                                <th className="py-2 px-4 border-b dark:text-white">Name</th>
                                <th className="py-2 px-4 border-b dark:text-white">Phone</th>
                                <th className="py-2 px-4 border-b dark:text-white">Division</th>
                                <th className="py-2 px-4 border-b dark:text-white">Position</th>
                                <th className="py-2 px-4 border-b dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="dark:bg-gray-700">
                                    <td className="py-2 px-4 border-b dark:text-white">
                                        <img src={`http://127.0.0.1:8000${employee.image}`} alt={employee.name} className="w-16 h-16 rounded" />
                                    </td>
                                    <td className="py-2 px-4 border-b dark:text-white">{employee.name}</td>
                                    <td className="py-2 px-4 border-b dark:text-white">{employee.phone}</td>
                                    <td className="py-2 px-4 border-b dark:text-white">{employee.division.name}</td>
                                    <td className="py-2 px-4 border-b dark:text-white">{employee.position}</td>
                                    <td className="py-2 px-4 border-b dark:text-white">
                                        <button
                                            onClick={() => handleEdit(employee)}
                                            className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(employee)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
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
            {showEmployeeModal && (
                <EmployeeModal
                    employee={currentEmployee}
                    divisions={divisions}
                    onClose={() => setShowEmployeeModal(false)}
                    onSave={() => {
                        setShowEmployeeModal(false);
                        fetchEmployees();
                    }}
                />
            )}
            {showConfirmationModal && (
                <ConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </>
    );
};

export default EmployeeTable;
