import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const List = ({ token }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchList = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message || 'Failed to fetch products');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error(error.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const handleDelete = async (productId) => {
        
        if (!token) {
            toast.error('Authentication required');
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/product/remove`,
                { id: productId },
                { headers: { token } }  
            );

            if (response.data.success) {
                toast.success('Product deleted successfully');
                await fetchList(); 
            } else {
                toast.error(response.data.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            if (error.response?.status === 401) {
                toast.error('Unauthorized. Please log in again.');
            } else {
                toast.error(error.response?.data?.message || "Failed to delete product");
            }
        }
    };

    return (
        <>
            <h1 className='text-2xl font-bold mb-4 text-center'>Product List</h1>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p>Loading products...</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {list.length > 0 ? (
                        list.map((product) => (
                            <div key={product._id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
                                <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className='p-4'>
                                    <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
                                    <p className="text-gray-500 mt-1">{product.category}</p>
                                    <p className="text-lg font-bold text-gray-900 mt-2">₹{product.price.toLocaleString()}</p>
                                    <div className='mt-4 flex justify-between'>
                                        <button
                                            className="text-blue-500 hover:text-blue-700 font-medium"
                                            onClick={() => navigate(`/edit/${product._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 font-medium"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No products available
                        </div>
                    )}
                </div>
            )}
        </>
    );
};    
export default List;