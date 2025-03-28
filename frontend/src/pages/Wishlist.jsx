// import React, { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';

// const Wishlist = () => {
//   const { wishlistItems, products, toggleWishlist, currency } = useContext(ShopContext);

//   const wishlistProducts = products.filter(product => wishlistItems.includes(product._id));

//   return (
//     <div className="border-t pt-16 min-h-screen">
//       <div className="text-3xl font-semibold text-center mb-8">
//         <Title text1="MY" text2="WISHLIST" />
//       </div>
//       <div className="max-w-5xl mx-auto px-4">
//         {wishlistProducts.length > 0 ? (
//           wishlistProducts.map((product) => (
//             <div
//               key={product._id}
//               className="py-6 px-4 md:px-6 bg-white rounded-lg shadow-md border mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//             >
//               <div className="flex items-start gap-6">
//                 <img
//                   className="w-20 h-20 object-cover rounded-lg"
//                   src={product.image[0]}
//                   alt={product.name}
//                 />
//                 <div className="flex-1">
//                   <p className="text-lg font-semibold text-gray-800">{product.name}</p>
//                   <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
//                     <p>
//                       <span className="font-medium text-gray-800">{currency}</span>
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between w-full md:w-auto gap-4">
//                 <button
//                   onClick={() => toggleWishlist(product._id)}
//                   className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-400 transition"
//                 >
//                   Remove from Wishlist
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 mt-10">
//             Your wishlist is empty. Start adding your favorite products!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Wishlist = () => {
  const { wishlistItems, products, toggleWishlist, currency, token, navigate } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);

  // Filter products that are in the wishlist
  const wishlistProducts = products.filter(product => wishlistItems.includes(product._id));

  useEffect(() => {
    // Check if user is logged in
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    // Set loading to false once data is available
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [token, products, navigate]);

  const handleRemoveFromWishlist = (productId) => {
    toggleWishlist(productId);
  };

  if (!token) {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div className="border-t pt-16 min-h-screen">
      <div className="text-3xl font-semibold text-center mb-8">
        <Title text1="MY" text2="WISHLIST" />
      </div>
      <div className="max-w-5xl mx-auto px-4">
        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading your wishlist...</p>
          </div>
        ) : wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <div
              key={product._id}
              className="py-6 px-4 md:px-6 bg-white rounded-lg shadow-md border mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={product.image[0]}
                  alt={product.name}
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">{currency}</span>
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-400 transition"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10 py-10">
            Your wishlist is empty. Start adding your favorite products!
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;