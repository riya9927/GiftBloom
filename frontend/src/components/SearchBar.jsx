import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  return showSearch && visible ? (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-center gap-3 py-3 border-b bg-gray-50">
        <div className="relative w-3/4 sm:w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 pl-4 pr-8 text-sm border rounded-full border-gray-300 outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            placeholder="Search for products..."
          />
          <img
            className="absolute w-4 right-3 top-1/2 transform -translate-y-1/2"
            src={assets.search_icon}
            alt="Search Icon"
          />
        </div>
        <img
          onClick={() => setShowSearch(false)}
          className="w-4 cursor-pointer hover:opacity-80"
          src={assets.cross_icon}
          alt="Close Icon"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
