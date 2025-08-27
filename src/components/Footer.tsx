'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'All American Muscle';
  
  // Using specific contact details from the company summary
  const contactEmail = 'parts@allamericanmuscle.co.za';
  const contactPhone1 = '010 5921 706';
  const contactPhone2 = '072 0426 477';
  const address = '15 Tarry Rd, Alrode South, Alberton, 1451';

  return (
    <footer className="bg-gray-900 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-center md:text-left mb-8">
          <motion.div 
            className="flex items-center justify-center md:justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
            <a href={`mailto:${contactEmail}`} className="text-gray-300 hover:text-white transition-colors">
              {contactEmail} 
            </a>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
            <div className="flex flex-col items-center md:items-start">
              <a href={`tel:${contactPhone1.replace(/\D/g, '')}`} className="text-gray-300 hover:text-white transition-colors">
                {contactPhone1} 
              </a>
               <a href={`tel:${contactPhone2.replace(/\D/g, '')}`} className="text-gray-300 hover:text-white transition-colors">
                {contactPhone2} 
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center md:justify-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
            <span className="text-gray-300">{address} </span>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {siteName}. Project Tracker.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors shadow-lg focus-ring"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;