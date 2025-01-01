import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const AdminLogin = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg px-8 py-10 max-w-md w-full">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="your@gmail.com"
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
