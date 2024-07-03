import React, { useEffect, useState } from 'react';
import { ApiResponse, FetchDataFunction } from './generictype';

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchData: FetchDataFunction<User> = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    data,
    status: response.status,
    message: response.statusText,
  };
};

const App = (): JSX.Element => {
  const [user, setUser] = useState<ApiResponse<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = () => {
    setLoading(true);
    fetchData('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        setUser(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">User Data</h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : user ? (
          <div className="space-y-4">
            <p className="text-lg"><span className="font-semibold">ID:</span> {user.data.id}</p>
            <p className="text-lg"><span className="font-semibold">Name:</span> {user.data.name}</p>
            <p className="text-lg"><span className="font-semibold">Email:</span> {user.data.email}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">Failed to load user data.</p>
        )}
        <button
          onClick={fetchUser}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 ease-in-out"
        >
          <span className="mr-2">Refresh Data</span> 
        </button>
      </div>
    </div>
  );
};

export default App;
