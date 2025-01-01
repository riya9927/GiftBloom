import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpcopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpcopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpcopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Filter Option */}
        <div className="min-w-60">
          <p
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
          </p>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Personalized Gifts")}>
                <input className="w-3" type="checkbox" value="Personalized Gifts" onChange={toggleCategory} checked={category.includes("Personalized Gifts")} />
                Personalized Gifts
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Tech & Gadgets")}>
                <input className="w-3" type="checkbox" value="Tech & Gadgets" onChange={toggleCategory} checked={category.includes("Tech & Gadgets")} />
                Tech & Gadgets
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Lifestyle & Wellness")}>
                <input className="w-3" type="checkbox" value="Lifestyle & Wellness" onChange={toggleCategory} checked={category.includes("Lifestyle & Wellness")} />
                Lifestyle & Wellness
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Special Occasions")}>
                <input className="w-3" type="checkbox" value="Special Occasions" onChange={toggleCategory} checked={category.includes("Special Occasions")} />
                Special Occasions
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Hobbies & Interests")}>
                <input className="w-3" type="checkbox" value="Hobbies & Interests" onChange={toggleCategory} checked={category.includes("Hobbies & Interests")} />
                Hobbies & Interests
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Home & Living")}>
                <input className="w-3" type="checkbox" value="Home & Living" onChange={toggleCategory} checked={category.includes("Home & Living")} />
                Home & Living
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Fashion & Accessories")}>
                <input className="w-3" type="checkbox" value="Fashion & Accessories" onChange={toggleCategory} checked={category.includes("Fashion & Accessories")} />
                Fashion & Accessories
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Food & Beverage")}>
                <input className="w-3" type="checkbox" value="Food & Beverage" onChange={toggleCategory} checked={category.includes("Food & Beverage")} />
                Food & Beverage
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={() => toggleCategory("Kids Gifts")}>
                <input className="w-3" type="checkbox" value="Kids Gifts" onChange={toggleCategory} checked={category.includes("Kids Gifts")} />
                Kids Gifts
              </p>
            </div>
          </div>

          {/* Subcategories Filters */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Perfect Gift Hampers")}>
                <input className="w-3" type="checkbox" value="Perfect Gift Hampers" onChange={toggleSubCategory} checked={subCategory.includes("Perfect Gift Hampers")} />
                Perfect Gift Hampers
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Elegant Jeweleries")}>
                <input className="w-3" type="checkbox" value="Elegant Jeweleries" onChange={toggleSubCategory} checked={subCategory.includes("Elegant Jeweleries")} />
                Elegant Jeweleries
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Home Decor")}>
                <input className="w-3" type="checkbox" value="Home Decor" onChange={toggleSubCategory} checked={subCategory.includes("Home Decor")} />
                Home Decor
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Photo Albums & Frames")}>
                <input className="w-3" type="checkbox" value="Photo Albums & Frames" onChange={toggleSubCategory} checked={subCategory.includes("Photo Albums & Frames")} />
                Photo Albums & Frames
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Electronic Accessories")}>
                <input className="w-3" type="checkbox" value="Electronic Accessories" onChange={toggleSubCategory} checked={subCategory.includes("Electronic Accessories")} />
                Electronic Accessories
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Stylish Mugs & Tumblers")}>
                <input className="w-3" type="checkbox" value="Stylish Mugs & Tumblers" onChange={toggleSubCategory} checked={subCategory.includes("Stylish Mugs & Tumblers")} />
                Stylish Mugs & Tumblers
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Handbags & Wallets")}>
                <input className="w-3" type="checkbox" value="Handbags & Wallets" onChange={toggleSubCategory} checked={subCategory.includes("Handbags & Wallets")} />
                Handbags & Wallets
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Fashion & Apparel")}>
                <input className="w-3" type="checkbox" value="Fashion & Apparel" onChange={toggleSubCategory} checked={subCategory.includes("Fashion & Apparel")} />
                Fashion & Apparel
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Aromatherapy, Candles & Wellness Products")}>
                <input className="w-3" type="checkbox" value="Aromatherapy, Candles & Wellness Products" onChange={toggleSubCategory} checked={subCategory.includes("Aromatherapy, Candles & Wellness Products")} />
                Aromatherapy, Candles & Wellness Products
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Books & Stationery")}>
                <input className="w-3" type="checkbox" value="Books & Stationery" onChange={toggleSubCategory} checked={subCategory.includes("Books & Stationery")} />
                Books & Stationery
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Art & Craft Kits")}>
                <input className="w-3" type="checkbox" value="Art & Craft Kits" onChange={toggleSubCategory} checked={subCategory.includes("Art & Craft Kits")} />
                Art & Craft Kits
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Gourmet Food & Beverages")}>
                <input className="w-3" type="checkbox" value="Gourmet Food & Beverages" onChange={toggleSubCategory} checked={subCategory.includes("Gourmet Food & Beverages")} />
                Gourmet Food & Beverages
              </p>
              <p className="flex gap-2 cursor-pointer" onClick={(e) => toggleSubCategory("Outdoor & Adventure Gear")}>
                <input className="w-3" type="checkbox" value="Outdoor & Adventure Gear" onChange={toggleSubCategory} checked={subCategory.includes("Outdoor & Adventure Gear")} />
                Outdoor & Adventure Gear
              </p>

            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          {/* Map Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;