import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const NavBar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, token, setToken, navigate, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to='/' className="flex-shrink-0 transition-transform hover:scale-105">
                        <img src={assets.logo} className="h-[60px] w-32 sm:w-36" alt="Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden sm:flex items-center space-x-8">
                        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                            <NavLink
                                key={item}
                                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                                className={({ isActive }) => `
                                    relative py-2 text-sm tracking-wide
                                    transition-colors duration-200
                                    ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                                    after:absolute after:left-0 after:bottom-0
                                    after:h-0.5 after:w-0 after:bg-gray-900
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                `}
                            >
                                {item}
                            </NavLink>
                        ))}
                    </ul>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Search Icon */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <img src={assets.search_icon} className="w-5" alt="Search" />
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative group">
                            <button
                                onClick={() => token ? null : navigate('/login')}
                                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <img className="w-5" src={assets.profile_icon} alt="Profile" />
                            </button>
                            
                            {token && (
                                <div className="invisible group-hover:visible absolute right-0 pt-2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                    <div className="py-2 bg-white rounded-lg shadow-lg ring-1 ring-gray-100">
                                        <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50">
                                            My Profile
                                        </button>
                                        <button
                                            onClick={() => navigate('/wishlist')}
                                            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                                        >
                                            WishList
                                        </button>
                                        <button
                                            onClick={() => navigate('/orders')}
                                            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                                        >
                                            Orders
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <img src={assets.cart_icon} className="w-5" alt="Cart" />
                            {getCartCount() > 0 && (
                                <span className="absolute -right-1 -bottom-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setVisible(true)}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors sm:hidden"
                        >
                            <img src={assets.menu_icon} className="w-5" alt="Menu" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                    visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setVisible(false)}
            >
                <div
                    className={`fixed inset-y-0 right-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                        visible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b">
                            <span className="text-lg font-medium">Menu</span>
                            <button
                                onClick={() => setVisible(false)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Close" />
                            </button>
                        </div>
                        <div className="flex flex-col py-2">
                            {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                                <NavLink
                                    key={item}
                                    to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={() => setVisible(false)}
                                    className={({ isActive }) => `
                                        px-6 py-3 text-sm
                                        transition-colors duration-200
                                        ${isActive ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                    `}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar