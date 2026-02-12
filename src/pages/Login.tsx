import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_OTP = "123456";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setOtpSent(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered === MOCK_OTP) {
      setError("");
      setVerified(true);
      setTimeout(() => {
        login(phone);
        navigate("/dashboard");
      }, 1800);
    } else {
      setError("Invalid OTP. Try 123456");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-ivory" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-spotlight)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23b8860b' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10" style={{ boxShadow: 'var(--shadow-depth)' }}>
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center"
                style={{ boxShadow: '0 8px 30px -6px hsla(43, 80%, 50%, 0.4)' }}
                animate={verified ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {verified ? (
                    <motion.div key="unlock" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12 }}>
                      <Unlock className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div key="lock" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Lock className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
              {verified ? "Welcome!" : "Login"}
            </h2>
            <p className="font-elegant text-base text-center text-muted-foreground mb-8 italic">
              {verified ? "Entering your golden chamber..." : "Enter your mobile number to continue"}
            </p>

            {verified ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="w-full h-2 rounded-full bg-cream overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--gradient-gold)' }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            ) : !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                    <Smartphone className="w-4 h-4" />
                    <span className="font-body text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full pl-20 pr-4 py-4 rounded-xl bg-pearl/60 border border-gold/15 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/15 transition-all text-lg tracking-wider"
                  />
                </div>
                {error && <p className="font-body text-sm text-destructive">{error}</p>}
                <button type="submit" className="btn-gold btn-gold-pulse w-full text-base py-4">
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-5">
                <p className="font-body text-sm text-muted-foreground text-center">
                  OTP sent to +91 {phone}
                </p>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-display font-bold rounded-xl bg-pearl/60 border border-gold/20 text-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  ))}
                </div>
                {error && <p className="font-body text-sm text-destructive text-center">{error}</p>}
                <button type="submit" className="btn-gold btn-gold-pulse w-full text-base py-4">
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]); setError(""); }}
                  className="w-full text-center font-body text-sm text-gold-dark hover:underline"
                >
                  Change number
                </button>
                <p className="font-body text-xs text-muted-foreground text-center">
                  Hint: Use <span className="font-semibold text-foreground">123456</span> as OTP
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
