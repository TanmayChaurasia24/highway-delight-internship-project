import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { EyeIcon, EyeOffIcon } from './ui/Lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  

  const navigate = useNavigate();

  const handleLogin = async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/users/login", userData);
      console.log(response);
      
      if (response.status === 201) {
        const { firstname, lastname, email } = response.data.user;

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({ firstname, lastname, email }));

        // Redirect to the dashboard
        navigate("/home");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(error.response.data.message || "Login failed");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage("No response from server. Please try again later.");
      } else {
        console.error("Error", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage(null);

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Call login handler
    handleLogin({ email, password });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen w-full">
      <div className="h-[30vh] lg:h-screen w-full lg:w-1/2 flex justify-center items-center bg-purple-100">
        <img src="src/assets/Screenshot 2024-09-15 182719.png" className="max-w-full max-h-full object-contain" alt="Login illustration" />
      </div>
      <div className="h-auto lg:h-screen w-full lg:w-1/2 flex justify-center items-center p-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-purple-800">Welcome Back!</h2>
          </div>
          {errorMessage && <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-gray-300 focus:border-purple-500 w-full"
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b border-gray-300 focus:border-purple-500 pr-10 w-full"
              />
              <button
                type="button"
                className="absolute right-2 top-7 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 text-sm lg:text-base">
              Sign In
            </Button>
            <Button
              type="button"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 text-sm lg:text-base mt-2"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
