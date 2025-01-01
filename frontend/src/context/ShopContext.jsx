import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 20;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Load cart data from backend when token is available
    const loadCartData = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const addToCart = async (itemId, option) => {
        if (!option) {
            toast.error('Select Option');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][option]) {
                cartData[itemId][option] += 1;
            }
            else {
                cartData[itemId][option] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][option] = 1;
        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', 
                    { itemId, option }, 
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, option, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][option] = quantity;
        setCartItems(cartData);
        
        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, option, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            console.log(`Fetching products from: ${backendUrl}/api/product/list`);
            const response = await axios.post(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                console.error('API Error:', response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Request failed:', error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    // Load stored token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            setToken(storedToken);
        }
    }, []);

    // Load cart data whenever token changes
    useEffect(() => {
        if (token) {
            loadCartData();
        }
    }, [token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount,
        navigate, backendUrl,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;