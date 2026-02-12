import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Check } from "lucide-react";
import Layout from "@/components/Layout";

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
    <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
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
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23b8860b' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-0 right-0 gold-divider" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="font-elegant text-base tracking-[0.3em] uppercase text-gold-dark mb-3">Investment Plans</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              <span className="text-gold-gradient-shine">Golden</span> Savings Plans
            </h1>
            <p className="font-elegant text-xl text-muted-foreground italic">
              Invest today. Adorn tomorrow.
            </p>
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
                  style={{ boxShadow: 'var(--shadow-luxury)' }}
                >
                  {/* Shimmer hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, transparent, hsla(43,80%,60%,0.06), transparent)' }}
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
