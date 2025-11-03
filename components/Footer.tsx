import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/assets/logo.png" className="w-7" />
              <span className="text-xl font-bold text-gray-900">Ilavioo</span>
            </div>
            <p className="text-sm text-gray-600">
              Authentic handmade copper creations. Celebrating the beauty of
              traditional craftsmanship.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-copper-600 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-copper-600 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-copper-600 text-sm"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Socials</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-copper-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-copper-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-copper-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-copper-600">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Ilavioo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
