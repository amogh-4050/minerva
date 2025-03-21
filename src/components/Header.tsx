import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-4">
              <img src="/pes_logo.jpg" alt="PES Logo" className="h-40 w-auto" />
              <img src="/LOGO.png" alt="Minerva Logo" className="h-36 w-auto" />            
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            {user ? (
              <>
                <Link to="/resources" className="text-gray-700 hover:text-gray-900">Resources</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-gray-900">Admin</Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}