import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const productCategories = [
    { name: "Decorative Items", href: "/products?category=decorative" },
    { name: "Kitchenware", href: "/products?category=kitchenware" },
    { name: "Lighting", href: "/products?category=lighting" },
    { name: "Custom Orders", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
      color: "hover:bg-pink-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      color: "hover:bg-sky-500",
    },
    {
      name: "Youtube",
      href: "https://youtube.com",
      icon: Youtube,
      color: "hover:bg-red-600",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image
                    src="/favicon.ico"
                    alt="Ilavio Logo"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Ilavioo
                  </h3>
                  <p className="text-xs text-gray-400">
                    PT. Ilavioo Nusantara Sejahtera
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Preserving the heritage of Tumang copper craftsmanship through
              generations of skilled artisans creating timeless pieces.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color} hover:text-white`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">
              Our Products
            </h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Tumang, Boyolali
                    <br />
                    Central Java, Indonesia
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>+62 8121-3696-772</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:marketing@ilavioo.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>marketing@ilavioo.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display text-xl font-bold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm">
                Subscribe to receive our latest products and offers
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear}{" "}
              <span className="text-green-400 font-semibold">Ilavio</span>. All
              rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-green-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
