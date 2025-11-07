"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { Mail, Phone, Instagram, Facebook, Twitter, Music } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="relative h-[350px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1610701596007e+12-11502861dcfa?w=1600"
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;d love to hear from you! Whether you have a question
                about our products, need a custom design quote, or just want to
                share your ideas, our team is here to help. Reach out through
                any of the channels below, and we&apos;ll get back to you as
                soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      marketing@ilavioo.com
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
                    <p className="font-semibold text-gray-900">
                      +62 81213696772
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                      <Instagram className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      @ilavioo_nusantara
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Message"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-black resize-none"
                  ></textarea>
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-md shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126481.47538972477!2d110.59516987273252!3d-7.531982243967956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a6e3a7bb36dc5%3A0x3027a76e352be30!2sBoyolali%2C%20Boyolali%20Regency%2C%20Central%20Java%2C%20Indonesia!5e0!3m2!1sen!2s!4v1729155000000!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>

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
