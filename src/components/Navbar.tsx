
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  LayoutDashboard, 
  Activity, 
  History, 
  Smartphone, 
  Upload, 
  Settings,
  User
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <HomeIcon className="h-6 w-6 text-flora-green" />
                <span className="ml-2 text-xl font-bold text-gray-900">FloraSense</span>
              </Link>
            </div>
            <nav className="ml-8 flex space-x-6">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/dashboard')
                    ? 'text-flora-green border-b-2 border-flora-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <LayoutDashboard className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
              <Link
                to="/devices"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/devices')
                    ? 'text-flora-green border-b-2 border-flora-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Devices
              </Link>
              <Link
                to="/insights"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/insights')
                    ? 'text-flora-green border-b-2 border-flora-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Activity className="h-4 w-4 mr-1" />
                Insights
              </Link>
              <Link
                to="/history"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/history')
                    ? 'text-flora-green border-b-2 border-flora-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <History className="h-4 w-4 mr-1" />
                History
              </Link>
              <Link
                to="/upload"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/upload')
                    ? 'text-flora-green border-b-2 border-flora-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationCenter />
            <Link 
              to="/settings" 
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <Link 
              to="/profile" 
              className="p-1 rounded-full border-2 border-gray-200 hover:border-gray-300"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
