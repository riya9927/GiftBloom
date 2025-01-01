import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const categories = [
        "Personalized Gifts",
        "Tech & Gadgets",
        "Lifestyle & Wellness",
        "Special Occasions",
        "Hobbies & Interests",
        "Home & Living",
        "Fashion & Accessories",
        "Food & Beverage",
        "Kids Gifts",
      ];      

    const subcategories = [
        "Perfect Gift Hampers",
        "Elegant Jeweleries",
        "Home Decor",
        "Photo Albums & Frames",
        "Electronic Accessories",
        "Stylish Mugs & Tumblers",
        "Handbags & Wallets",
        "Fashion & Apparel",
        "Aromatherapy, Candles & Wellness Products",
        "Books & Stationery",
        "Art & Craft Kits",
        "Gourmet Food & Beverages",
        "Outdoor & Adventure Gear",
    ];

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        option: [],
        bestseller: false,
        images: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`${backendUrl}/api/product/single/${id}`);
                if (response.data.success) {
                    const { name, description, price, category, subCategory, option, bestseller, image } = response.data.product;
                    setProduct({
                        name,
                        description,
                        price,
                        category,
                        subCategory,
                        option: option || [],
                        bestseller: bestseller || false,
                        images: image || [],
                    });
                } else {
                    toast.error(response.data.message || "Failed to fetch product details.");
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
                toast.error(error.message || "An error occurred.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("subCategory", product.subCategory);
            formData.append("option", JSON.stringify(product.option));
            formData.append("bestseller", product.bestseller);

            if (Array.isArray(product.images)) {
                product.images.forEach((image, index) => {
                    if (image instanceof File) {
                        formData.append(`image${index + 1}`, image);
                    }
                });
            }

            const response = await axios.post(`${backendUrl}/api/product/update`, formData, {
                headers: {
                    token: token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success("Product updated successfully!");
                navigate("/list");
            } else {
                toast.error(response.data.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(error.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e, index) => {
        const files = [...product.images];
        files[index] = e.target.files[0];
        setProduct({ ...product, images: files });
    };

    return (
        <form onSubmit={handleUpdate} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold">Edit Product</h2>

            {/* Product Name */}
            <div>
                <label className="block font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="border w-full rounded p-2"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block font-medium">Description</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="border w-full rounded p-2"
                    required
                />
            </div>

            {/* Price */}
            <div>
                <label className="block font-medium">Price</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    className="border w-full rounded p-2"
                    required
                />

            </div>

            {/* Category */}
            <div>
                <label className="block font-medium">Category</label>
                <select
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="border w-full rounded p-2"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sub Category */}
            <div>
                <label className="block font-medium">Sub Category</label>
                <select
                    name="subCategory"
                    value={product.subCategory}
                    onChange={handleInputChange}
                    className="border w-full rounded p-2"
                >
                    <option value="">Select a subcategory</option>
                    {subcategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                            {subCategory}
                        </option>
                    ))}
                </select>
            </div>

            {/* Bestseller */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="bestseller"
                    checked={product.bestseller}
                    onChange={() => setProduct({ ...product, bestseller: !product.bestseller })}
                    className="mr-2"
                />
                <label>Bestseller</label>
            </div>

            {/* Images */}
            <div>
                <label className="block font-medium">Product Images</label>
                {[...Array(4)].map((_, index) => (
                    <input
                        key={index}
                        type="file"
                        onChange={(e) => handleFileChange(e, index)}
                        className="block mb-2"
                    />
                ))}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Updating...' : 'Update Product'}
            </button>
        </form>
    );
};

export default Edit;
