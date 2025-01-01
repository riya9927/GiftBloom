import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Registration successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] w-[1200px] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl p-8 rounded-3xl bg-gray-100 shadow-xl">
        <div className="flex gap-8">
          {/* Left side with image */}
          <div className="flex-1 flex items-center justify-center h-full">
            <img
              src={assets.login_page}
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>


          {/* Right side with form */}
          <div className="flex-1">
            <h2 className="prata-regular px-10 text-4xl font-bold text-gray-800 mb-2">Gift Bloom</h2>
            <h2 className="text-2xl w-[300px] px-8 font-semibold text-gray-700 mb-2">Let's {currentState} for you.</h2>

            <form onSubmit={onSubmitHandler} className="space-y-4">
              {currentState === 'Sign Up' && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-gray-400 outline-none"
                />
              )}

              <input
                type="email"
                placeholder="Mail Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-gray-400 outline-none"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-gray-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <button type="button" className="hover:text-gray-800">
                  Forget password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-600">
                    {currentState === 'Login'
                      ? "Don't you have an account?"
                      : 'Already have an account?'}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {currentState === 'Login' ? "Go to Sign Up" : "Go to Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
