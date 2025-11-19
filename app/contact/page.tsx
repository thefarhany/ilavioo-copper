"use client";

import { useState } from "react";
import FadeInView from "@/components/animations/FadeInView";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 2000);

    // TODO: Replace with actual form submission logic
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-forest-600 text-white py-24 lg:py-44 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/copper-pattern.svg')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInView direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Let&apos;s Create Something
                <span className="text-green-200">Extraordinary</span>
              </h1>
              <p className="text-xl text-green-50 leading-relaxed max-w-3xl mx-auto">
                We&apos;d love to hear from you! Whether you have a question
                about our products, need a custom design quote, or just want to
                share your ideas, our team is here to help.
              </p>
            </div>
          </FadeInView>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 block leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto block"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StaggerItem>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                <a
                  href="mailto:marketing@ilavioo.com"
                  className="text-green-600 hover:text-green-700 font-medium break-all"
                >
                  marketing@ilavioo.com
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-copper-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-copper-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <a
                  href="tel:+6281213696772"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  +62 812-1369-6772
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Instagram className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Instagram</h3>
                <a
                  href="https://instagram.com/ilavioo_nusantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  @ilavioo_nusantara
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-copper-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-copper-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Working Hours</h3>
                <p className="text-gray-600 text-sm">
                  Mon - Sat: 8AM - 5PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInView direction="left">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-colors"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="quote">Request a Quote</option>
                      <option value="custom">Custom Design</option>
                      <option value="support">Product Support</option>
                      <option value="wholesale">Wholesale/Partnership</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:border-green-500 focus:outline-none focus:bg-white transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-green-800 font-medium">
                        Message sent successfully! We&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-800 font-medium">
                        Something went wrong. Please try again or contact us
                        directly.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </FadeInView>

            {/* Showroom Info & Map */}
            <FadeInView direction="right">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Showroom Card */}
                <div className="bg-gradient-to-br from-green-50 to-copper-50 rounded-2xl p-8 border-2 border-green-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                        Visit Our Showroom
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Discover our exclusive showroom where you can explore
                        our complete collections in person. Our expert
                        consultants are available to provide personalized
                        guidance.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          Address
                        </p>
                        <p className="text-gray-700">
                          Jl. Raya Boyolali - Semarang, Tumang
                          <br />
                          Boyolali, Central Java, Indonesia
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          Opening Hours
                        </p>
                        <p className="text-gray-700">
                          Monday - Saturday: 8:00 AM - 5:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Tumang+Boyolali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Get Directions
                  </a>
                </div>

                {/* Map Embed */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100">
                  <div className="aspect-video bg-gray-100">
                    {/* Google Maps Embed - Replace with your actual location */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d110.59373845820312!3d-7.470445900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1418e0a9be29%3A0x5027a76b021e0!2sTumang%2C%20Cepogo%2C%20Boyolali%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-cream-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up" className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services
            </p>
          </FadeInView>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Do you offer custom designs?",
                a: "Yes! We specialize in custom copper crafts tailored to your specifications. Contact us with your ideas and we'll bring them to life.",
              },
              {
                q: "What is the lead time for custom orders?",
                a: "Lead times vary depending on the complexity and size of the project, typically ranging from 2-8 weeks. We'll provide a specific timeline after reviewing your requirements.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship our products worldwide. Shipping costs and delivery times vary by location. Contact us for a detailed quote.",
              },
              {
                q: "What materials do you work with?",
                a: "We primarily work with copper, brass, and aluminum. All our materials are high-quality and sourced responsibly.",
              },
              {
                q: "How do I maintain copper products?",
                a: "Copper naturally develops a patina over time. We provide detailed care instructions with each product. Regular cleaning with mild soap and water is usually sufficient.",
              },
            ].map((faq, index) => (
              <FadeInView key={index} direction="up">
                <details className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-green-200 transition-all overflow-hidden shadow-md hover:shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <MessageSquare className="w-5 h-5 text-green-600 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
