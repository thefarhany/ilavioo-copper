"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  AlertCircle,
  Ruler,
  Sparkles,
  Package,
  Tag,
} from "lucide-react";

interface ProductSpecification {
  size?: string | null;
  finishing?: string | null;
  material?: string | null;
  price?: string | null;
}

interface ProductTabsProps {
  details?: string | null;
  notes?: string | null;
  specifications?: ProductSpecification | null;
}

export default function ProductTabs({
  details,
  notes,
  specifications,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    {
      id: "details",
      label: "Product Details",
      icon: FileText,
      show: !!details,
    },
    {
      id: "specifications",
      label: "Specifications",
      icon: Ruler,
      show: !!specifications,
    },
    {
      id: "notes",
      label: "Important Notes",
      icon: AlertCircle,
      show: !!notes,
    },
  ].filter((tab) => tab.show);

  if (tabs.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden">
      {/* Tabs Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-6 sm:p-8">
        {/* Details Tab */}
        {activeTab === "details" && details && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-green-600" />
              Product Details
            </h3>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {details.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && specifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ruler className="w-6 h-6 text-green-600" />
              Technical Specifications
            </h3>

            <div className="flex flex-wrap gap-6">
              {specifications.size && (
                <div className="flex-1 min-w-[calc(50%-12px)] max-w-full flex items-start gap-4 p-5 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Ruler className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-green-700 mb-1">
                      Size / Dimensions
                    </p>
                    <p className="text-lg font-bold text-gray-900 break-words">
                      {specifications.size}
                    </p>
                  </div>
                </div>
              )}

              {specifications.finishing && (
                <div className="flex-1 min-w-[calc(50%-12px)] max-w-full flex items-start gap-4 p-5 bg-copper-50 rounded-xl border border-copper-100">
                  <div className="w-12 h-12 bg-copper-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-copper-700 mb-1">
                      Finishing Type
                    </p>
                    <p className="text-lg font-bold text-gray-900 break-words">
                      {specifications.finishing}
                    </p>
                  </div>
                </div>
              )}

              {specifications.material && (
                <div className="flex-1 min-w-[calc(50%-12px)] max-w-full flex items-start gap-4 p-5 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-green-700 mb-1">
                      Material
                    </p>
                    <p className="text-lg font-bold text-gray-900 break-words">
                      {specifications.material}
                    </p>
                  </div>
                </div>
              )}

              {specifications.price && (
                <div className="flex-1 min-w-[calc(50%-12px)] max-w-full flex items-start gap-4 p-5 bg-copper-50 rounded-xl border border-copper-100">
                  <div className="w-12 h-12 bg-copper-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-copper-700 mb-1">
                      Starting Price
                    </p>
                    <p className="text-lg font-bold text-gray-900 break-words">
                      {specifications.price}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && notes && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-xl border-2 border-amber-200">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-amber-900 mb-3">
                  Important Information
                </h3>
                <div className="prose max-w-none text-amber-900 leading-relaxed">
                  {notes.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
