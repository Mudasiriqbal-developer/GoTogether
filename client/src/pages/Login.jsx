import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    setAuthError('');
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-2">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Main Card */}
        <div className="w-full md:w-[420px] bg-white rounded-2xl shadow-xl p-8 relative z-10">
          {/* Tabs */}
          <div className="flex mb-8 border-b border-gray-200">
            <button className="flex-1 py-2 text-center font-semibold text-blue-700 border-b-2 border-blue-700 focus:outline-none">Login</button>
            <Link to="/register" className="flex-1 py-2 text-center font-semibold text-gray-400 hover:text-blue-700 transition-colors">Sign Up</Link>
          </div>

          <h2 className="text-xl font-bold mb-2 text-center text-gray-900">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6 text-sm">Log in to your account to continue sharing rides.</p>

          {/* Google Button */}
          <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 mb-4 font-medium text-gray-700 hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-3 text-xs text-gray-400 font-medium">OR EMAIL</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* Error */}
          {authError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
              <span className="block sm:inline">{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m22 7-10 6-10-6"/></svg>
                </span>
                <input
                  className={`pl-10 pr-3 py-2 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Entered value does not match email format',
                    },
                  })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  className={`pl-10 pr-3 py-2 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  className="accent-blue-600 rounded"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                Remember me for 30 days
              </label>
              <Link to="#" className="text-blue-500 hover:text-blue-700 font-medium">Forgot password?</Link>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition text-base flex items-center justify-center gap-2"
              type="submit"
            >
              Login to Account
              <span className="ml-1">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">Create an account</Link>
            </span>
          </div>
        </div>

        {/* Side Info Cards (Desktop only) */}
        <div className="hidden md:flex flex-col gap-4 w-[320px]">
          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-500 mb-1">
              {[...Array(4)].map((_, i) => (
                <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              ))}
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
            </div>
            <p className="text-gray-700 text-sm italic">"The easiest way to travel between cities. I've met amazing people and saved so much on commute costs."</p>
            <div className="flex items-center gap-2 mt-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" className="w-8 h-8 rounded-full border" />
              <div>
                <span className="font-semibold text-gray-900 text-sm">Sarah Johnson</span>
                <span className="block text-xs text-gray-500">Verified Driver</span>
              </div>
            </div>
          </div>
          {/* Verified Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-blue-600 text-white rounded-full p-2 flex items-center justify-center">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div>
              <div className="font-semibold text-blue-900 text-sm">100% Verified</div>
              <div className="text-xs text-blue-800">Every member is identity-verified for your safety.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
