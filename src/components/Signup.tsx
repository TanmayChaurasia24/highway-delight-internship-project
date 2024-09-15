import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { EyeIcon, EyeOffIcon } from "./ui/Lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async (userData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/signup",
        userData
      );

      if (response) {
        console.log("Signup successful");
        navigate("/home");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(error.response.data.message || "Signup failed");
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
    if (!firstname || !lastname || !email || !password || !retypePassword) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (password !== retypePassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Call signup handler
    handleSignup({ firstname, lastname, email, password });
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen w-full">
    <div className="h-[30vh] lg:h-screen w-full lg:w-1/2 flex justify-center items-center bg-purple-100">
      <img src="src\assets\Screenshot 2024-09-15 182713.png" className="max-w-full max-h-full object-contain" alt="Signup illustration" />
    </div>
    <div className="h-auto lg:h-screen w-full lg:w-1/2 flex justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-purple-800">Let us know!</h2>
          <a href="/login" className="text-sm lg:text-base text-purple-600 hover:underline">
            Sign In
          </a>
        </div>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm">
            {errorMessage}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="firstName" className="text-sm">First Name</Label>
            <Input
              id="firstName"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-b border-gray-300 focus:border-purple-500 w-full"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm">Last Name</Label>
            <Input
              id="lastName"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="border-b border-gray-300 focus:border-purple-500 w-full"
            />
          </div>
          <div className="relative">
            <Label htmlFor="password" className="text-sm">Set Password</Label>
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
          <div className="relative">
            <Label htmlFor="retypePassword" className="text-sm">Retype Password</Label>
            <Input
              id="retypePassword"
              type={showRetypePassword ? "text" : "password"}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="border-b border-gray-300 focus:border-purple-500 pr-10 w-full"
            />
            <button
              type="button"
              className="absolute right-2 top-7 text-gray-500"
              onClick={() => setShowRetypePassword(!showRetypePassword)}
            >
              {showRetypePassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
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
          <Button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 text-sm lg:text-base"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  </div>
</>
  );
}
