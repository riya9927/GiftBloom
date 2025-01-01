import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 min-h-screen">
      <div className="text-3xl font-semibold text-center mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div className="max-w-5xl mx-auto px-4">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-6 px-4 md:px-6 bg-white rounded-lg shadow-md border mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">{currency}</span>
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p className="italic">{item.option}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Date: <span>{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Payment Method: <span>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === 'Delivered'
                        ? 'bg-green-500'
                        : item.status === 'Processing'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  ></div>
                  <p className="text-sm md:text-base font-medium text-gray-700">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-md hover:bg-gray-400 transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No orders found. Start shopping now!
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
