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
            {[
              {
                id: 1,
                name: "anime shirts",
                price: "20 rupees",
                image: "https://i.pinimg.com/1200x/65/e3/39/65e339801b028058663bd3c760549ec8.jpg"
              },
              {
                id: 2,
                name: "graphic card",
                price: "8000 rupees",
                image: "https://i.pinimg.com/1200x/b7/16/b4/b716b41df165dad44f99556da97313c5.jpg"
              },
              {
                id: 3,
                name: "laptop apple pro max ",
                price: "1 rupees",
                image: "https://i.pinimg.com/736x/ce/b6/ec/ceb6ecddb34e9cfafa4072e4437f3e83.jpg"
              }
            ].map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-blue-600 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center gap-6 my-12">
        <Link 
          to="/login" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-4"
        >
          Login as Admin
        </Link>
        <Link 
          to="/login" 
          className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition transform hover:-translate-y-4"
        >
          Login as Manager
        </Link>
      </div>
      {/* Testimonials */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-800 p-6 rounded-lg">
              <p className="italic mb-4">"This system revolutionized how we track our inventory. Highly recommended!"</p>
              <h4 className="font-bold">- melon musk, star boat </h4>
            </div>
            <div className="bg-blue-800 p-6 rounded-lg">
              <p className="italic mb-4">"Simple to use and the role-based access is exactly what we needed."</p>
              <h4 className="font-bold">- Mike T., sportman</h4>
            </div>
            <div className="bg-blue-800 p-6 rounded-lg">
              <p className="italic mb-4">"The real-time tracking saved us from running out of stock during the holidays."</p>
              <h4 className="font-bold">- jeff bos., Tech Store</h4>
            </div>
          </div>
        </div>
      </section>


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
