import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  // const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const { products, currency, cartItems, updateQuantity, removeFromCart, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processCartData = () => {
      const tempData = [];
      for (const itemId in cartItems) {
        const options = cartItems[itemId];
        for (const option in options) {
          const quantity = options[option];
          if (quantity > 0) {
            tempData.push({
              _id: itemId,
              option,
              quantity
            });
          }
        }
      }
      setCartData(tempData);
      setIsLoading(false);
    };

    processCartData();
  }, [cartItems]);

  const handleQuantityChange = (itemId, option, value) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(itemId, option, quantity);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading your cart...</div>;
  }

  if (cartData.length === 0) {
    return (
      <div className="border-t pt-14">
        <div className="text-2xl mb-3">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
        <div className="py-10 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-black text-white px-6 py-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={`${item._id}-${item.option}-${index}`}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img 
                  className="w-16 sm:w-20" 
                  src={productData.image[0]} 
                  alt={productData.name} 
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.option}</p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, item.option, e.target.value)}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              {/* <img
                onClick={() => updateQuantity(item._id, item.option, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              /> */}
              <img
              onClick={() => removeFromCart(item._id, item.option)}
              className="w-4 mr-4 sm:w-5 cursor-pointer"
              src={assets.bin_icon}
              alt="Remove item"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full sm:w-[450px] flex items-center justify-center">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white w-[350px] text-sm my-8 px-8 py-3"
            >
              Check out the Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


