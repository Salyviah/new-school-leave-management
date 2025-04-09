'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    secretCode: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example validation for the secret code
    const VALID_SECRET_CODE = 'mysupersecret';
    if (formData.secretCode !== VALID_SECRET_CODE) {
      setError('Invalid secret code. Please contact the administrator.');
      return;
    }

    setError(null);

    // Log the form data — replace this with an API call
    console.log('Form submitted:', formData);

    // Reset the form
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: '',
      secretCode: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#3b1c6a] flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-200 hover:text-white">
          <FiArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#4e2a85] rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl text-white font-bold mb-6 text-center">Create an Account</h2>

          {error && (
            <div className="mb-4 bg-red-500 text-white px-4 py-2 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-purple-200 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-purple-100 text-black"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-purple-200 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-purple-100 text-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-purple-200 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-purple-100 text-black"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-purple-200 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-purple-100 text-black"
              >
                <option value="">Select a role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="secretCode" className="block text-purple-200 mb-1">
                Secret Code
              </label>
              <input
                type="text"
                id="secretCode"
                name="secretCode"
                value={formData.secretCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-purple-100 text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
