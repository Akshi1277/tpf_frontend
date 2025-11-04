"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users } from "lucide-react"

export default function FundraisingHero({ darkMode }) {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-neutral-50"}`}>
      {/* Hero Section with Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 z-10"
          >
            <div className="space-y-2">
              <h1
                className={`text-5xl md:text-6xl font-bold leading-tight ${darkMode ? "text-white" : "text-zinc-900"}`}
              >
                Hope Foundation
              </h1>
              <p className={`text-xl ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>Building a Better Tomorrow</p>
            </div>

            <p className={`text-lg leading-relaxed max-w-md ${darkMode ? "text-zinc-400" : "text-zinc-700"}`}>
              Together, we're transforming lives through access to clean water, education, and sustainable resources for
              communities in need.
            </p>

            {/* Stats Row */}
            <div className="flex gap-6 pt-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className={`w-5 h-5 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                  <span className={`font-bold text-2xl ${darkMode ? "text-white" : "text-zinc-900"}`}>423</span>
                </div>
                <p className={`text-sm ${darkMode ? "text-zinc-500" : "text-zinc-600"}`}>Active Donors</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span className={`font-bold text-2xl ${darkMode ? "text-white" : "text-zinc-900"}`}>₹2.5L</span>
                </div>
                <p className={`text-sm ${darkMode ? "text-zinc-500" : "text-zinc-600"}`}>Raised This Year</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Donate Now
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-colors border ${
                  darkMode
                    ? "border-zinc-700 text-white hover:bg-zinc-800"
                    : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
              alt="Clean water initiative"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-full text-sm">
              Active Campaign
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className={`py-20 ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-12 text-center ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Our Impact in Action
          </h2>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                alt="Village community"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Community Support Program</p>
              </div>
            </motion.div>

            {/* Small Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src="https://media.istockphoto.com/id/635767916/photo/poor-indian-children-asking-for-fresh-water-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=nz5UDN6IZRuFDZOxIa9CnkK3pycuP-aLIUmVuz5TgqU="
                alt="Water access project"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold text-sm">Water Access</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1758691463110-697a814b2033?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lZGljYWwlMjBhaWQlMjBhbmQlMjB3ZWxsbmVzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
                alt="Healthcare - Medical aid & wellness"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold text-sm">Healthcare</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
              Why Your Support Matters
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-700"}`}>
              Every donation directly impacts lives. From building wells to funding education programs, your generosity
              creates lasting change in communities that need it most.
            </p>
            <ul className="space-y-4">
              {["Immediate community impact", "100% transparent spending", "Annual impact reports"].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661962927450-d5f7c9267ca2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fERvbmF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
              alt="Impact story"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
