import { motion } from 'framer-motion';

export default function FooterCTA({ darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 mb-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-center"
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Make an Impact?
      </h3>
      <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
        Join hundreds of donors who are transforming lives. Every contribution brings us closer to our goal.
      </p>
      <button className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">
        Start Your Donation
      </button>
    </motion.div>
  );
}