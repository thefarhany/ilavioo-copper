"use client";

import { Clock, Package, Image as ImageIcon, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityFeed() {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "product",
      title: "New product added",
      description: "Copper Vase Collection",
      time: "5 minutes ago",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "gallery",
      title: "Gallery updated",
      description: "3 new images uploaded",
      time: "1 hour ago",
      icon: ImageIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      type: "message",
      title: "New message",
      description: "Customer inquiry received",
      time: "2 hours ago",
      icon: Mail,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      type: "user",
      title: "Profile updated",
      description: "Admin settings changed",
      time: "5 hours ago",
      icon: User,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 5,
      type: "product",
      title: "Product edited",
      description: "Handcrafted Bathtub",
      time: "Yesterday",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Activity Feed</h3>
          <p className="text-sm text-gray-500">Recent actions</p>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>

              {/* Indicator */}
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="text-sm text-green-600 hover:text-green-700 font-semibold">
          View All Activity
        </button>
      </div>
    </div>
  );
}
