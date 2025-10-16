import Image from "next/image";
import { Mail, Phone, Instagram, Facebook, Twitter, Music } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[350px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600"
            alt="Contact Us"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you! Whether you have a question about
                our products, need a custom design quote, or just want to share
                your ideas, our team is here to help. Reach out through any of
                the channels below, and we'll get back to you as soon as
                possible.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      ilavio@mail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">+62812345678</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                      <Instagram className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">@ilavio</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Facebook className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">@ilavio</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                      <Twitter className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">@ilavio</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <Music className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">@ilavio</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Message"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-black resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200"
                alt="Map"
                fill
                className="object-cover"
              />
            </div>

            {/* Find Us Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
              <p className="text-gray-600 mb-6">
                Discover our exclusive showroom where you can explore our
                complete collections in person. Our space is designed to inspire
                your next project. Our expert consultants are available to
                provide personalized guidance, discuss custom design
                possibilities, and help you select the perfect pieces that
                reflect your unique style and elevate your living environment
                beautifully and harmoniously.
              </p>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-copper-600 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">
                    Jl. Raya Boyolali
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
