import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'bg-blue-700' : '';

  return (
    <div className="w-64 bg-blue-900 text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 text-2xl font-bold border-b border-blue-800">
        Inventory Pro
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/dashboard" className={`flex items-center p-3 rounded hover:bg-blue-800 ${isActive('/dashboard')}`}>
          <LayoutDashboard className="mr-3" /> Dashboard
        </Link>
        <Link to="/products" className={`flex items-center p-3 rounded hover:bg-blue-800 ${isActive('/products')}`}>
          <Package className="mr-3" /> Products
        </Link>
        {user?.role === 'admin' && (
          <Link to="/users" className={`flex items-center p-3 rounded hover:bg-blue-800 ${isActive('/users')}`}>
            <Users className="mr-3" /> Users
          </Link>
        )}
      </nav>
      <div className="p-4 border-t border-blue-800">
        <div className="mb-4">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-blue-300 capitalize">{user?.role}</p>
        </div>
        <button onClick={logout} className="flex items-center text-red-300 hover:text-red-100 w-full">
          <LogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
