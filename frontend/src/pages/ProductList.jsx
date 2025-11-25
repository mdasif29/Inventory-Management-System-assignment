import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [stockStatus, setStockStatus] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products?pageNumber=${page}&keyword=${keyword}&stockStatus=${stockStatus}`);
      setProducts(data.products);
      setPages(data.pages);
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, stockStatus]); // Refetch on page or filter change

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700">
          <Plus size={18} className="mr-2" /> Add Product
        </Link>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search name or SKU..."
            className="border p-2 rounded"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="bg-gray-200 p-2 rounded hover:bg-gray-300">
            <Search size={20} />
          </button>
        </form>
        
        <select 
          className="border p-2 rounded" 
          value={stockStatus} 
          onChange={(e) => setStockStatus(e.target.value)}
        >
          <option value="">All Stock Status</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">No Img</div>
                  )}
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 text-gray-500">{product.sku}</td>
                <td className="p-4">{product.Category?.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.stock === 0 ? 'bg-red-100 text-red-800' : 
                    product.stock < 10 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Link to={`/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`px-3 py-1 rounded ${page === x + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
