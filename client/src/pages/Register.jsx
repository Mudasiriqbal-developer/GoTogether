import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register: registerForm, handleSubmit, formState: { errors }, watch } = useForm();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  const password = watch("password");

  const onSubmit = async (data) => {
    setAuthError('');
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = data;
    
    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Create an account</h2>
      
      {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input 
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
            id="name" 
            type="text" 
            placeholder="John Doe" 
            {...registerForm('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input 
            className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            {...registerForm('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Entered value does not match email format'
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input 
            className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
            id="phone" 
            type="tel" 
            placeholder="+92 300 1234567" 
            {...registerForm('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="role">
            I am a...
          </label>
          <select 
            id="role"
            className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            {...registerForm('role', { required: 'Please select a role' })}
            defaultValue="Passenger"
          >
            <option value="Passenger">Passenger (Looking for rides)</option>
            <option value="Driver">Driver (Offering rides)</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
            id="password" 
            type="password" 
            placeholder="******************" 
            {...registerForm('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must have at least 6 characters' }
            })}
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input 
            className={`shadow appearance-none border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
            id="confirmPassword" 
            type="password" 
            placeholder="******************" 
            {...registerForm('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'The passwords do not match'
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300" 
            type="submit"
          >
            Register
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
