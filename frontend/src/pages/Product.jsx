import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const product = () => {
  const {productId}=useParams();
  const {products,currency,addToCart} =useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState('');
  const [option,setOption]=useState('');

  const fetchProductdata=async()=>{
    products.map((item)=>{
      if(item._id===productId){
        setProductData(item)
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductdata();
  },[productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
        {
          productData.image.map((item,index)=>(
            <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
          ))
        }
        </div>
        {/* Full image */}
        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image} alt=''/>
        </div>
        </div>
         {/*Product Information*/}
         <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_dull_icon} alt='' className='w-3 5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap my-8'>
          <p>Select Option</p>
          <br />
          <div className='flex gap-2'>
            {
              productData.option.map((item,index)=>(
                <button onClick={()=>setOption(item)} className={`border py-2 px-4 bg-gray-100 ${item===option ? 'border-orange-500':''}`} key={index}>{item}</button>
              ))
            }
          </div>
         </div>
         <button onClick={()=>addToCart(productData._id,option)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
         <hr className='mt-8 sm:w-4/5' />
         <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 10 days.</p>
         </div>
         </div>
      </div>
      {/* Description & Review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (111)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>GiftBloom is a premier online gifting platform dedicated to transforming the art of giving into a seamless and joyful experience.</p>
          <p>We offer a thoughtfully curated collection of unique, high-quality gifts tailored for every occasion and relationship, from personalized treasures to trendy gadgets, wellness hampers, and more. At GiftBloom, we believe that every gift tells a story, and our mission is to help you create cherished memories with your loved ones through meaningful and beautifully wrapped surprises.</p>
          <p>With a focus on exceptional customer service, easy exchanges, and effortless shopping, GiftBloom is your go-to destination for spreading happiness and celebrating life’s special moments.</p>          
        </div>
      </div>
      {/* display related products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default product