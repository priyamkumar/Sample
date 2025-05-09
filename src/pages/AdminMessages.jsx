import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMessages } from '../api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getMessages();
      setMessages(response.messages);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

      <div className="space-y-6">
        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{message.subject}</h3>
                <p className="text-gray-600">From: {message.name}</p>
                <p className="text-gray-600">{message.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
          </motion.div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No messages found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;