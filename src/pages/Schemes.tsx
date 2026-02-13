import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Check } from "lucide-react";
import Layout from "@/components/Layout";
import GoldDustParticles from "@/components/GoldDustParticles";

const schemes = [
  { name: "Classic Gold Plan", monthly: 5000, months: 11, bonus: 1, color: "from-gold-light to-gold" },
  { name: "Premium Gold Plan", monthly: 10000, months: 11, bonus: 2, color: "from-gold to-gold-dark" },
  { name: "Elite Gold Plan", monthly: 20000, months: 11, bonus: 3, color: "from-gold-dark to-gold" },
];

const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

const ProgressArc = ({ paidMonths, totalMonths }: { paidMonths: number; totalMonths: number }) => {
  const pct = (paidMonths / totalMonths) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative">
      {/* Halo glow behind arc */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, hsla(43, 80%, 55%, 0.15) 0%, transparent 70%)',
        filter: 'blur(8px)',
        transform: 'scale(1.4)',
      }} />
      <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto relative z-10">
        <circle cx="50" cy="50" r={r} fill="none" stroke="hsla(38,40%,70%,0.2)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43, 85%, 58%)" />
            <stop offset="100%" stopColor="hsl(38, 72%, 42%)" />
          </linearGradient>
        </defs>
        <text x="50" y="50" textAnchor="middle" dy="0.35em" className="font-display text-sm font-bold" fill="hsl(28, 25%, 15%)">
          {paidMonths}/{totalMonths}
        </text>
      </svg>
    </div>
  );
};

const Schemes = () => {
  const { isLoggedIn, enrollScheme, enrolledSchemes } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = (scheme: typeof schemes[0]) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    enrollScheme({
      name: scheme.name,
      monthlyAmount: scheme.monthly,
      totalMonths: scheme.months,
      bonusMonths: scheme.bonus,
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-ivory" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-spotlight)' }} />
        {/* Temple silhouette gradient at top */}
        <div className="absolute top-0 left-0 right-0 h-48" style={{
          background: 'linear-gradient(180deg, hsla(38, 40%, 75%, 0.08) 0%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, black 0%, transparent 100%)',
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23b8860b' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-0 right-0 gold-divider" />
        {/* Velvet spotlight glow behind content */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{
          background: 'radial-gradient(ellipse, hsla(43, 70%, 55%, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <GoldDustParticles />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Cultural Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p className="font-elegant text-base tracking-[0.3em] uppercase text-gold-dark mb-3">Investment Plans</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              <span className="text-gold-gradient-shine">Golden</span> Savings Plans
            </h1>
            <p className="font-elegant text-xl text-muted-foreground italic">
              Invest today. Adorn tomorrow.
            </p>
          </motion.div>

          {/* Cultural heritage section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-6"
          >
            <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
              Gold Savings — <span className="text-gold-gradient-shine">A Tradition of Generations</span>
            </h2>
            <p className="font-elegant text-base text-muted-foreground italic max-w-2xl mx-auto">
              For centuries, Indian families have preserved wealth in gold. Continue the legacy with Suvarna Jewellers.
            </p>
          </motion.div>

          {/* Decorative temple motif divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mb-20"
          >
            <div className="h-px w-20 md:w-32" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold-light)))' }} />
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 28 28" className="text-gold-dark">
                <path d="M14 2 L26 14 L14 26 L2 14 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.6" />
              </svg>
              <div className="absolute inset-0 animate-glow-pulse rounded-full" style={{
                background: 'radial-gradient(circle, hsla(43, 80%, 55%, 0.3) 0%, transparent 70%)',
                filter: 'blur(6px)',
              }} />
            </div>
            <div className="h-px w-20 md:w-32" style={{ background: 'linear-gradient(90deg, hsl(var(--gold-light)), transparent)' }} />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {schemes.map((scheme, index) => {
              const isEnrolled = enrolledSchemes.some((s) => s.name === scheme.name);
              return (
                <motion.div
                  key={scheme.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card rounded-3xl p-8 flex flex-col items-center text-center spotlight relative overflow-hidden group"
                  style={{
                    boxShadow: 'var(--shadow-luxury)',
                    backgroundImage: 'radial-gradient(ellipse at 50% 100%, hsla(38, 30%, 85%, 0.15) 0%, transparent 60%)',
                  }}
                >
                  {/* Shimmer border animation on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 20%, hsla(43,80%,60%,0.12) 50%, transparent 80%)',
                    }}
                  />
                  {/* Animated gold border on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 0 1.5px hsla(43, 80%, 55%, 0.3), 0 0 30px -5px hsla(43, 80%, 55%, 0.15)',
                    }}
                  />

                  {index === 2 && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-body font-semibold bg-gradient-to-r from-gold to-gold-dark text-primary-foreground">
                        Best Value
                      </span>
                    </div>
                  )}

                  <ProgressArc paidMonths={index === 0 ? 4 : index === 1 ? 7 : 9} totalMonths={scheme.months} />

                  <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">{scheme.name}</h3>

                  <div className="mb-4">
                    <span className="font-display text-3xl font-bold text-gold-gradient">{formatINR(scheme.monthly)}</span>
                    <span className="font-body text-sm text-muted-foreground">/month</span>
                  </div>

                  <div className="space-y-2 mb-6 w-full">
                    <div className="flex items-center gap-2 font-body text-sm text-foreground">
                      <Check className="w-4 h-4 text-gold-dark" /> {scheme.months} monthly installments
                    </div>
                    <div className="flex items-center gap-2 font-body text-sm text-foreground">
                      <Sparkles className="w-4 h-4 text-gold-dark" /> {scheme.bonus} month{scheme.bonus > 1 ? "s" : ""} bonus gold
                    </div>
                    <div className="flex items-center gap-2 font-body text-sm text-foreground">
                      <Check className="w-4 h-4 text-gold-dark" /> Maturity: {formatINR(scheme.monthly * (scheme.months + scheme.bonus))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gold/5 border border-gold/15 mb-6 w-full">
                    <p className="font-body text-xs text-muted-foreground">
                      ✦ Bonus of {formatINR(scheme.monthly * scheme.bonus)} in gold ✦
                    </p>
                  </div>

                  {isEnrolled ? (
                    <div className="btn-gold w-full text-center py-3.5 opacity-80 cursor-default flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnroll(scheme)}
                      className="btn-gold btn-gold-pulse w-full text-base py-3.5"
                    >
                      Enroll Now
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schemes;
