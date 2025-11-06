
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
// ===== 1. HERO SECTION =====
const HeroSection = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex items-center"
      style={{
        background: 'linear-gradient(180deg, #3D9970 0%, #2D7A5C 40%, #1E5A44 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)`
        }} />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center w-full">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 font-arabic"
            style={{ color: '#D4AF37' }}
          >
            بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)'
            }}
          >
            Calculate
            <br />
            <span style={{ color: '#D4AF37' }}>your Zakat</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            To determine how much Zakat is due,
            <br className="hidden sm:block" />
            we'll use a simple formula.
          </motion.p>
        </motion.div>

        {/* Formula Card */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto border"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderColor: 'rgba(212, 175, 55, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-base sm:text-lg md:text-xl font-medium">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="text-gray-700 font-semibold"
              >
                Your total <span style={{ color: '#2D7A5C' }}>assets</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: '#D4AF37' }}
              >
                −
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="text-gray-700 font-semibold"
              >
                Your immediate <span style={{ color: '#2D7A5C' }}>debts</span>
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center"
            >
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#D4AF37' }}>=</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="text-lg sm:text-xl md:text-2xl font-bold py-3 px-6 rounded-xl inline-block"
              style={{ 
                background: 'linear-gradient(135deg, rgba(45, 122, 92, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                color: '#2D7A5C'
              }}
            >
              Your Zakatable wealth
            </motion.div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="h-px mx-auto w-3/4"
              style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)' }}
            />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-base sm:text-lg md:text-xl font-medium pt-2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="text-gray-700 font-semibold"
              >
                If your Zakatable wealth is equal to, or above <span style={{ color: '#2D7A5C' }}>the nisab</span>
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="text-sm sm:text-base text-gray-600 italic"
            >
              and you've had it for at least one lunar year, zakat is due.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.7 }}
              className="flex items-center justify-center gap-4 py-4"
            >
              <div className="flex items-center gap-3 text-lg sm:text-xl">
                <span className="font-semibold text-gray-700">Zakatable wealth</span>
                <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>×</span>
                <span className="font-bold text-xl sm:text-2xl" style={{ color: '#D4AF37' }}>2.5%</span>
                <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>=</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold py-4 px-8 rounded-xl"
              style={{ 
                background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)',
                color: '#D4AF37',
                boxShadow: '0 4px 20px rgba(45, 122, 92, 0.3)'
              }}
            >
              Your zakat due
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;