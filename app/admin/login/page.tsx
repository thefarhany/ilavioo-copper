"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogIn,
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-copper-50 flex items-center justify-center p-4">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-copper-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main Container - EQUAL HEIGHT GRID */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 lg:min-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding & Info - MATCH RIGHT HEIGHT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-green-600 to-forest-600 text-white relative overflow-hidden"
          >
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/copper-pattern.svg')] bg-repeat"></div>
            </div>

            <div className="relative z-10">
              {/* Logo - Using Ilavio Logo */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/favicon.ico"
                    alt="Ilavio Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div>
                    <h1 className="font-display text-3xl font-bold">Ilavio</h1>
                    <p className="text-green-100 text-sm">
                      Copper Crafts Admin
                    </p>
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <h2 className="font-display text-4xl font-bold mb-4">
                Welcome Back!
              </h2>
              <p className="text-green-50 text-lg mb-8 leading-relaxed">
                Manage your copper crafts business with our powerful admin
                dashboard. Control products, gallery, messages, and more.
              </p>

              {/* Features List */}
              <div className="space-y-4">
                {[
                  "Manage products & inventory",
                  "Upload to gallery",
                  "View customer messages",
                  "Analytics & insights",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-green-50">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* Right Side - Login Form - FULL HEIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center p-6 sm:p-12"
          >
            <div className="w-full max-w-md">
              {/* Mobile Logo - Using Ilavio Logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                <Image
                  src="/logo.png" // Replace with your colored logo path
                  alt="Ilavio Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <div>
                  <h1 className="font-display text-2xl font-bold text-gray-900">
                    Ilavio
                  </h1>
                  <p className="text-gray-500 text-sm">Admin Panel</p>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to access the dashboard
                </p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 p-4 mb-6 bg-red-50 border-2 border-red-200 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="admin@ilavio.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-all placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500">
                  Protected by Ilavio Security System
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright - Outside Card */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Ilavio Copper Crafts. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
