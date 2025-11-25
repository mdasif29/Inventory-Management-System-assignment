import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
    };
    fetchCategories();

    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/api/products/${id}`);
          setName(data.name);
          setSku(data.sku);
          setPrice(data.price);
          setStock(data.stock);
          setCategoryId(data.categoryId);
          setDescription(data.description || '');
        } catch (error) {
          toast.error('Error fetching product');
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('categoryId', categoryId);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isEdit) {
        await axios.put(`/api/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated');
      } else {
        await axios.post('/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product created');
      }
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border p-2 rounded" required>
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded h-24"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full border p-2 rounded" />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate('/products')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
