import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const NavBar = ({ setToken }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <Link to='/Dashboard'><img className='w-36 ' src={assets.logo} alt='' /></Link>
            <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default NavBar
