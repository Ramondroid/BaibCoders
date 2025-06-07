'use client';

import React, { useState } from 'react';
import { Save, UserPlus } from 'lucide-react';
import CopilotChatWrapper from "@/components/CopilotChatWrapper";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hashedPassword: '',
    course: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    const { name, email, hashedPassword, course } = formData;

    if (!name || !email || !hashedPassword || !course) {
      setSubmitMessage('❌ All fields are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'Users', data: formData }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unknown error');

      setSubmitMessage('✅ User added successfully!');
      setFormData({ name: '', email: '', hashedPassword: '', course: '' });
    } catch (error: any) {
      setSubmitMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] px-6 pt-8 pb-12 text-white flex flex-col items-center">
    <div className="mb-6 text-center items-left">
      <h1 className="text-4xl font-extrabold mb-2">Enroll a Student</h1>
      <p className="text-gray-300">Enroll student to platform for a new user</p>
    </div>

    <div className="bg-[#2a2b31] p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="h-6 w-6 text-purple-400" />
        <h2 className="text-2xl font-bold">Add New Student</h2>
      </div>

      <div className="space-y-5">
        {['name', 'email', 'hashedPassword', 'course'].map((field) => (
          <div key={field}>
            <label className="block text-sm text-gray-300 capitalize mb-1">
              {field === 'hashedPassword' ? 'Password' : field}
            </label>
            <input
              type={field === 'hashedPassword' ? 'password' : 'text'}
              value={formData[field as keyof typeof formData]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-4 py-3 bg-[#1e1f24] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Enter ${field === 'hashedPassword' ? 'hashed password' : field}`}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 transition-colors text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Submitting...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Submit
            </>
          )}
        </button>

        {submitMessage && (
          <div className={`text-sm text-center mt-4 font-medium p-3 rounded-lg ${
            submitMessage.includes('✅') ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
          }`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  </div>
);
};