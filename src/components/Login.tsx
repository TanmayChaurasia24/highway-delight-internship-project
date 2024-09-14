import React from 'react'
import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { EyeIcon, EyeOffIcon } from "./ui/Lucide-react";
const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
  
    return (
      <>
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
          <div className="h-[100vh] w-[50%] bg-pink-400"></div>
          <div className="h-[100vh] w-[50%] flex justify-center items-center">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">
                  Let us know !
                </h2>
              </div>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-b border-gray-300 focus:border-purple-500"
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="border-b border-gray-300 focus:border-purple-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-8 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                >
                  Sign In
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
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

export default Login
