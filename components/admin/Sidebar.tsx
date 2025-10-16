"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Home,
  ChevronDown,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      submenu: [
        { name: "All Products", href: "/admin/products" },
        { name: "Add New", href: "/admin/products/new" },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen fixed left-0 top-0 text-white shadow-2xl z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link
          href="/admin/dashboard"
          className="flex items-center space-x-3 group"
        >
          <div className="text-3xl group-hover:scale-110 transition-transform">
            🏆
          </div>
          <div>
            <h1 className="text-xl font-bold">Ilavio</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-4 flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.href}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? "bg-copper-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isProductsOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all ${
                            pathname === subItem.href
                              ? "bg-copper-500 text-white"
                              : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          <span>•</span>
                          <span className="font-medium">{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? "bg-copper-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-700"></div>

        {/* Additional Links */}
        <div className="space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
          >
            <Home size={20} />
            <span className="font-medium">View Website</span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Bottom User Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 px-3 py-2 bg-gray-800 rounded-lg">
          <div className="w-8 h-8 bg-copper-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
