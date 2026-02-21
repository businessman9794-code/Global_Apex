import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate
} from 'react-router-dom';
import { 
  Truck, 
  Ship, 
  Plane, 
  Package, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  Search,
  Star,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Database,
  Eye,
  Lock,
  User,
  LogOut,
  RefreshCcw,
  ExternalLink,
  Zap,
  Award,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Logo = ({ className = "", scrolled = false }: { className?: string, scrolled?: boolean }) => (
  <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
    <div className="relative">
      <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-gold/20">
        <Globe className="text-navy w-7 h-7" />
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-navy rounded-full border-2 border-white flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
      </div>
    </div>
    <div className="flex flex-col">
      <span className={cn(
        "text-xl font-serif font-black tracking-tighter leading-none transition-colors duration-500",
        "text-white"
      )}>
        GLOBAL <span className="text-gold">APEX</span>
      </span>
      <span className={cn(
        "text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 transition-colors duration-500",
        "text-slate-300"
      )}>
        Logistics Solutions
      </span>
    </div>
  </div>
);

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const ScrollReveal = ({ children, delay = 0 }: { children: ReactNode, delay?: number, key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Tracking', path: '/tracking' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-700",
      isScrolled 
        ? "bg-navy/95 backdrop-blur-xl py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-white/5" 
        : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo scrolled={true} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-bold tracking-widest transition-all duration-300 relative group uppercase",
                  location.pathname === link.path 
                    ? "text-gold" 
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path && "w-full"
                )} />
              </Link>
            ))}
            <Link to="/quote" className="btn-gold py-3 px-8 text-xs">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors",
              "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[101] lg:hidden bg-navy flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <Logo scrolled={true} />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl font-serif font-bold transition-colors",
                      location.pathname === link.path ? "text-gold" : "text-white/60 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10">
              <Link 
                to="/quote" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-gold w-full text-xl py-6"
              >
                Request a Quote
              </Link>
              <div className="flex justify-center gap-6 mt-12 text-white/40">
                <Facebook /> <Twitter /> <Instagram /> <Linkedin />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Logo scrolled={true} />
            <p className="text-slate-400 leading-relaxed text-lg">
              Redefining global logistics through precision, technology, and an unwavering commitment to excellence. Your cargo, our mission.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-500 group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-10">Navigation</h4>
            <ul className="space-y-5">
              {['Home', 'Services', 'Tracking', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-slate-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-10">Our Expertise</h4>
            <ul className="space-y-5">
              {['Air Freight', 'Ocean Cargo', 'Land Logistics', 'Warehousing', 'Customs'].map(item => (
                <li key={item} className="text-slate-400 hover:text-gold cursor-pointer transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-10">Headquarters</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-gold shrink-0" size={24} />
                <span className="text-slate-400 leading-relaxed">123 Logistics Plaza, Financial District, New York, NY 10005</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-gold shrink-0" size={20} />
                <span className="text-slate-400">+1 (800) GLOBAL-APEX</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-gold shrink-0" size={20} />
                <span className="text-slate-400">concierge@globalapex.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium">
          <p>© 2026 Global Apex Logistics. Crafted for Excellence.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <Link to="/admin-portal" className="text-slate-700 hover:text-gold transition-colors">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  const [trackingNum, setTrackingNum] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (trackingNum) navigate(`/tracking?id=${trackingNum}`);
  };

  return (
    <PageTransition>
      {/* Creative Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            src="https://picsum.photos/seed/logistics-pro/1920/1080" 
            className="w-full h-full object-cover"
            alt="Hero"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="section-subtitle">The Future of Freight</span>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.05]">
                Global Reach, <br />
                <span className="text-gold italic">Apex Precision.</span>
              </h1>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl">
                We orchestrate the world's most complex supply chains with effortless ease. Experience logistics redefined for the modern era.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-16">
                <Link to="/quote" className="btn-gold group">
                  Start Shipping <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/services" className="btn-outline">
                  Our Capabilities
                </Link>
              </div>

              {/* Premium Tracking Bar */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onSubmit={handleTrack} 
                className="bg-white/10 backdrop-blur-2xl p-2 rounded-3xl border border-white/20 flex flex-col sm:flex-row items-center max-w-2xl shadow-2xl"
              >
                <div className="flex-1 flex items-center px-6 py-4 w-full">
                  <Search className="text-gold mr-4" size={24} />
                  <input 
                    type="text" 
                    placeholder="Enter Tracking ID (e.g., GAL-123456)"
                    className="w-full bg-transparent focus:outline-none text-white font-bold placeholder:text-white/40 text-lg"
                    value={trackingNum}
                    onChange={(e) => setTrackingNum(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full sm:w-auto bg-gold text-navy px-10 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-white transition-all duration-500">
                  Track Now
                </button>
              </motion.form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden border-8 border-white/10 shadow-2xl">
                <img src="https://picsum.photos/seed/cargo/800/1000" className="w-full aspect-[4/5] object-cover" alt="Cargo" referrerPolicy="no-referrer" />
              </div>
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass-card p-8 rounded-3xl z-20 max-w-[240px] border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    <ShieldCheck size={28} />
                  </div>
                  <div className="font-bold text-white">100% Secure</div>
                </div>
                <p className="text-sm text-slate-400">Every shipment is insured and tracked in real-time.</p>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl z-20 max-w-[240px]"
              >
                <div className="text-4xl font-black text-gold mb-2">2.5M+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-navy/40">Annual Deliveries</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creative Process Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-24">
              <span className="section-subtitle">How it Works</span>
              <h2 className="section-title text-white">Seamless Logistics <br />in 4 Simple Steps</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Search, title: 'Request Quote', desc: 'Provide details about your cargo and destination.' },
              { icon: Package, title: 'Secure Pickup', desc: 'Our team collects your items with premium care.' },
              { icon: Globe, title: 'Global Transit', desc: 'Your cargo moves through our optimized network.' },
              { icon: CheckCircle2, title: 'Final Delivery', desc: 'Safe and timely arrival at the doorstep.' }
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative group">
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] shadow-xl flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                    <step.icon size={40} className="text-gold group-hover:text-navy" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gold text-navy rounded-full flex items-center justify-center font-black text-xl">
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 border-t-2 border-dashed border-white/10 -z-10" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-navy relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-24">
              <span className="section-subtitle">Our Expertise</span>
              <h2 className="section-title">World-Class Solutions</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
                We provide a comprehensive suite of logistics services tailored to the demands of a global economy.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Air Freight',
                desc: 'Priority air cargo services for time-critical shipments across all continents.',
                icon: Plane,
                color: 'bg-blue-500/10 text-blue-400'
              },
              {
                title: 'Ocean Cargo',
                desc: 'Scalable sea transport solutions for massive volumes and heavy industrial goods.',
                icon: Ship,
                color: 'bg-emerald-500/10 text-emerald-400'
              },
              {
                title: 'Land Logistics',
                desc: 'Intelligent road and rail networks ensuring seamless last-mile delivery.',
                icon: Truck,
                color: 'bg-orange-500/10 text-orange-400'
              }
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="group p-12 rounded-[3rem] border border-white/5 hover:border-gold/20 hover:shadow-2xl transition-all duration-700 bg-white/5 backdrop-blur-sm relative overflow-hidden">
                  <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:rotate-[10deg] transition-all duration-500", service.color)}>
                    <service.icon size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-white">{service.title}</h3>
                  <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                    {service.desc}
                  </p>
                  <Link to="/services" className="flex items-center text-gold font-black uppercase tracking-tighter group-hover:gap-4 transition-all">
                    Explore Service <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal>
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight">
                Built on Trust, <br />
                <span className="text-gold">Driven by Tech.</span>
              </h2>
              <div className="space-y-10">
                {[
                  { title: 'AI-Powered Routing', desc: 'Our proprietary algorithms find the fastest, most efficient paths for your cargo.' },
                  { title: 'Global Compliance', desc: 'Expert handling of international regulations and customs documentation.' },
                  { title: 'Sustainability First', desc: 'Committed to reducing our carbon footprint through green logistics initiatives.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                      <CheckCircle2 size={28} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative">
                <div className="rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/5">
                  <img src="https://picsum.photos/seed/tech/800/1000" className="w-full object-cover" alt="Tech" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-12 -right-12 glass-card p-12 rounded-[3rem] shadow-2xl hidden md:block max-w-sm">
                  <div className="flex gap-2 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#C5A028" className="text-gold" />)}
                  </div>
                  <p className="text-white font-serif text-2xl italic leading-relaxed mb-6">
                    "Global Apex transformed our supply chain. Their precision is unmatched."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <Users size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-white">Marcus Thorne</div>
                      <div className="text-xs font-bold text-gold uppercase tracking-widest">Director, AeroSpace Int.</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-navy relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="bg-slate-900/50 border border-white/5 backdrop-blur-xl rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20">
                <Globe className="w-full h-full scale-150 rotate-12 text-gold" />
              </div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-bold text-white mb-10 leading-tight">
                  Ready to Elevate <br />
                  <span className="text-gold">Your Logistics?</span>
                </h2>
                <p className="text-slate-400 text-2xl mb-16 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of global brands that trust us with their most critical shipments.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  <Link to="/quote" className="btn-gold text-xl py-6 px-16">
                    Get an Instant Quote
                  </Link>
                  <Link to="/contact" className="btn-outline text-xl py-6 px-16">
                    Talk to an Expert
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
};

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="pt-48 pb-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <ScrollReveal>
              <span className="section-subtitle">Our Story</span>
              <h1 className="section-title text-white">A Legacy of <br /><span className="text-gold">Excellence</span></h1>
              <p className="text-slate-400 text-xl mb-8 leading-relaxed">
                Founded in 2010, Global Apex Logistics emerged from a vision to bridge the gap between complex global markets and business efficiency. We believe that logistics should be invisible—a seamless flow that powers growth.
              </p>
              <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                From our first local delivery to managing multi-continental supply chains, our core philosophy remains the same: Precision, Integrity, and Innovation.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div className="p-10 bg-white/5 backdrop-blur-md rounded-[2rem] border-l-8 border-gold shadow-lg">
                  <div className="text-5xl font-black text-white mb-2">150+</div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Countries Served</div>
                </div>
                <div className="p-10 bg-white/5 backdrop-blur-md rounded-[2rem] border-l-8 border-gold shadow-lg">
                  <div className="text-5xl font-black text-white mb-2">1.2k</div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Expert Staff</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="relative">
                <img src="https://picsum.photos/seed/about/800/1000" className="rounded-[4rem] shadow-2xl border-4 border-white/5" alt="About" referrerPolicy="no-referrer" />
                <div className="absolute -bottom-10 -left-10 bg-gold p-12 rounded-[3rem] shadow-2xl text-navy">
                  <div className="text-6xl font-black mb-2">16</div>
                  <div className="text-sm font-bold uppercase tracking-[0.3em]">Years of Innovation</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const ServicesPage = () => {
  return (
    <PageTransition>
      <div className="pt-48 pb-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24">
            <ScrollReveal>
              <span className="section-subtitle">Our Capabilities</span>
              <h1 className="section-title text-white">Comprehensive <span className="text-gold">Solutions</span></h1>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">Tailored logistics strategies for every industry and scale.</p>
            </ScrollReveal>
          </div>

          <div className="space-y-32">
            {[
              {
                title: 'Air Freight Solutions',
                desc: 'When time is of the essence, our air freight services provide the speed you need. We partner with major airlines to ensure your cargo gets priority handling and the fastest routes available.',
                features: ['Express Delivery', 'Global Coverage', 'Temperature Controlled', 'Customs Handling'],
                image: 'https://picsum.photos/seed/plane/800/600',
                icon: Plane,
                reverse: false
              },
              {
                title: 'Ocean Freight Services',
                desc: 'For large volume shipments, our ocean freight services offer the most cost-effective solution. We handle everything from Full Container Loads (FCL) to Less than Container Loads (LCL).',
                features: ['FCL & LCL', 'Port-to-Port', 'Door-to-Door', 'Cargo Insurance'],
                image: 'https://picsum.photos/seed/ship/800/600',
                icon: Ship,
                reverse: true
              },
              {
                title: 'Road & Rail Transport',
                desc: 'Our extensive land network ensures that your cargo reaches its final destination safely. We provide reliable trucking and rail services across continents.',
                features: ['Local Delivery', 'Cross-Border', 'Heavy Haulage', 'Real-time GPS'],
                image: 'https://picsum.photos/seed/truck/800/600',
                icon: Truck,
                reverse: false
              }
            ].map((s, i) => (
              <ScrollReveal key={i}>
                <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-20 items-center", s.reverse && "lg:flex-row-reverse")}>
                  <div className={cn(s.reverse ? "lg:order-2" : "lg:order-1")}>
                    <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mb-8 text-gold">
                      <s.icon size={40} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{s.title}</h2>
                    <p className="text-slate-400 text-xl mb-10 leading-relaxed">{s.desc}</p>
                    <div className="grid grid-cols-2 gap-6">
                      {s.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-3 text-white font-bold text-lg">
                          <CheckCircle2 className="text-gold w-6 h-6" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12">
                      <Link to="/quote" className="btn-gold">Get a Quote</Link>
                    </div>
                  </div>
                  <div className={cn("relative", s.reverse ? "lg:order-1" : "lg:order-2")}>
                    <img src={s.image} alt={s.title} className="rounded-[4rem] shadow-2xl border-4 border-white/5" referrerPolicy="no-referrer" />
                    <div className="absolute -bottom-8 -right-8 glass-card p-8 rounded-[2rem] shadow-2xl hidden md:block border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="bg-gold/10 text-gold p-4 rounded-2xl">
                          <ShieldCheck size={32} />
                        </div>
                        <div>
                          <div className="text-white font-black text-lg">Secure Shipping</div>
                          <div className="text-slate-400 font-bold">Guaranteed Safety</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const TrackingPage = () => {
  const [id, setId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const trackingId = params.get('id');
    if (trackingId) {
      setId(trackingId);
      handleTrack(trackingId);
    }
  }, [location]);

  const handleTrack = async (trackingId: string) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/track/${trackingId}`);
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch tracking information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-48 pb-32 min-h-screen bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="section-subtitle">Real-Time Monitoring</span>
            <h1 className="section-title text-white">Track Shipment</h1>
            <p className="text-slate-400 text-xl">Enter your unique tracking ID for instant status updates.</p>
          </div>

          <ScrollReveal>
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-[3rem] border border-white/10 shadow-2xl mb-16 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold" size={28} />
                <input 
                  type="text" 
                  placeholder="Tracking ID (e.g. GAL-123456)"
                  className="w-full pl-16 pr-8 py-6 bg-transparent rounded-[2rem] border-none focus:ring-4 focus:ring-gold/10 text-xl font-bold text-white placeholder:text-slate-500"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <button 
                onClick={() => handleTrack(id)}
                disabled={loading}
                className="btn-gold py-6 px-12 text-xl disabled:opacity-50"
              >
                {loading ? <RefreshCcw className="animate-spin" /> : 'Track Now'}
              </button>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-10 rounded-[3rem] text-center font-bold text-xl backdrop-blur-md"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-[4rem] shadow-2xl overflow-hidden border border-white/5"
              >
                <div className="bg-white/5 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5">
                  <div>
                    <div className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Shipment Identifier</div>
                    <div className="text-4xl font-black tracking-tighter">{result.tracking_number}</div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Current Status</div>
                    <div className="bg-gold text-navy px-8 py-2 rounded-full font-black text-lg uppercase tracking-tighter">
                      {result.status}
                    </div>
                  </div>
                </div>
                
                <div className="p-12 md:p-20">
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-white/5 rounded-full" />
                    
                    <div className="space-y-20 relative">
                      {[
                        { status: result.status, location: result.location, time: result.last_updated, active: true },
                        { status: 'In Transit', location: 'International Gateway', time: '2 days ago', active: false },
                        { status: 'Processed', location: 'Origin Hub', time: '4 days ago', active: false },
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-12">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-xl transition-all duration-500",
                            step.active ? "bg-gold text-navy scale-125" : "bg-white/5 text-slate-600"
                          )}>
                            {step.active ? <Package size={24} /> : <div className="w-3 h-3 bg-white/20 rounded-full" />}
                          </div>
                          <div>
                            <h4 className={cn("text-2xl font-bold mb-2", step.active ? "text-white" : "text-slate-600")}>
                              {step.status}
                            </h4>
                            <div className="text-slate-500 font-bold mb-2 flex items-center gap-2">
                              <MapPin size={18} className="text-gold" /> {step.location}
                            </div>
                            <div className="text-slate-500 font-medium flex items-center gap-2">
                              <Clock size={16} /> {step.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-48 pb-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24">
            <span className="section-subtitle">Get in Touch</span>
            <h1 className="section-title text-white">Contact Support</h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">Our global support team is available 24/7 to assist with your logistical needs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-10">
              {[
                { icon: MapPin, title: 'Global HQ', content: '123 Logistics Plaza, New York, NY 10005' },
                { icon: Phone, title: 'Direct Line', content: '+1 (800) GLOBAL-APEX' },
                { icon: Mail, title: 'Email Concierge', content: 'concierge@globalapex.com' }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] shadow-xl flex items-start gap-8 border border-white/5 card-content-fix">
                    <div className="bg-gold/10 p-5 rounded-2xl text-gold shrink-0">
                      <item.icon size={32} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed break-all whitespace-pre-wrap">{item.content}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="lg:col-span-2">
              <ScrollReveal delay={0.3}>
                <div className="bg-white/5 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white/5">
                  <h3 className="text-4xl font-bold text-white mb-12">Send a Message</h3>
                  
                  {status.message && (
                    <div className={cn(
                      "p-8 rounded-[2rem] mb-12 font-bold text-xl",
                      status.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    )}>
                      {status.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Full Name</label>
                        <input required type="text" className="input-premium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Email Address</label>
                        <input required type="email" className="input-premium" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Subject</label>
                      <input required type="text" className="input-premium" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Message</label>
                      <textarea required rows={6} className="input-premium resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="btn-gold w-full py-6 text-xl">
                      {loading ? 'Transmitting...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const QuotePage = () => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', service: 'Air Freight', origin: '', destination: '', weight: '', message: '' 
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', service: 'Air Freight', origin: '', destination: '', weight: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-48 pb-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          <ScrollReveal>
            <div className="bg-white/5 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white/5">
              <div className="text-center mb-16">
                <span className="section-subtitle">Custom Solutions</span>
                <h1 className="section-title text-white">Request a Quote</h1>
                <p className="text-slate-400 text-xl">Provide your shipment details for a tailored logistics plan.</p>
              </div>

              {status.message && (
                <div className={cn(
                  "p-8 rounded-[2rem] mb-12 font-bold text-xl",
                  status.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                )}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Your Name</label>
                    <input required type="text" className="input-premium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Email Address</label>
                    <input required type="email" className="input-premium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Service Type</label>
                    <select className="input-premium appearance-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                      <option>Air Freight</option>
                      <option>Ocean Freight</option>
                      <option>Road Transport</option>
                      <option>Warehousing</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Approx. Weight (KG)</label>
                    <input required type="text" className="input-premium" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Origin City</label>
                    <input required type="text" className="input-premium" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Destination City</label>
                    <input required type="text" className="input-premium" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gold uppercase tracking-[0.3em] ml-2">Additional Details</label>
                  <textarea rows={4} className="input-premium resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={loading} className="btn-gold w-full py-6 text-xl">
                  {loading ? 'Calculating...' : 'Request Quote Now'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

const AdminResetPage = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('token');
    if (t) setToken(t);
  }, [location]);

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus('');
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus(data.message);
        setTimeout(() => navigate('/admin-portal'), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-48 pb-32 min-h-screen bg-navy relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 md:p-16 rounded-[4rem] w-full max-w-xl relative z-10"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gold">
              <RefreshCcw size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white">Set New Password</h1>
            <p className="text-slate-400">Secure your administrative access</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 text-red-400 rounded-2xl text-center font-bold text-sm border border-red-500/20">
              {error}
            </div>
          )}

          {status && (
            <div className="mb-8 p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-center font-bold text-sm border border-emerald-500/20">
              {status}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gold uppercase tracking-widest ml-2">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors z-10" size={20} />
                <input 
                  type="password" 
                  className="input-premium !pl-20 relative z-0"
                  placeholder="Enter new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full py-5 text-lg disabled:opacity-50">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const [contacts, setContacts] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'quotes' | 'settings'>('contacts');
  const [loading, setLoading] = useState(false);

  // Settings State
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [settingsStatus, setSettingsStatus] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.');
    }
  };

  const handleResetRequest = async (e: FormEvent) => {
    e.preventDefault();
    setResetStatus('Sending...');
    try {
      const res = await fetch('/api/admin/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      setResetStatus(data.message);
    } catch (error) {
      setResetStatus('Error sending reset link.');
    }
  };

  const handleUpdateCredentials = async (e: FormEvent) => {
    e.preventDefault();
    setSettingsStatus('Updating...');
    try {
      const res = await fetch('/api/admin/update-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUsername, newPassword })
      });
      const data = await res.json();
      setSettingsStatus(data.message);
      if (data.success) {
        setNewUsername('');
        setNewPassword('');
      }
    } catch (error) {
      setSettingsStatus('Error updating settings.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactsRes, quotesRes] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/quotes')
      ]);
      const contactsData = await contactsRes.json();
      const quotesData = await quotesRes.json();
      if (contactsData.success) setContacts(contactsData.data);
      if (quotesData.success) setQuotes(quotesData.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold-dark)_0%,_transparent_70%)] opacity-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 shadow-2xl border border-white/10 relative z-10"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gold">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white">{isForgotMode ? 'Reset Access' : 'Admin Portal'}</h1>
            <p className="text-slate-400">{isForgotMode ? 'Enter your email to receive a reset link' : 'Secure gateway for Global Apex'}</p>
          </div>

          {loginError && (
            <div className="mb-8 p-4 bg-red-500/10 text-red-400 rounded-2xl text-center font-bold text-sm border border-red-500/20">
              {loginError}
            </div>
          )}

          {resetStatus && (
            <div className="mb-8 p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-center font-bold text-sm border border-emerald-500/20">
              {resetStatus}
            </div>
          )}

          {!isForgotMode ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-2">Username</label>
                <div className="relative group">
                  <User className="absolute left-7 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors z-10" size={20} />
                  <input 
                    type="text" 
                    className="input-premium !pl-20 relative z-0"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors z-10" size={20} />
                  <input 
                    type="password" 
                    className="input-premium !pl-20 relative z-0"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn-gold w-full py-5 text-lg">
                Authorize Access
              </button>
              <button 
                type="button" 
                onClick={() => setIsForgotMode(true)}
                className="w-full text-center text-slate-500 hover:text-gold transition-colors text-sm font-bold"
              >
                Forgot Password?
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-2">Registered Email</label>
                <div className="relative group">
                  <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors z-10" size={20} />
                  <input 
                    type="email" 
                    className="input-premium !pl-20 relative z-0"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@globalapex.com"
                  />
                </div>
              </div>
              <button type="submit" className="btn-gold w-full py-5 text-lg">
                Send Reset Link
              </button>
              <button 
                type="button" 
                onClick={() => { setIsForgotMode(false); setResetStatus(''); }}
                className="w-full text-center text-slate-500 hover:text-gold transition-colors text-sm font-bold"
              >
                Back to Login
              </button>
            </form>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 bg-navy min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-gold-dark)_0%,_transparent_40%)] opacity-10" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Command Center</h1>
            <p className="text-slate-500 text-lg">Secure management of logistics inquiries.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="btn-gold py-3 px-8 text-xs">
              <RefreshCcw size={18} /> Sync Data
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="bg-white/5 backdrop-blur-md text-white py-3 px-8 rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10">
              <LogOut size={18} /> Terminate Session
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {[
            { id: 'contacts', label: `Inquiries (${contacts.length})` },
            { id: 'quotes', label: `Quotations (${quotes.length})` },
            { id: 'settings', label: 'Security Settings' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-10 py-4 rounded-full font-black uppercase tracking-tighter transition-all whitespace-nowrap border",
                activeTab === tab.id 
                  ? "bg-gold text-navy shadow-xl border-gold" 
                  : "bg-white/5 text-slate-500 hover:text-white border-white/5"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
          {loading ? (
            <div className="p-32 text-center">
              <RefreshCcw className="animate-spin text-gold mx-auto mb-6" size={48} />
              <p className="text-slate-500 font-bold">Synchronizing Database...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === 'contacts' && (
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gold border-b border-white/5">
                    <tr>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Received</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Sender</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Subject</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-10 py-8 text-sm text-slate-500 font-bold">{new Date(c.created_at).toLocaleDateString()}</td>
                        <td className="px-10 py-8">
                          <div className="font-black text-white text-lg">{c.name}</div>
                          <div className="text-sm text-gold font-bold">{c.email}</div>
                        </td>
                        <td className="px-10 py-8 font-bold text-slate-300">{c.subject}</td>
                        <td className="px-10 py-8 text-slate-500 max-w-sm">
                          <p className="truncate group-hover:whitespace-normal transition-all">{c.message}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'quotes' && (
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gold border-b border-white/5">
                    <tr>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Date</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Client</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Service</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Route</th>
                      <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-10 py-8 text-sm text-slate-500 font-bold">{new Date(q.created_at).toLocaleDateString()}</td>
                        <td className="px-10 py-8">
                          <div className="font-black text-white text-lg">{q.name}</div>
                          <div className="text-sm text-gold font-bold">{q.email}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter">{q.service}</span>
                        </td>
                        <td className="px-10 py-8 text-white font-black text-lg">
                          {q.origin} <ArrowRight size={16} className="inline mx-2 text-gold" /> {q.destination}
                        </td>
                        <td className="px-10 py-8 text-white font-black">{q.weight} KG</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'settings' && (
                <div className="p-12 md:p-20 max-w-2xl mx-auto">
                  <div className="text-center mb-12">
                    <ShieldCheck size={48} className="text-gold mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white">Security Credentials</h2>
                    <p className="text-slate-500">Update your administrative access details.</p>
                  </div>

                  {settingsStatus && (
                    <div className="mb-10 p-6 bg-gold/10 text-gold rounded-2xl text-center font-bold border border-gold/20">
                      {settingsStatus}
                    </div>
                  )}

                  <form onSubmit={handleUpdateCredentials} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gold uppercase tracking-widest ml-2">New Admin Username</label>
                      <input 
                        type="text" 
                        className="input-premium"
                        placeholder="Leave blank to keep current"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gold uppercase tracking-widest ml-2">New Admin Password</label>
                      <input 
                        type="password" 
                        className="input-premium"
                        placeholder="Leave blank to keep current"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full py-6 text-xl">
                      Update Security Settings
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-gold/30">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/admin-portal" element={<AdminPage />} />
              <Route path="/admin-reset" element={<AdminResetPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
