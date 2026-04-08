/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Search, 
  Youtube, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Play, 
  ArrowRight,
  MessageCircle,
  Menu,
  ChevronRight,
  Quote,
  Clock,
  Share2,
  Bookmark,
  X,
  ExternalLink,
  Mail,
  User
} from "lucide-react";
import { useRef, useState, useEffect, FormEvent } from "react";

// --- Types ---
interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  articlesCount: number;
}

const AUTHORS: Record<string, Author> = {
  "arvind": {
    id: "arvind",
    name: "अरविंद शुक्ला",
    role: "Chief Correspondent",
    bio: "पिछले 15 वर्षों से ग्रामीण भारत और कृषि संकट पर रिपोर्टिंग। ग्रामीण अर्थव्यवस्था के विशेषज्ञ।",
    avatar: "अ",
    articlesCount: 142
  },
  "rajesh": {
    id: "rajesh",
    name: "राजेश कुमार",
    role: "Senior Analyst",
    bio: "कृषि अर्थशास्त्र और बाजार नीतियों के गहरे जानकार। एमएसपी और व्यापार नीतियों पर विशेष पकड़।",
    avatar: "र",
    articlesCount: 89
  },
  "meenakshi": {
    id: "meenakshi",
    name: "मीनाक्षी",
    role: "Climate Reporter",
    bio: "जलवायु परिवर्तन और उसके कृषि पर प्रभाव को कवर करने वाली समर्पित पत्रकार।",
    avatar: "म",
    articlesCount: 56
  },
  "sanjay": {
    id: "sanjay",
    name: "संजय सिंह",
    role: "Policy Expert",
    bio: "सरकारी योजनाओं और बजट विश्लेषण में विशेषज्ञता। किसानों के हक की आवाज।",
    avatar: "स",
    articlesCount: 114
  }
};

// --- Components ---

const AuthorPopup = ({ author, onClose }: { author: Author; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 20 }}
    className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-charcoal/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      className="bg-cream w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-premium-lg border border-maroon/5"
      onClick={e => e.stopPropagation()}
    >
      <div className="bg-maroon p-8 text-cream relative">
        <button onClick={onClose} className="absolute top-6 right-6 hover:rotate-90 transition-transform">
          <X size={20} />
        </button>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-3xl font-hindi font-bold shadow-xl border-4 border-cream/20">
            {author.avatar}
          </div>
          <div>
            <h3 className="text-2xl font-hindi font-black mb-1">{author.name}</h3>
            <p className="text-cream/60 text-xs uppercase tracking-widest font-bold">{author.role}</p>
          </div>
        </div>
      </div>
      <div className="p-8">
        <p className="text-charcoal/70 leading-relaxed mb-8 font-medium italic">
          "{author.bio}"
        </p>
        <div className="flex items-center justify-between pt-6 border-t border-maroon/5">
          <div className="text-center">
            <div className="text-2xl font-display font-black text-maroon">{author.articlesCount}</div>
            <div className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">Articles</div>
          </div>
          <button className="btn-premium btn-maroon text-sm">
            View All Articles <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const containerRef = useRef(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: "", contact: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.05], [0, 8]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "नाम आवश्यक है";
    if (!formData.email.trim()) {
      errors.email = "ईमेल आवश्यक है";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "अमान्य ईमेल प्रारूप";
    }
    if (!formData.message.trim()) errors.message = "संदेश आवश्यक है";
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", contact: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-gold/30 selection:text-maroon">
      {/* Reading Progress Bar */}
      <motion.div className="reading-progress" style={{ scaleX }} />
      
      {/* Grain Overlay for Texture */}
      <div className="grain-overlay" />

      <AnimatePresence>
        {selectedAuthor && (
          <AuthorPopup author={selectedAuthor} onClose={() => setSelectedAuthor(null)} />
        )}
      </AnimatePresence>

      {/* STICKY HEADER - PREMIUM MINIMALISM */}
      <motion.header 
        style={{ opacity: headerOpacity, backdropFilter: `blur(${headerBlur}px)` }}
        className="sticky top-0 z-[1000] bg-cream/80 border-b border-maroon/10 transition-colors duration-500"
      >
        <div className="bg-charcoal text-cream/60 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold">
          <div className="container-custom flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span>आज: 7 अप्रैल 2026</span>
              <span className="hidden md:inline opacity-30">|</span>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-gold">☀️</span>
                <span>नई दिल्ली: 32°C</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold transition-all"><Youtube size={14} /></a>
              <a href="#" className="hover:text-gold transition-all"><Instagram size={14} /></a>
              <a href="#" className="hover:text-gold transition-all"><Twitter size={14} /></a>
            </div>
          </div>
        </div>
        
        <div className="py-6 md:py-8">
          <div className="container-custom flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
              <Menu size={24} className="text-maroon" />
            </motion.div>
            
            <div className="text-center group cursor-pointer">
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-maroon text-5xl md:text-7xl leading-none mb-1 font-hindi tracking-tighter"
              >
                न्यूज़ पोटली
              </motion.h1>
              <div className="text-xs uppercase tracking-[0.5em] text-charcoal/40 font-bold group-hover:text-gold transition-colors">
                News Potli
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-3 bg-maroon/5 px-4 py-2 rounded-full border border-maroon/5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-maroon/60">Live: मंडी भाव</span>
              </div>
              <Search size={20} className="text-maroon hidden md:block cursor-pointer hover:scale-110 transition-transform" />
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(200,134,10,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-white px-6 py-2 rounded-full text-sm font-bold shadow-premium"
              >
                सहयोग करें
              </motion.button>
            </div>
          </div>
        </div>
        
        <nav className="bg-white/50 border-t border-maroon/5 py-4 overflow-x-auto no-scrollbar">
          <div className="container-custom">
            <ul className="flex justify-between items-center min-w-[900px] md:min-w-0">
              {["खेती किसानी", "मौसम बेमौसम", "पशुपालन", "साक्षात्कार", "बाज़ार", "ग्राउन्ड रिपोर्ट्स", "कमाई वाली बात"].map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a href="#" className="font-hindi font-bold text-lg text-charcoal/60 hover:text-maroon relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </nav>
      </motion.header>

      {/* SECTION 1: BREAKING NEWS - FLOATING TICKER */}
      <div className="bg-maroon py-3 relative overflow-hidden shadow-2xl">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-maroon to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-maroon to-transparent z-10" />
        <div className="flex whitespace-nowrap animate-ticker">
          {[
            "🌾 गेहूं की सरकारी खरीद में 15% का उछाल",
            "🌦️ उत्तर भारत में अगले 48 घंटों में हल्की बारिश",
            "🐄 डेयरी फार्मिंग के लिए नई सब्सिडी योजना",
            "🚜 ट्रैक्टर बाजार में आई मंदी",
            "🍎 हिमाचल के सेब बागवानों के लिए नई नीति"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mx-12">
              <span className="w-2 h-2 bg-gold organic-shape" />
              <span className="text-cream font-hindi font-bold text-lg">{item}</span>
            </div>
          ))}
          {/* Duplicate for loop */}
          {[
            "🌾 गेहूं की सरकारी खरीद में 15% का उछाल",
            "🌦️ उत्तर भारत में अगले 48 घंटों में हल्की बारिश",
            "🐄 डेयरी फार्मिंग के लिए नई सब्सिडी योजना",
            "🚜 ट्रैक्टर बाजार में आई मंदी",
            "🍎 हिमाचल के सेब बागवानों के लिए नई नीति"
          ].map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4 mx-12">
              <span className="w-2 h-2 bg-gold organic-shape" />
              <span className="text-cream font-hindi font-bold text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: HERO - MAGAZINE COVER STYLE */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Featured Story */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 relative group"
            >
              <div className="absolute -left-10 -top-10 text-[200px] text-maroon/5 font-display italic pointer-events-none select-none">
                Story
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-gold text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Special Report
                  </span>
                  <span className="text-charcoal/40 text-xs font-bold uppercase tracking-widest">
                    12 Mins Read
                  </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-hindi font-black text-charcoal leading-[1.1] mb-8 text-balance group-hover:text-maroon transition-colors duration-700">
                  बुंदेलखंड के सूखे खेतों में <span className="text-gold italic font-display">काला सोना</span> उगा रहे हैं ये युवा किसान
                </h2>

                <div className="mb-12 rounded-[3rem] overflow-hidden shadow-premium-lg aspect-[16/9] relative group/hero">
                  <img 
                    src="https://picsum.photos/seed/farming/1200/800" 
                    alt="Farming in Bundelkhand" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                  <div>
                    <p className="text-xl text-charcoal/70 leading-relaxed mb-8 font-medium drop-cap">
                      परंपरागत खेती छोड़ अब किसान औषधीय पौधों की ओर रुख कर रहे हैं। कम पानी और ज्यादा मुनाफे वाली इस खेती ने बदली इलाके की तस्वीर। बुंदेलखंड के कई जिलों में अब किसान पारंपरिक फसलों के बजाय औषधीय खेती को प्राथमिकता दे रहे हैं।
                    </p>
                    <div 
                      className="flex items-center gap-4 cursor-pointer group/author"
                      onClick={() => setSelectedAuthor(AUTHORS.arvind)}
                    >
                      <div className="w-14 h-14 rounded-full bg-maroon p-1 shadow-xl group-hover/author:scale-110 transition-transform">
                        <div className="w-full h-full rounded-full border-2 border-cream/20 flex items-center justify-center text-cream font-hindi font-bold text-xl">
                          अ
                        </div>
                      </div>
                      <div>
                        <div className="font-hindi font-bold text-lg group-hover/author:text-maroon transition-colors">अरविंद शुक्ला</div>
                        <div className="text-xs uppercase tracking-widest text-charcoal/40 font-bold">Chief Correspondent</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <motion.button 
                      whileHover={{ x: 10 }}
                      className="group flex items-center justify-between bg-maroon text-cream px-8 py-4 rounded-xl font-bold text-lg shadow-premium hover:shadow-maroon/30 transition-all"
                    >
                      पूरी खबर पढ़ें
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                    <div className="flex gap-4">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                        <MessageCircle size={18} /> WhatsApp
                      </button>
                      <button className="w-14 h-14 flex items-center justify-center border border-maroon/10 rounded-xl hover:bg-maroon hover:text-cream transition-all">
                        <Bookmark size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Editorial Picks */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="glass-card p-8 rounded-3xl border-maroon/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 organic-shape -translate-y-1/2 translate-x-1/2" />
                <h3 className="editorial-title text-3xl text-maroon mb-8">Editorial Picks</h3>
                
                <div className="space-y-8">
                  {[
                    { cat: "बाज़ार", title: "सरसों के तेल की कीमतों में गिरावट, क्या है वजह?", time: "2h ago", color: "bg-maroon" },
                    { cat: "खेती", title: "ड्रैगन फ्रूट की खेती: एक एकड़ में 5 लाख की कमाई", time: "4h ago", color: "bg-forest-green" },
                    { cat: "मौसम", title: "मानसून 2026: अल-नीनो का असर कम होने की उम्मीद", time: "6h ago", color: "bg-gold" }
                  ].map((story, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="group cursor-pointer relative pl-6"
                    >
                      <div className={`absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full ${story.color} group-hover:scale-150 transition-transform`} />
                      <div className="text-[10px] uppercase tracking-widest text-charcoal/40 font-black mb-1">{story.cat} • {story.time}</div>
                      <h4 className="font-hindi font-bold text-lg leading-snug group-hover:text-maroon transition-colors">{story.title}</h4>
                    </motion.div>
                  ))}
                </div>

                <button className="w-full mt-10 py-4 border-t border-maroon/5 text-maroon font-bold text-sm uppercase tracking-widest hover:text-gold transition-colors">
                  View All Stories
                </button>
              </div>

              <div className="bg-maroon p-8 rounded-3xl text-cream relative overflow-hidden shadow-premium">
                <Quote className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                <p className="font-hindi text-xl leading-relaxed mb-6 italic">
                  "खेती सिर्फ पेट भरने का साधन नहीं, यह हमारी संस्कृति और भविष्य की नींव है।"
                </p>
                <div className="text-sm font-bold uppercase tracking-widest text-gold">
                  — राम शरण, प्रगतिशील किसान
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: MANDI RATES - UTILITY STRIP */}
      <section className="bg-white border-y border-maroon/5 py-10 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 flex items-center gap-4">
              <div className="w-12 h-12 bg-maroon rounded-full flex items-center justify-center text-cream shadow-lg">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-maroon">Live Update</div>
                <div className="font-hindi font-bold text-lg">आज के मंडी भाव</div>
              </div>
            </div>
            
            <div className="flex-grow overflow-hidden mask-fade-edges">
              <div className="flex whitespace-nowrap animate-ticker py-2">
                {[
                  { crop: "गेहूं", rate: "₹2,275", change: "+15", up: true },
                  { crop: "सरसों", rate: "₹5,450", change: "-25", up: false },
                  { crop: "धान (बासमती)", rate: "₹4,100", change: "+50", up: true },
                  { crop: "मक्का", rate: "₹1,950", change: "0", up: true },
                  { crop: "सोयाबीन", rate: "₹4,800", change: "+20", up: true },
                  { crop: "चना", rate: "₹5,150", change: "-10", up: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 mx-8 bg-cream-dark/30 px-6 py-3 rounded-2xl border border-maroon/5">
                    <span className="font-hindi font-bold text-charcoal">{item.crop}</span>
                    <span className="font-bold text-maroon">{item.rate}</span>
                    <span className={`text-[10px] font-black ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                      {item.up ? '▲' : '▼'} {item.change}
                    </span>
                  </div>
                ))}
                {/* Duplicate for loop */}
                {[
                  { crop: "गेहूं", rate: "₹2,275", change: "+15", up: true },
                  { crop: "सरसों", rate: "₹5,450", change: "-25", up: false },
                  { crop: "धान (बासमती)", rate: "₹4,100", change: "+50", up: true },
                  { crop: "मक्का", rate: "₹1,950", change: "0", up: true },
                  { crop: "सोयाबीन", rate: "₹4,800", change: "+20", up: true },
                  { crop: "चना", rate: "₹5,150", change: "-10", up: false }
                ].map((item, i) => (
                  <div key={`dup-${i}`} className="flex items-center gap-6 mx-8 bg-cream-dark/30 px-6 py-3 rounded-2xl border border-maroon/5">
                    <span className="font-hindi font-bold text-charcoal">{item.crop}</span>
                    <span className="font-bold text-maroon">{item.rate}</span>
                    <span className={`text-[10px] font-black ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                      {item.up ? '▲' : '▼'} {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="flex-shrink-0 text-maroon font-bold text-sm uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-2">
              All Markets <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR SERIES - HORIZONTAL FILMSTRIP */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom mb-16 flex justify-between items-end">
          <div>
            <h2 className="editorial-title text-5xl text-maroon mb-2">Our Series</h2>
            <div className="font-hindi font-bold text-xl text-charcoal/40">हमारी विशेष श्रृंखलाएं</div>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-maroon/10 flex items-center justify-center hover:bg-maroon hover:text-cream transition-all">
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-maroon/10 flex items-center justify-center hover:bg-maroon hover:text-cream transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-10 px-10 md:px-20 overflow-x-auto no-scrollbar pb-10">
          {[
            { id: "seed1", icon: "🚜", name: "मशीन की बात", count: "12 Episodes", color: "bg-gold/10", img: "tractor" },
            { id: "seed2", icon: "🌱", name: "मिट्टी का लाल", count: "08 Episodes", color: "bg-maroon/5", img: "soil" },
            { id: "seed3", icon: "💧", name: "बूंद-बूंद बचत", count: "15 Episodes", color: "bg-forest-green/5", img: "water" },
            { id: "seed4", icon: "🐝", name: "मधु क्रांति", count: "10 Episodes", color: "bg-gold/10", img: "honey" },
            { id: "seed5", icon: "🌽", name: "देसी बीज", count: "20 Episodes", color: "bg-maroon/5", img: "seeds" },
            { id: "seed6", icon: "🐄", name: "पशु धन", count: "14 Episodes", color: "bg-forest-green/5", img: "cow" }
          ].map((series, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -20 }}
              className="w-72 flex-shrink-0 group cursor-pointer"
            >
              <div className={`aspect-[4/5] ${series.color} rounded-[40px] mb-8 flex items-center justify-center text-9xl transition-all group-hover:shadow-premium-lg relative overflow-hidden`}>
                <img 
                  src={`https://picsum.photos/seed/${series.img}/400/500`} 
                  alt={series.name} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.span className="relative z-10" whileHover={{ scale: 1.2, rotate: 5 }}>{series.icon}</motion.span>
              </div>
              <h3 className="font-hindi font-black text-2xl mb-2 group-hover:text-maroon transition-colors">{series.name}</h3>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/40">
                <Play size={12} className="text-gold" /> {series.count}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: BENTO GRID REPORTS */}
      <section className="section-padding bg-cream-dark/30 relative">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 className="editorial-title text-5xl text-maroon text-center md:text-left">The Ground Reports</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="btn-premium btn-maroon"
            >
              Explore All Reports
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
            {/* Main Feature */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 md:row-span-2 bg-white rounded-[40px] overflow-hidden shadow-premium group relative cursor-pointer card-premium border-none p-0"
            >
              <div className="absolute inset-0 bg-maroon/5 group-hover:bg-maroon/0 transition-colors z-10" />
              <div className="h-full flex flex-col">
                <div className="flex-grow bg-cream-dark relative overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/paddy/800/600" 
                    alt="Paddy Farming" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[150px] pointer-events-none">
                    🌾
                  </div>
                </div>
                <div className="p-10 bg-white relative z-20">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-maroon text-cream px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Exclusive</span>
                    <span className="text-charcoal/40 text-xs font-bold">15 April 2026</span>
                  </div>
                  <h3 className="text-3xl font-hindi font-black mb-4 leading-tight group-hover:text-maroon transition-colors">पराली नहीं, अब कमाई का जरिया बनी धान की डंठल</h3>
                  <p className="text-charcoal/60 line-clamp-2 text-lg">पंजाब के इस जिले के किसानों ने मिलकर बनाया ऐसा मॉडल जिससे पराली जलाने की समस्या खत्म हुई और खाद की बिक्री से लाखों कमाए।</p>
                </div>
              </div>
            </motion.div>

            {/* Secondary Stories */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 bg-maroon rounded-[40px] p-10 text-cream flex flex-col justify-between group cursor-pointer shadow-premium card-premium border-none"
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-3xl">🍅</div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
              <div>
                <span className="text-gold text-[10px] font-black uppercase tracking-widest mb-4 block">Market Analysis</span>
                <h3 className="text-3xl font-hindi font-black mb-4 group-hover:text-gold transition-colors">टमाटर की खेती में घाटा? जानिए सही समय पर बुवाई का गणित</h3>
                <div className="flex items-center gap-4 text-sm font-bold text-cream/40">
                  <span>By Sunil Chaudhary</span>
                  <span>•</span>
                  <span>8 Mins</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-gold rounded-[40px] p-8 text-white flex flex-col justify-between group cursor-pointer shadow-premium card-premium border-none"
            >
              <div className="text-4xl">🍯</div>
              <h3 className="text-xl font-hindi font-black leading-tight group-hover:translate-y-[-5px] transition-transform">शहद उत्पादन: छोटे किसानों के लिए वरदान</h3>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-white rounded-[40px] p-8 border border-maroon/5 flex flex-col justify-between group cursor-pointer shadow-premium card-premium border-none"
            >
              <div className="text-4xl">🐄</div>
              <h3 className="text-xl font-hindi font-black leading-tight text-maroon group-hover:translate-y-[-5px] transition-transform">गिर गाय की नस्ल सुधार तकनीक</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: POTLI PRIME - CINEMATIC DARK MODE */}
      <section className="section-padding bg-charcoal text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-gold)_0%,transparent_70%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="editorial-title text-6xl text-gold mb-4 flex items-center justify-center md:justify-start gap-4">
                Potli Prime <Play className="fill-gold" size={40} />
              </h2>
              <p className="text-cream/40 font-hindi font-bold text-xl tracking-widest">सिनेमैटिक कृषि पत्रकारिता</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="px-10 py-4 bg-gold text-charcoal font-black rounded-full shadow-[0_0_50px_rgba(200,134,10,0.3)]"
            >
              Subscribe Now
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="lg:col-span-8 aspect-video bg-black rounded-[40px] relative group overflow-hidden shadow-premium-lg border border-white/10"
            >
              <img 
                src="https://picsum.photos/seed/organic/1200/675" 
                alt="Organic Farming Guide" 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="w-32 h-32 bg-gold text-charcoal rounded-full flex items-center justify-center pl-2 cursor-pointer shadow-[0_0_60px_rgba(200,134,10,0.5)]"
                >
                  <Play fill="currentColor" size={48} />
                </motion.div>
              </div>
              <div className="absolute bottom-10 left-10 z-20">
                <span className="bg-maroon text-cream px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Featured Video</span>
                <h3 className="text-4xl font-hindi font-black text-white">जैविक खेती की शुरुआत कैसे करें? (Complete Guide)</h3>
              </div>
            </motion.div>

            <div className="lg:col-span-4 space-y-6">
              {[
                { title: "मशरूम फार्मिंग से महीने की 50 हजार कमाई", meta: "22K Views • 4 Days Ago", icon: "🍄" },
                { title: "सोलर पंप योजना 2026: आवेदन प्रक्रिया", meta: "45K Views • 1 Week Ago", icon: "☀️" },
                { title: "ड्रोन से छिड़काव: समय और पैसे की बचत", meta: "12K Views • 2 Weeks Ago", icon: "🚁" }
              ].map((video, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex gap-6 p-4 rounded-3xl cursor-pointer transition-all border border-transparent hover:border-white/10"
                >
                  <div className="w-32 aspect-video bg-white/5 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {video.icon}
                  </div>
                  <div>
                    <h5 className="text-lg font-hindi font-bold mb-2 leading-tight group-hover:text-gold">{video.title}</h5>
                    <div className="text-[10px] font-black uppercase tracking-widest text-cream/30">{video.meta}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: IN-DEPTH - EDITORIAL GRID */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="editorial-title text-6xl text-maroon mb-4">Deep Stories</h2>
            <div className="font-hindi font-bold text-2xl text-charcoal/30">गहरी खबरें और विश्लेषण</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { id: "rajesh", icon: "📉", cat: "विश्लेषण", title: "क्या न्यूनतम समर्थन मूल्य (MSP) ही किसानों की हर समस्या का हल है?", excerpt: "एक विस्तृत रिपोर्ट जो एमएसपी के अर्थशास्त्र और जमीनी हकीकत के बीच के अंतर को समझाती है।", author: "राजेश कुमार", time: "7 Min", img: "economy" },
              { id: "meenakshi", icon: "🌍", cat: "जलवायु", title: "बदलते मौसम का चक्र: भारतीय कृषि के लिए कितनी बड़ी चुनौती?", excerpt: "वैज्ञानिकों and किसानों की राय के साथ एक विशेष रिपोर्ट जो भविष्य की खेती की ओर इशारा करती है।", author: "मीनाक्षी", time: "10 Min", img: "climate" },
              { id: "sanjay", icon: "💰", cat: "नीति", title: "कृषि बजट 2026: क्या उम्मीदें पूरी हुईं?", excerpt: "बजट के आंकड़ों का सरल भाषा में विश्लेषण और किसानों पर इसके सीधे असर की जानकारी।", author: "संजय सिंह", time: "6 Min", img: "budget" }
            ].map((story, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-pointer card-premium border-none p-0 bg-transparent shadow-none hover:shadow-none hover:translate-y-0"
              >
                <div className="aspect-[3/4] bg-cream-dark rounded-[60px] mb-8 flex items-center justify-center text-9xl group-hover:scale-[1.02] transition-transform duration-700 shadow-premium overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/${story.img}/600/800`} 
                    alt={story.title} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{story.icon}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-4 block">{story.cat} • {story.time} Read</span>
                <h3 className="text-2xl font-hindi font-black mb-4 leading-tight group-hover:text-maroon transition-colors">{story.title}</h3>
                <p className="text-charcoal/50 leading-relaxed mb-6 line-clamp-3">{story.excerpt}</p>
                <div 
                  className="flex items-center gap-4 group/author"
                  onClick={() => setSelectedAuthor(AUTHORS[story.id])}
                >
                  <div className="w-10 h-10 rounded-full bg-maroon flex items-center justify-center text-cream font-bold text-xs group-hover/author:scale-110 transition-transform">
                    {story.author[0]}
                  </div>
                  <span className="font-bold text-sm text-charcoal/80 group-hover/author:text-maroon transition-colors">{story.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TRUSTED BY - MARQUEE */}
      <section className="py-20 bg-cream-dark/20 border-y border-maroon/5 overflow-hidden">
        <div className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/30 mb-12">Trusted By & Featured In</div>
        <div className="flex whitespace-nowrap animate-ticker mask-fade-edges">
          {[
            "World Bank", "BCG", "Jain Irrigation", "Escorts Kubota", "IFFCO", "2030 Water Resource Group", "SESI", "Amal Farms"
          ].map((partner, i) => (
            <div key={i} className="flex items-center gap-10 mx-10">
              <span className="text-2xl font-display italic font-black text-charcoal/20 hover:text-maroon transition-colors cursor-default">
                {partner}
              </span>
              <span className="w-2 h-2 bg-gold organic-shape opacity-20" />
            </div>
          ))}
          {/* Duplicate for loop */}
          {[
            "World Bank", "BCG", "Jain Irrigation", "Escorts Kubota", "IFFCO", "2030 Water Resource Group", "SESI", "Amal Farms"
          ].map((partner, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-10 mx-10">
              <span className="text-2xl font-display italic font-black text-charcoal/20 hover:text-maroon transition-colors cursor-default">
                {partner}
              </span>
              <span className="w-2 h-2 bg-gold organic-shape opacity-20" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: NEWSLETTER - MINIMALIST STRIP */}
      <section className="bg-maroon py-12 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 bg-gold/10 organic-shape -translate-x-1/2 -translate-y-1/2" />
        <div className="container-custom relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-hindi font-black text-cream mb-2">किसानों की आवाज़, हर महीने आपके inbox में</h2>
            <p className="text-cream/40 text-sm font-bold uppercase tracking-widest">Join 50,000+ Progressive Farmers</p>
          </div>
          <div className="flex w-full lg:w-auto gap-4">
            <input 
              type="email" 
              placeholder="आपका ईमेल पता..." 
              className="flex-grow lg:w-96 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-cream placeholder:text-cream/30 outline-none focus:bg-white/20 transition-all"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-white px-10 py-4 rounded-2xl font-black shadow-lg"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </section>

      {/* FOOTER - ARCHITECTURAL DESIGN */}
      <footer className="bg-charcoal text-cream pt-32 pb-10 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
            <div className="lg:col-span-5">
              <h2 className="text-7xl font-hindi font-black text-maroon leading-none mb-6">न्यूज़ पोटली</h2>
              <p className="text-cream/40 text-xl font-hindi font-bold mb-10 leading-relaxed">
                भारत के गाँव और किसान की आवाज़। हम कृषि पत्रकारिता के माध्यम से ग्रामीण भारत की कहानियों को दुनिया तक पहुँचाते हैं।
              </p>
              <div className="flex gap-6">
                {[Youtube, Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, color: "#C8860A" }}
                    href="#" 
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-gold text-xs font-black uppercase tracking-[0.3em] mb-10">Platform</h4>
              <ul className="space-y-6 text-lg font-bold">
                {["About Us", "Our Team", "Pitch Story", "Privacy", "Terms"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-cream/60 hover:text-gold transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <h4 className="text-gold text-xs font-black uppercase tracking-[0.3em] mb-10">Direct Contact</h4>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="नाम" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-white/5 border ${formErrors.name ? 'border-red-500' : 'border-white/5'} rounded-2xl p-4 text-sm focus:border-gold outline-none transition-all`} 
                  />
                  {formErrors.name && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.name}</span>}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="संपर्क (वैकल्पिक)" 
                    value={formData.contact}
                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm focus:border-gold outline-none transition-all" 
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <input 
                    type="email" 
                    placeholder="ईमेल" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/5'} rounded-2xl p-4 text-sm focus:border-gold outline-none transition-all`} 
                  />
                  {formErrors.email && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.email}</span>}
                </div>
                <div className="md:col-span-2 relative">
                  <textarea 
                    placeholder="आपका संदेश..." 
                    rows={4} 
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-white/5 border ${formErrors.message ? 'border-red-500' : 'border-white/5'} rounded-2xl p-4 text-sm focus:border-gold outline-none transition-all resize-none`}
                  ></textarea>
                  {formErrors.message && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.message}</span>}
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  disabled={isSubmitting}
                  className={`md:col-span-2 ${submitSuccess ? 'bg-green-600' : 'bg-gold'} text-charcoal font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-colors`}
                >
                  {isSubmitting ? "भेजा जा रहा है..." : submitSuccess ? "संदेश प्राप्त हुआ!" : "संदेश भेजें"}
                  {!isSubmitting && !submitSuccess && <ArrowRight size={18} />}
                </motion.button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-cream/20">
            <div>© 2026 News Potli. Crafted for Rural India.</div>
            <div className="flex gap-10 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold transition-colors">English Edition</a>
              <a href="#" className="hover:text-gold transition-colors">Hindi Edition</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
