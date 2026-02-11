import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full px-6 py-3.5 transition-all duration-700 ${
        scrolled ? "glass-nav-scrolled shadow-lg" : "glass-nav"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo with floating animation */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Crown className="w-8 h-8 text-gold drop-shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </motion.div>
          <span className="font-display text-xl font-bold text-gold-gradient hidden sm:inline">
            Swarna Suraksha
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, hsl(43 80% 52%), hsl(38 72% 38%), hsl(43 80% 52%))' }}
              />
            </a>
          ))}
        </div>

        {/* Login CTA */}
        <div className="hidden md:block">
          <button className="btn-gold text-sm px-7 py-2.5">Login</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col items-center gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-base text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="btn-gold text-sm px-7 py-2.5 mt-2">Login</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
