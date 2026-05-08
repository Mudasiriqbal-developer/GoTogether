import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';


function Register() {
  const { register: registerForm, handleSubmit, formState: { errors }, watch, setValue } = useForm({ defaultValues: { role: 'Passenger' } });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [agree, setAgree] = useState(false);
  const [role, setRole] = useState('Passenger');
  const password = watch("password");

  const onSubmit = async (data) => {
    setAuthError('');
    const { confirmPassword, ...userData } = data;
    const result = await register(userData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setAuthError(result.error);
    }
  };

  // Handle role selection
  const handleRole = (selected) => {
    setRole(selected);
    setValue('role', selected);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f7f8fc] py-8 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="5"/><path d="M12 7v10"/><path d="M7 7v10"/><path d="M17 7v10"/></svg>
            </span>
            <span className="text-2xl font-bold text-blue-700">RideToShare</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1 text-center">Create an account</h2>
          <p className="text-gray-500 text-center text-base">Join our community and start sharing rides today.</p>
        </div>

        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
            <span className="block sm:inline">{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="name">Full Name</label>
            <input
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
              id="name"
              type="text"
              placeholder="John Doe"
              {...registerForm('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">Email Address</label>
            <input
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
              id="email"
              type="email"
              placeholder="name@company.com"
              {...registerForm('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Entered value does not match email format',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="phone">Phone Number</label>
            <input
              className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...registerForm('phone', { required: 'Phone number is required' })}
            />
            {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone.message}</p>}
          </div>

          {/* Role Selection as Toggle Buttons */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">I am a...</label>
            <div className="grid grid-cols-3 gap-2 mb-1">
              {['Passenger', 'Driver', 'Both'].map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-medium transition-all
                    ${role === r ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' : 'bg-white border-gray-300 text-gray-500 hover:border-blue-400'}
                  `}
                  onClick={() => handleRole(r)}
                >
                  {r === 'Passenger' && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2.5 2.5 0 0 0-5-2h-3a2.5 2.5 0 0 0-5 2z"/></svg>
                  )}
                  {r === 'Driver' && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="6" rx="3"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>
                  )}
                  {r === 'Both' && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="7" cy="7" r="4"/><circle cx="17" cy="7" r="4"/><path d="M5.5 21h13a2.5 2.5 0 0 0-5-2h-3a2.5 2.5 0 0 0-5 2z"/></svg>
                  )}
                  {r}
                </button>
              ))}
            </div>
            <input type="hidden" {...registerForm('role', { required: 'Please select a role' })} value={role} />
            {errors.role && <p className="text-red-500 text-xs italic mt-1">{errors.role.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">Password</label>
              <input
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
                id="password"
                type="password"
                placeholder="********"
                {...registerForm('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must have at least 6 characters' },
                })}
              />
              {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white`}
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...registerForm('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'The passwords do not match',
                })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="agree"
              className="accent-blue-600 rounded"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              required
            />
            <label htmlFor="agree" className="text-xs text-gray-600 select-none">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-sm transition text-base mt-2"
            type="submit"
            disabled={!agree}
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-3 text-xs text-gray-400 font-medium">Or sign up with</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Sign Up with Google
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">Log In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
