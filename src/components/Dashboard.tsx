import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<{ firstname: string; lastname:string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect to login if user info is not found
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after sign out
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Button onClick={handleSignOut}>
          Sign Out
        </Button>
      </header>
      <main className='flex justify-center items-center h-[50vh]'>
        <div className='border-black bg-neutral-200 h-[30vh] w-fit p-10 flex flex-col justify-center items-center shadow-sm'>
          <h1 className='text-3xl'>Welcome {user?.firstname+ " " +user?.lastname}!</h1>
          <p>Your email is: {user?.email}</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
