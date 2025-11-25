import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Zap, Image } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Manage Your Inventory Like a Pro</h1>
          <p className="text-xl text-blue-200 mb-8">Simple, Fast & Secure Product Management System</p>
          <div className="space-x-4">
            <Link to="/login" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Login as Admin
            </Link>
            <Link to="/login" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">
              Login as Manager
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Monitor stock levels instantly.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Role-Based Access</h3>
            <p className="text-gray-600">Secure admin and manager roles.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Bulk Uploads</h3>
            <p className="text-gray-600">Support for product images.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
            <p className="text-gray-600">Filter by price, category, and more.</p>
          </div>
        </div>
      </section>

      {/* Product Showcase (Static) */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Product Image {i}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Sample Product {i}</h3>
                  <p className="text-blue-600 font-bold">$99.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>Copyright © 2025 Product Inventory System</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
