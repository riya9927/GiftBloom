import React from 'react'
import { assets } from '../assets/assets'
import { AiFillPinterest, AiFillFacebook, AiFillInstagram, AiFillPhone, AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt='' />
          <p className='w-full md:w-2/3 text-gray-600'>Thank you for choosing GiftBloom—where every gift is a cherished moment!</p>
        </div> 
        <div>
          <p className='text-xl font-medium mb-5'>Follow Us</p>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-center gap-2 text-gray-600'>
              <AiFillFacebook className='text-blue-600' />
              <span>Facebook</span>
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <AiFillInstagram className='text-pink-600' />
              <span>Instagram</span>
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <AiFillPinterest className='text-red-600' />
              <span>Pinterest</span>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-center gap-2 text-gray-600'>
              <AiFillPhone className='text-green-600' />
              <a href="tel:+91 9999999999">+91 9999999999</a>
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <AiOutlineMail className='text-gray-600' />
              <a href="mailto:contact@giftbloom.com">contact@giftbloom.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ GiftBloom.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
