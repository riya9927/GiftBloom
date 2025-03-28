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
    const [wishlistItems, setWishlistItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const loadCartData = async () => {
        if (!token) {
            // console.log("No token available, skipping cart fetch");
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { token } }
            );

            console.log("Cart response:", response.data);

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Cart fetch error:", error);
            toast.error("Failed to load cart: " + (error.response?.data?.message || error.message));
        }
    };

    const loadWishlistData = async () => {
        if (!userId || !token) return [];

        try {
            const response = await axios.get(
                `${backendUrl}/api/wishlist/${userId}`,
                { headers: { token } }
            );

            if (response.data.success) {
                const wishlist = response.data.wishlist || [];
                const wishlistIds = wishlist.map(item => typeof item === 'object' ? item._id : item);
                setWishlistItems(wishlistIds);
                return wishlistIds;
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Error loading wishlist:", error);
        }
        return [];
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

    const toggleWishlist = async (productId) => {
        const isInWishlist = wishlistItems.includes(productId);

        if (isInWishlist) {
            const updatedWishlist = wishlistItems.filter(id => id !== productId);
            setWishlistItems(updatedWishlist);

            if (token && userId) {
                try {
                    await axios.post(
                        `${backendUrl}/api/wishlist/remove`,
                        { userId, productId },
                        { headers: { token } }
                    );
                    toast.success('Removed from wishlist');
                } catch (error) {
                    console.log(error);
                    toast.error('Failed to remove from wishlist');
                    setWishlistItems(wishlistItems);
                }
            } else {
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                toast.success('Removed from wishlist');
            }
        } else {
            const updatedWishlist = [...wishlistItems, productId];
            setWishlistItems(updatedWishlist);

            if (token && userId) {
                try {
                    await axios.post(
                        `${backendUrl}/api/wishlist/add`,
                        { userId, productId },
                        { headers: { token } }
                    );
                    toast.success('Added to wishlist');
                } catch (error) {
                    console.log(error);
                    toast.error('Failed to add to wishlist');
                    setWishlistItems(wishlistItems);
                }
            } else {
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                toast.success('Added to wishlist');
            }
        }
    }

    const isInWishlist = (itemId) => {
        return wishlistItems.includes(itemId);
    }

    const getWishlistCount = () => {
        return wishlistItems.length;
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
        if (products.length === 0) {
            console.log("Products not loaded yet");
            return 0;
        }

        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) {
                // console.log(`Product with ID ${itemId} not found`);
                continue;
            }

            for (const option in cartItems[itemId]) {
                const quantity = cartItems[itemId][option];
                if (quantity > 0) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            // console.log(`Fetching products from: ${backendUrl}/api/product/list`);
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
    // Merge local wishlist with server wishlist when user logs in
    const mergeWishlistData = async (serverWishlist, localWishlist) => {
        if (!token || !userId || !localWishlist || localWishlist.length === 0) return;

        try {
            const itemsToAdd = localWishlist.filter(item => !serverWishlist.includes(item));

            if (itemsToAdd.length > 0) {
                for (const productId of itemsToAdd) {
                    await axios.post(
                        `${backendUrl}/api/wishlist/add`,
                        { userId, productId },
                        { headers: { token } }
                    );
                }

                await loadWishlistData();
            }

            localStorage.removeItem('wishlist');
        } catch (error) {
            console.log('Failed to merge wishlist data:', error);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                await getProductsData();

                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    setTimeout(() => loadCartData(), 100);
                }
            } catch (error) {
                console.error("Initialization error:", error);
            }
        };

        init();
    }, []);

    useEffect(() => {
        // Load local wishlist for non-logged in users
        if (!token) {
            const localWishlist = localStorage.getItem('wishlist');
            if (localWishlist) {
                setWishlistItems(JSON.parse(localWishlist));
            }
        }
    }, []);

    // Load stored token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token && products.length > 0) {
            loadCartData();
        }
    }, [token, products]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId'); // NEW: Store userId in localStorage

        if (storedUserId && !userId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (token && userId) {

            // Save local wishlist for merging
            const localWishlist = localStorage.getItem('wishlist');
            const parsedLocalWishlist = localWishlist ? JSON.parse(localWishlist) : [];

            // Load server wishlist and then merge with local
            const handleWishlistSync = async () => {
                const serverWishlist = await loadWishlistData();

                if (parsedLocalWishlist.length > 0) {
                    await mergeWishlistData(serverWishlist, parsedLocalWishlist);
                }
            };

            handleWishlistSync();
        }
    }, [token, userId]);

    const removeFromCart = async (itemId, option) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId] && cartData[itemId][option] !== undefined) {
            delete cartData[itemId][option];

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

            setCartItems(cartData);

            if (token) {
                try {
                    await axios.post(
                        `${backendUrl}/api/cart/remove`,
                        { itemId, option },
                        { headers: { token } }
                    );
                    toast.success('Item removed from cart');
                } catch (error) {
                    console.log(error);
                    toast.error('Failed to remove item: ' + error.message);
                }
            }
        }
    }


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount,
        wishlistItems, toggleWishlist, isInWishlist, getWishlistCount, removeFromCart,
        navigate, backendUrl,
        token, setToken,
        userId, setUserId
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;