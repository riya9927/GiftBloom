import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Select Category");
    const [subcategory, setSubcategory] = useState("Select Sub Category");
    const [bestseller, setBestseller] = useState(false);
    const [option, setOption] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!name || !price || !category || category === "Select Category") {
                toast.error("Please fill all required fields");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subcategory);
            formData.append("option", JSON.stringify(option));
            formData.append("bestseller", bestseller);

            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            const response = await axios.post(
                `${backendUrl}/api/product/add`,
                formData,
                {
                    headers: {
                        token: token,
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 30000,
                }
            );

            if (response.data.success) {
                toast.success("Product added successfully!");
                setName("");
                setDescription("");
                setPrice("");
                setCategory("Select Category");
                setSubcategory("Select Sub Category");
                setBestseller(false);
                setOption([]);
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
            } else {
                toast.error(response.data.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                < h1 className='text-2xl font-bold mb-4 text-center'>Add New Product</h1>
                <form onSubmit={onSubmitHandler} className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { state: image1, setter: setImage1, id: 'image1' },
                                { state: image2, setter: setImage2, id: 'image2' },
                                { state: image3, setter: setImage3, id: 'image3' },
                                { state: image4, setter: setImage4, id: 'image4' },
                            ].map((image) => (
                                <label key={image.id} htmlFor={image.id}
                                    className="relative block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-gray-400 transition-colors">
                                    <img
                                        className="w-full aspect-square object-cover rounded-md"
                                        src={!image.state ? assets.upload_area : URL.createObjectURL(image.state)}
                                        alt=""
                                    />
                                    <input
                                        onChange={(e) => image.setter(e.target.files[0])}
                                        type="file"
                                        id={image.id}
                                        className="hidden"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-12 w-80 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="w-full h-32 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                placeholder="Describe your product"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="h-12 w-full px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Personalized Gifts">Personalized Gifts</option>
                                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                                    <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
                                    <option value="Special Occasions">Special Occasions</option>
                                    <option value="Hobbies & Interests">Hobbies & Interests</option>
                                    <option value="Home & Living">Home & Living</option>
                                    <option value="Fashion & Accessories">Fashion & Accessories</option>
                                    <option value="Food & Beverage">Food & Beverage</option>
                                    <option value="Kids Gifts">Kids Gifts</option>
                                </select>
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                                <select
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                    className="h-12 w-full px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                >
                                    <option value="">Select Sub Category</option>
                                    <option value="Perfect Gift Hampers">Perfect Gift Hampers</option>
                                    <option value="Elegant Jeweleries">Elegant Jeweleries</option>
                                    <option value="Home Decor">Home Decor</option>
                                    <option value="Photo Albums & Frames">Photo Albums & Frames</option>
                                    <option value="Electronic Accessories">Electronic Accessories</option>
                                    <option value="Stylish Mugs & Tumblers">Stylish Mugs & Tumblers</option>
                                    <option value="Handbags & Wallets">Handbags & Wallets</option>
                                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                                    <option value="Aromatherapy, Candles & Wellness Products">Aromatherapy, Candles & Wellness Products</option>
                                    <option value="Books & Stationery">Books & Stationery</option>
                                    <option value="Art & Craft Kits">Art & Craft Kits</option>
                                    <option value="Gourmet Food & Beverages">Gourmet Food & Beverages</option>
                                    <option value="Outdoor & Adventure Gear">Outdoor & Adventure Gear</option>

                                </select>
                            </div>

                            <div className="w-full lg:w-48">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="h-12 w-full px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    placeholder="Enter price"
                                    required
                                />

                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Product Options</label>
                            <div className="flex flex-wrap gap-3">
                                {['Option 1', 'Option 2', 'Option 3'].map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setOption((prev) =>
                                            prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
                                        )}
                                        className={`h-10 px-4 rounded-md text-sm font-medium transition-colors
                                            ${option.includes(opt)
                                                ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="bestseller"
                                checked={bestseller}
                                onChange={() => setBestseller(prev => !prev)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="bestseller" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Add to bestseller
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`h-12 w-32 rounded-md text-white font-medium transition-colors
                                ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {loading ? 'Adding...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;