"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function FundraisingHero({ darkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Gallery images - groups of 3 (1 large + 2 small)
  const gallerySlides = [
    {
      large: {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
        label: "Community Support Program"
      },
      small: [
        {
          url: "https://media.istockphoto.com/id/635767916/photo/poor-indian-children-asking-for-fresh-water-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=nz5UDN6IZRuFDZOxIa9CnkK3pycuP-aLIUmVuz5TgqU=",
          label: "Water Access"
        },
        {
          url: "https://images.unsplash.com/photo-1758691463110-697a814b2033?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lZGljYWwlMjBhaWQlMjBhbmQlMjB3ZWxsbmVzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
          label: "Healthcare"
        }
      ]
    },
    {
      large: {
        url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
        label: "Clean Water Initiative"
      },
      small: [
        {
          url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
          label: "Education"
        },
        {
          url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
          label: "Food Security"
        }
      ]
    },
    {
      large: {
        url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80",
        label: "Agricultural Development"
      },
      small: [
        {
          url: "https://images.unsplash.com/photo-1608237963573-ba0790bc6404?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5mcmFzdHJ1Y3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          label: "Infrastructure"
        },
        {
          url: "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&q=80",
          label: "Youth Programs"
        }
      ]
    },
    {
      large: {
        url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
        label: "Women Empowerment"
      },
      small: [
        {
          url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
          label: "Literacy Programs"
        },
        {
          url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80",
          label: "Disaster Relief"
        }
      ]
    }
  ]

  const maxIndex = gallerySlides.length - 1

  // Auto-scroll for desktop only
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768
    if (!isDesktop) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

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

      {/* Image Gallery Section */}
      <div className={`py-20 ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-12 text-center ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Image Gallery
          </h2>

          {/* Gallery with Navigation */}
          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile */}
            <button
              onClick={handlePrev}
              className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                darkMode ? "bg-zinc-700 hover:bg-zinc-600" : "bg-white hover:bg-zinc-100"
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className={darkMode ? "text-white" : "text-zinc-900"} />
            </button>

            <button
              onClick={handleNext}
              className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                darkMode ? "bg-zinc-700 hover:bg-zinc-600" : "bg-white hover:bg-zinc-100"
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className={darkMode ? "text-white" : "text-zinc-900"} />
            </button>

            {/* Slides Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`
                }}
              >
                {gallerySlides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
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
                          src={slide.large.url}
                          alt={slide.large.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                          <p className="text-white font-semibold text-lg">{slide.large.label}</p>
                        </div>
                      </motion.div>

                      {/* Small Images */}
                      {slide.small.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: (itemIndex + 1) * 0.1 }}
                          className="relative rounded-2xl overflow-hidden group cursor-pointer"
                        >
                          <img
                            src={item.url}
                            alt={item.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <p className="text-white font-semibold text-sm">{item.label}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {gallerySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? darkMode ? "bg-emerald-400 w-8" : "bg-emerald-600 w-8"
                      : darkMode ? "bg-zinc-600" : "bg-zinc-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
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