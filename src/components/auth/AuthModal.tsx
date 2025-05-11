import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal: React.FC = () => {
  const { isModalOpen, closeAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <Modal isOpen={isModalOpen} onClose={closeAuthModal}>
      <div className="space-y-6">
        <div className="flex border-b">
          <button
            className={`w-1/2 px-4 py-2 text-center font-medium 
              ${activeTab === 'login' 
                ? 'border-b-2 border-teal-600 text-teal-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 px-4 py-2 text-center font-medium
              ${activeTab === 'register' 
                ? 'border-b-2 border-teal-600 text-teal-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </Modal>
  );
};

export default AuthModal;