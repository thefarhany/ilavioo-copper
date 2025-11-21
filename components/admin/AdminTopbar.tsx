"use client";

import { useState } from "react";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminTopbarProps {
  session: Session | null;
  onMenuClick: () => void;
}

export default function AdminTopbar({
  session,
  onMenuClick,
}: AdminTopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, title: "New product added", time: "5 minutes ago", unread: true },
    { id: 2, title: "Gallery updated", time: "1 hour ago", unread: true },
    {
      id: 3,
      title: "New message received",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search products, gallery..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications + User Menu */}
        <div className="flex items-center gap-3">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg transition-colors p-2"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {session?.user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {session?.user?.name?.charAt(0) || "A"}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
}
