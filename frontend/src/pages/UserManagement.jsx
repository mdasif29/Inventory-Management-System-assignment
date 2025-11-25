import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Shield, Ban, CheckCircle } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'manager' });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', newUser);
      toast.success('User created');
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    }
  };

  const toggleBlock = async (id) => {
    try {
      await axios.put(`/api/users/${id}/block`);
      toast.success('User status updated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Manager
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">
                  {user.isBlocked ? (
                    <span className="text-red-600 flex items-center"><Ban size={16} className="mr-1"/> Blocked</span>
                  ) : (
                    <span className="text-green-600 flex items-center"><CheckCircle size={16} className="mr-1"/> Active</span>
                  )}
                </td>
                <td className="p-4">
                  {user.role !== 'admin' && (
                    <button 
                      onClick={() => toggleBlock(user.id)}
                      className={`text-sm px-3 py-1 rounded ${user.isBlocked ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Manager</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block text-sm mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border p-2 rounded"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full border p-2 rounded"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
