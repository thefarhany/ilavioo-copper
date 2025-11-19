"use client";

import Link from "next/link";
import { Plus, Upload, FileText, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickActions() {
  const actions = [
    {
      name: "Add Product",
      href: "/admin/products/new",
      icon: Plus,
      color: "from-green-500 to-green-600",
      description: "Create new product",
    },
    {
      name: "Upload to Gallery",
      href: "/admin/gallery/new",
      icon: Upload,
      color: "from-blue-500 to-blue-600",
      description: "Add images/videos",
    },
    {
      name: "View Messages",
      href: "/admin/messages",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      description: "Check customer inquiries",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      color: "from-gray-600 to-gray-700",
      description: "Configure admin panel",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              href={action.href}
              className={`block bg-gradient-to-br ${action.color} text-white rounded-xl p-6 transition-all hover:scale-105 hover:shadow-xl group relative overflow-hidden`}
            >
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                <Icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">{action.name}</h3>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
