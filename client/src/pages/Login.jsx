import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setAuthError('');
    setLoading(true);
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      setAuthError(result.error);
      toast.error(result.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-black text-xl italic">R</span>
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight italic">RideToShare</span>
            </div>
          </Link>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-500 font-medium">Log in to your account to start sharing journeys.</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-10 transition-colors duration-300">
          
          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl mb-6 text-sm font-bold text-center">
              {authError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"></path></svg>
                </div>
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  type="email"
                  className={`block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.email ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                <Link to="#" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className={`block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.password ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.password.message}</p>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Log In to Account
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-gray-900 dark:text-white font-black hover:text-blue-500 transition-colors">Create one now</Link>
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex justify-center gap-6 pt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-[10px]">🔒</div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure Auth</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-[10px]">✅</div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified</span>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
