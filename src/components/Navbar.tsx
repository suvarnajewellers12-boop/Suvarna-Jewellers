import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, User, LayoutDashboard, Gem, TrendingUp, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LogoutModal from "@/components/LogoutModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  const navLinks = isLoggedIn
    ? [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Schemes", href: "/schemes" },
        { label: "Live Rates", href: "/live-rates" },
        { label: "Dashboard", href: "/dashboard" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Schemes", href: "/schemes" },
        { label: "About", href: "/about" },
        { label: "Contact Us", href: "/contact" },
      ];

  const profileMenuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Schemes", href: "/my-schemes", icon: Gem },
    { label: "Live Rates", href: "/live-rates", icon: TrendingUp },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setProfileOpen(false);
    setLogoutSuccess(true);
    setTimeout(() => {
      logout();
      navigate("/", { state: { loggedOut: true } });
      setTimeout(() => setLogoutSuccess(false), 2500);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {logoutSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, hsla(43,80%,55%,0.18) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-4 left-0 right-0 mx-auto z-50 w-[92%] max-w-[1100px] rounded-full px-6 py-3.5 transition-all duration-700 ${
          scrolled ? "glass-nav-scrolled shadow-lg" : "glass-nav"
        }`}
      >
        {/* Mobile: centered brand capsule only */}
        <div className="flex md:hidden items-center justify-center w-full">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 group">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="w-7 h-7 text-gold drop-shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </motion.div>
            <span className="font-display text-lg font-bold text-gold-gradient">
              Suvarna Jewellers
            </span>
          </button>
        </div>

        {/* Desktop: full navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 group">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="w-8 h-8 text-gold drop-shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </motion.div>
            <span className="font-display text-xl font-bold text-gold-gradient">
              Suvarna Jewellers
            </span>
          </button>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className={`relative font-body text-sm font-medium transition-colors duration-300 group py-1 ${
                  location.pathname === link.href ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-500 ${
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
                  style={{ background: 'linear-gradient(90deg, hsl(43 80% 52%), hsl(38 72% 38%), hsl(43 80% 52%))' }}
                />
              </button>
            ))}
          </div>

          <div>
            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "var(--gradient-gold)",
                      boxShadow: "var(--shadow-gold)",
                      border: "2px solid hsla(43,80%,60%,0.4)",
                    }}
                  >
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-body text-sm font-medium text-foreground/80">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute right-0 top-14 w-56 rounded-2xl overflow-hidden z-[60]"
                      style={{
                        background: "hsla(40, 28%, 97%, 0.92)",
                        backdropFilter: "blur(28px) saturate(1.5)",
                        border: "1px solid hsla(38, 60%, 60%, 0.35)",
                        boxShadow: "var(--shadow-luxury), 0 0 40px hsla(43,80%,55%,0.08)",
                      }}
                    >
                      <div className="px-5 py-4 border-b border-border/50">
                        <p className="font-display text-sm font-semibold text-foreground">{user?.name}</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{user?.phone}</p>
                      </div>
                      <div className="py-2">
                        {profileMenuItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => { navigate(item.href); setProfileOpen(false); }}
                            className="relative w-full flex items-center gap-3 px-5 py-2.5 font-body text-sm text-foreground/80 hover:text-foreground transition-all duration-300 group overflow-hidden"
                          >
                            <span
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: "linear-gradient(90deg, hsla(43,80%,55%,0.06), hsla(43,80%,55%,0.12), hsla(43,80%,55%,0.06))" }}
                            />
                            <item.icon className="w-4 h-4 text-gold relative z-10" />
                            <span className="relative z-10">{item.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-border/50 py-2">
                        <button
                          onClick={() => { setProfileOpen(false); setShowLogoutModal(true); }}
                          className="relative w-full flex items-center gap-3 px-5 py-2.5 font-body text-sm text-foreground/80 hover:text-foreground transition-all duration-300 group overflow-hidden"
                        >
                          <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(90deg, hsla(350,60%,50%,0.04), hsla(350,60%,50%,0.08), hsla(350,60%,50%,0.04))" }}
                          />
                          <LogOut className="w-4 h-4 text-gold relative z-10" />
                          <span className="relative z-10">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => navigate("/login")} className="btn-gold text-sm px-7 py-2.5">Login</button>
            )}
          </div>
        </div>
      </motion.nav>

      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar;
