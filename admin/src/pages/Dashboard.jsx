import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import SalesChart from '../components/SalesChart';

const AdminDashboard = ({ token }) => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0
    });
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productStats, orderStats, allOrders] = await Promise.all([
                    axios.get(`${backendUrl}/api/product/stats`, {
                        headers: { token }
                    }),
                    axios.get(`${backendUrl}/api/order/stats`, {
                        headers: { token }
                    }),
                    axios.post(`${backendUrl}/api/order/list`, {}, {
                        headers: { token }
                    })
                ]);

                if (productStats.data.success && orderStats.data.success && allOrders.data.success) {
                    setStats({
                        totalProducts: productStats.data.totalProducts,
                        totalOrders: orderStats.data.totalOrders,
                        pendingOrders: orderStats.data.pendingOrders,
                        completedOrders: orderStats.data.completedOrders
                    });
                    
                    // Process orders for chart
                    const chartData = allOrders.data.orders.map(order => ({
                        date: new Date(order.date).toLocaleDateString(),
                        sales: order.amount
                    }));
                    setSalesData(chartData);
                } else {
                    toast.error('Failed to fetch stats');
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
                toast.error(error.response?.data?.message || "Failed to fetch stats");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Welcome back, Admin!
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium">Total Products</h2>
                        <p className="text-3xl font-bold mt-2">{loading ? 'Loading...' : stats.totalProducts}</p>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium">Total Orders</h2>
                        <p className="text-3xl font-bold mt-2">{loading ? 'Loading...' : stats.totalOrders}</p>
                    </div>

                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium">Pending Orders</h2>
                        <p className="text-3xl font-bold mt-2">{loading ? 'Loading...' : stats.pendingOrders}</p>
                    </div>

                    <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium">Completed Orders</h2>
                        <p className="text-3xl font-bold mt-2">{loading ? 'Loading...' : stats.completedOrders}</p>
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="mt-6">
                    <SalesChart data={salesData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;