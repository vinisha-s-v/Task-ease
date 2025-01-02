// ResetPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Check if both passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Replace with the appropriate API endpoint and pass the new password
      const response = await axios.post('http://localhost:8080/auth/reset-password', {
        password: newPassword
      });

      if (response.status === 200) {
        setMessage('Password successfully reset!');
        setTimeout(() => {
          navigate('/login'); // Redirect to login after successful reset
        }, 2000);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.log(error);
      setError('Error resetting password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-sm hover:bg-blue-500 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
