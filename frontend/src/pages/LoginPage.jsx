import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url(https://i.pinimg.com/originals/9d/70/1f/9d701ff7db8e38c04816163c9398f395.gif)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-2xl w-96 relative z-10">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-white hover:text-blue-400 mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold text-white">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-black/20 border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-black/40 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-black/20 border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-black/40 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition shadow-lg"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Exmaple: admin@example.com / admin123
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
