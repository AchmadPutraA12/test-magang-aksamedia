import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeModal = ({ employee, divisions, onClose, onSave }) => {
    const [name, setName] = useState(employee ? employee.name : '');
    const [phone, setPhone] = useState(employee ? employee.phone : '');
    const [position, setPosition] = useState(employee ? employee.position : '');
    const [divisionId, setDivisionId] = useState(employee ? employee.division.id : '');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(employee ? `http://127.0.0.1:8000${employee.image}` : null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('position', position);
        formData.append('divisi_id', divisionId);
        if (image) {
            formData.append('image', image);
        }

        const token = localStorage.getItem('authToken');

        try {
            if (employee) {
                await axios.post(`http://127.0.0.1:8000/api/employe/${employee.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success("Employee updated successfully!");
            } else {
                await axios.post('http://127.0.0.1:8000/api/employe', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success("Employee created successfully!");
            }
            onSave();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.data) {
                setError('Validation Error: ' + JSON.stringify(err.response.data.data));
                toast.error("Validation Error: " + JSON.stringify(err.response.data.data));
            } else {
                setError('Failed to save employee. Please check the inputs.');
                toast.error("Failed to save employee. Please check the inputs.");
            }
            console.error("Error saving employee:", err);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-xl font-bold mb-4 dark:text-white">{employee ? 'Edit Employee' : 'Add Employee'}</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Position</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Division</label>
                        <select
                            value={divisionId}
                            onChange={(e) => setDivisionId(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">Select Division</option>
                            {divisions.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Image</label>
                        {preview && (
                            <div className="mb-2">
                                <img
                                    src={preview}
                                    alt={employee ? employee.name : 'New Image'}
                                    className="w-32 h-32 rounded"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;
