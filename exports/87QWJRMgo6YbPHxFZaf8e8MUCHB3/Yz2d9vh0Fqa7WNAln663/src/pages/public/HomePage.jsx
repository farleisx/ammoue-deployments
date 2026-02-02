import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import ProductCard from '../../components/product/ProductCard.jsx';
import Card from '../../components/common/Card.jsx';
import { Truck, ShieldCheck, CreditCard, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = ["https://images.pexels.com/photos/16027816/pexels-photo-16027816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/23474/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/8217430/pexels-photo-8217430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/33433724/pexels-photo-33433724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/30846314/pexels-photo-30846314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"];
const videos = ["https://videos.pexels.com/video-files/16049995/16049995-sd_540_796_30fps.mp4","https://videos.pexels.com/video-files/6375965/6375965-hd_1080_2048_30fps.mp4"];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);

  useEffect(() => {
    // Fetch mock products for featured section
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4)); // Get first 4 products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };


  return (
    <div className="flex flex-col items-center justify-center dark:bg-neutral-900 font-poppins text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-DEFAULT/50 to-accent-DEFAULT/50 dark:from-neutral-950 dark:to-neutral-800">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroVideoLoaded ? 'opacity-30' : 'opacity-0'}`}
          onLoadedData={() => setHeroVideoLoaded(true)}
          src={videos[1]} // Using one of the provided videos
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40 dark:opacity-60"></div> {/* Overlay */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6">
            <span className="text-gradient from-primary-light to-accent-light">Upgrade Your Everyday Tech</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Premium smart accessories built for performance and style. Experience innovation that fits your lifestyle.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button as={Link} to="/shop" size="lg" variant="primary">
              Shop Now
            </Button>
            <Button as={Link} to="/dashboard" size="lg" variant="glass">
              View Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Featured <span className="text-primary-DEFAULT dark:text-primary-light">Products</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Button as={Link} to="/shop" size="lg" variant="secondary">
            View All Products
          </Button>
        </motion.div>
      </motion.section>

      {/* Why Nexora Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-gray-50 dark:bg-neutral-950 rounded-3xl mb-20 shadow-inner dark:shadow-none"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose <span className="text-accent-DEFAULT dark:text-accent-light">NEXORA?</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="p-8 flex flex-col items-center text-center h-full" glow>
              <Truck size={48} className="text-primary-DEFAULT dark:text-primary-light mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">Get your gear delivered quickly and efficiently right to your door.</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-8 flex flex-col items-center text-center h-full" glow>
              <Award size={48} className="text-primary-DEFAULT dark:text-primary-light mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium Materials</h3>
              <p className="text-gray-600 dark:text-gray-400">Crafted with high-quality, durable materials for a luxurious feel and lasting performance.</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-8 flex flex-col items-center text-center h-full" glow>
              <ShieldCheck size={48} className="text-primary-DEFAULT dark:text-primary-light mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">30-Day Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">Shop with confidence with our hassle-free 30-day money-back guarantee.</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-8 flex flex-col items-center text-center h-full" glow>
              <CreditCard size={48} className="text-primary-DEFAULT dark:text-primary-light mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">Your transactions are protected with industry-leading encryption and security protocols.</p>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Proof Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          What Our <span className="text-primary-DEFAULT dark:text-primary-light">Customers Say</span>
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mb-8">
          {Array(5).fill(0).map((_, i) => (
            <Star key={i} size={32} fill="currentColor" className="text-yellow-400 dark:text-yellow-300" />
          ))}
          <span className="text-3xl font-bold text-gray-900 dark:text-white ml-2">4.9/5</span>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          "NEXORA has completely transformed my daily routine. The quality, design, and performance are unmatched. Truly smart gear for the next generation!"
          <br /><span className="font-semibold text-primary-DEFAULT dark:text-primary-light">- Jessica L., Verified Buyer</span>
        </motion.p>

        <motion.p variants={itemVariants} className="text-center text-3xl font-bold text-primary-DEFAULT dark:text-primary-light">
          Trusted by 50,000+ customers worldwide!
        </motion.p>
      </motion.section>
    </div>
  );
};

export default HomePage;