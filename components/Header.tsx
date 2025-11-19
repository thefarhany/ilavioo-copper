"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  // Function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-r from-green-600 to-forest-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-2 hover:text-green-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+62 8121-3696-772</span>
              </a>
              <a
                href="mailto:marketing@ilavioo.com"
                className="flex items-center gap-2 hover:text-green-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>marketing@ilavioo.com</span>
              </a>
            </div>
            <div className="text-xs">
              <span className="opacity-90">
                Handcrafted Excellence from Tumang, Boyolali
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative z-10"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/favicon.ico"
                alt="Ilavio Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Ilavioo
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                PT. Ilavioo Nusantara Sejahtera
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2 text-gray-700 hover:text-green-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src="/favicon.jpg"
                        alt="Ilavio Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-gray-900">
                        Ilavioo
                      </h3>
                      <p className="text-xs text-gray-500">
                        Tumang Copper Crafts
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Links */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                            isActive(link.href)
                              ? "bg-green-50 text-green-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-100 space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300"
                  >
                    Get Quote
                  </Link>
                  <div className="space-y-2 text-sm text-gray-600">
                    <a
                      href="tel:+6281234567890"
                      className="flex items-center gap-2 hover:text-green-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>+62 812-3456-7890</span>
                    </a>
                    <a
                      href="mailto:marketing@ilavioo.com"
                      className="flex items-center gap-2 hover:text-green-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>marketing@ilavioo.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
