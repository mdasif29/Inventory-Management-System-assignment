import { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, AlertTriangle, Layers, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalCategories: 0,
    outOfStock: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, create a specific dashboard endpoint. 
        // Here we'll fetch all products and calculate locally for simplicity 
        // or assume the backend sends this. Let's fetch products and categories.
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products?pageNumber=1'), // Just get first page to get 'total' count if API supports it, or fetch all if small
          axios.get('/api/categories')
        ]);
        
        // Note: The product API I wrote returns { products, total }. 
        // To get accurate low stock/out of stock counts, we'd ideally need a specific stats endpoint 
        // or fetch ALL products. For this demo, let's assume we fetch a "stats" endpoint 
        // that I'll quickly mock or just use the total count and mock the rest for visual.
        // Actually, let's just use the total count we have and maybe fetch 'low stock' via the filter API.
        
        const totalProducts = productsRes.data.total;
        const totalCategories = categoriesRes.data.length;

        const lowStockRes = await axios.get('/api/products?stockStatus=low');
        const outStockRes = await axios.get('/api/products?stockStatus=out');

        setStats({
          totalProducts,
          totalCategories,
          lowStock: lowStockRes.data.total,
          outOfStock: outStockRes.data.total
        });

      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
      <div className={`p-4 rounded-full ${color} text-white mr-4`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Low Stock" 
          value={stats.lowStock} 
          icon={AlertTriangle} 
          color="bg-yellow-500" 
        />
        <StatCard 
          title="Total Categories" 
          value={stats.totalCategories} 
          icon={Layers} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Out of Stock" 
          value={stats.outOfStock} 
          icon={XCircle} 
          color="bg-red-500" 
        />
      </div>
    </div>
  );
};

export default Dashboard;
