import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from "react-toastify"
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
    const currency = '₹';
    const [orders, setOrders] = useState([])
    const fetchAllOrders = async () => {
        if (!token) {
            return null;
        }
        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchAllOrders();
    }, [token])

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
            if (response.data.success) {
                await fetchAllOrders();
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            toast.error(errorMessage);
        }
    };
    
    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-6 text-center">Order</h3>
            <div className="space-y-4">
                {
                    orders.map((order, index) => (
                        <div className='bg-white rounded-lg shadow-sm flex flex-col sm:flex-row items-start gap-6 p-6' key={index}>
                            <div className="flex-shrink-0">
                                <img className='w-16 h-16 object-contain' src={assets.parcel_icon} alt="" />
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="space-y-1">
                                    {order.items.map((item, index) => (
                                        <p className='text-gray-700 text-sm' key={index}>
                                            {item.name} x {item.quantity} 
                                            {item.option && <span className="text-gray-500"> ({item.option})</span>}
                                            {index !== order.items.length - 1 && ','}
                                        </p>
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    <p className='font-medium text-gray-800'>{order.address.firstName + " " + order.address.lastName}</p>
                                    <p className='text-gray-600 text-sm'>{order.address.street}</p>
                                    <p className='text-gray-600 text-sm'>
                                        {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                                    </p>
                                    <p className='text-gray-600 text-sm'>{order.address.phone}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-sm text-gray-600">
                                <p>Items: {order.items.length}</p>
                                <p>Method: {order.paymentMethod}</p>
                                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-lg font-medium text-gray-800">
                                {currency}{order.amount}
                            </div>
                            <select 
                                onChange={(event)=>statusHandler(event,order._id)} 
                                value={order.status} 
                                className='px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders