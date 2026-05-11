import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';


function Register() {
  const { register: registerForm, handleSubmit, formState: { errors }, watch, setValue } = useForm({ defaultValues: { role: 'Passenger' } });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [role, setRole] = useState('Passenger');
  const password = watch("password");

  const onSubmit = async (data) => {
    setAuthError('');
    setLoading(true);
    const { confirmPassword, ...userData } = data;
    const result = await register(userData);
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      setAuthError(result.error);
      toast.error(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  const handleRole = (selected) => {
    setRole(selected);
    setValue('role', selected);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-black text-xl italic">G</span>
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight italic">GoTogether</span>
            </div>
          </Link>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Create your account</h2>
          <p className="mt-2 text-gray-500 font-medium">Join our community and start sharing journeys today.</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-12 transition-colors duration-300">
          
          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl mb-8 text-sm font-bold text-center">
              {authError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input
                  {...registerForm('name', { required: 'Name is required' })}
                  className={`block w-full px-5 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  {...registerForm('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  className={`block w-full px-5 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.email ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="name@example.com"
                />
                {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input
                  {...registerForm('phone', { required: 'Phone is required' })}
                  className={`block w-full px-5 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.phone ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="+92 300 0000000"
                />
                {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">I am a...</label>
                <div className="flex p-1 bg-gray-50 dark:bg-[#1C222D] rounded-2xl border border-gray-100 dark:border-gray-800">
                  {['Passenger', 'Driver', 'Both'].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => handleRole(r)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        role === r ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <input type="hidden" {...registerForm('role')} value={role} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                <input
                  {...registerForm('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 chars' } })}
                  type="password"
                  className={`block w-full px-5 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.password ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                <input
                  {...registerForm('confirmPassword', { required: 'Required', validate: v => v === password || 'No match' })}
                  type="password"
                  className={`block w-full px-5 py-4 bg-gray-50 dark:bg-[#1C222D] border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                className="w-5 h-5 rounded-lg border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1C222D] text-blue-600 focus:ring-offset-0 focus:ring-blue-500/50"
              />
              <label htmlFor="agree" className="text-xs text-gray-500 font-medium">
                I agree to the <span className="text-gray-900 dark:text-white font-bold hover:underline cursor-pointer">Terms</span> and <span className="text-gray-900 dark:text-white font-bold hover:underline cursor-pointer">Privacy Policy</span>.
              </label>
            </div>

            <button
              disabled={!agree || loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#111827] px-4 text-gray-400 font-black tracking-widest">Or Register With</span>
            </div>
          </div>

          <GoogleLoginButton text="Sign up with Google" />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-gray-900 dark:text-white font-black hover:text-blue-500 transition-colors">Log in now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
