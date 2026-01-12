'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import ProductCard from '@/components/features/ProductCard';
import { Loader2, ArrowRight, Star, TrendingUp, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Product } from '@/types';

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products?limit=4');
        setProducts(res.data.data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const features = [
    { icon: Truck, title: "Global Shipping", description: "Fast, reliable delivery to over 50 countries worldwide.", color: "from-blue-500 to-cyan-500" },
    { icon: ShieldCheck, title: "Secure Payment", description: "Your transactions are protected by industry-leading encryption.", color: "from-green-500 to-emerald-500" },
    { icon: Clock, title: "24/7 Support", description: "Our dedicated team is here to assist you anytime, anywhere.", color: "from-purple-500 to-pink-500" },
    { icon: Star, title: "Premium Quality", description: "Hand-picked products that meet our rigorous quality standards.", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-950 overflow-x-hidden selection:bg-purple-500/30">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
        {/* Parallax Background */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center scale-110">
            <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]"></div>
          </div>
        </motion.div>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[20%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div style={{ opacity }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 hover:bg-white/10 transition-colors cursor-default"
            >
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-100/90 tracking-[0.2em] uppercase">New Collection 2024</span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter"
              >
                Redefine{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                  Luxury
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              Experience the future of e-commerce. Curated products, <br className="hidden md:block" /> seamless shopping, and uncompromising quality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-gray-950 font-bold rounded-full shadow-xl shadow-white/10 hover:shadow-white/20 transition-all font-sans"
                >
                  Shop Collection
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  Our Story
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative z-10 bg-gray-950 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <RevealOnScroll>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Trending Now</h2>
              <p className="text-gray-400 text-lg font-light">Handpicked selections just for you</p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <Link href="/products" className="group flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors px-6 py-3 rounded-full hover:bg-white/5">
                View All Products
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </RevealOnScroll>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <RevealOnScroll key={product._id} delay={index * 0.1}>
                  <ProductCard product={product} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Marquee/Benefits Section */}
      <section className="bg-gray-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose ShopHub?</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-xl shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-white/10 backdrop-blur-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"
              ></motion.div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Join the Revolution</h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                  Sign up for our newsletter and get exclusive access to new drops, special offers, and styling tips.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full backdrop-blur-sm transition-all focus:bg-white/10"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-purple-950 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-purple-900/20 whitespace-nowrap"
                  >
                    Get Access
                  </motion.button>
                </form>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
