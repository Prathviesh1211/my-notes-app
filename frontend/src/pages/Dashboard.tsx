import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SigninForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, otp } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!email) {
      return setError('Please enter your email.');
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', { email });
      setMessage(response.data.message);
      localStorage.setItem('email', email); // <-- Store email here
      setStep(2);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!otp) {
        return setError('Please enter the OTP.');
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
        email,
        otp,
      });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.name); // <-- Store name here
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={step === 1 ? handleGetOtp : handleVerifyOtp} className="space-y-4 text-white">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="text-gray-400">Please login to continue to your account.</p>
      {step === 1 && (
        <>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Get OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <p className="text-gray-400">An OTP has been sent to {email}</p>
          <div className="space-y-1">
            <label htmlFor="otp" className="text-sm font-medium text-gray-400">OTP</label>
            <input type="text" name="otp" id="otp" value={otp} onChange={handleChange} className="w-full px-4 py-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign In
          </button>
        </>
      )}
      {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="mt-6 text-center text-gray-500">
        Need an account? <a href="/signup" className="text-blue-600 hover:underline">Create one</a>
      </div>
    </form>
  );
};

export default SigninForm;
