import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp, TrendingDown } from "lucide-react";
import Layout from "@/components/Layout";
import GoldDustParticles from "@/components/GoldDustParticles";

const rates = [
  { metal: "Gold 22K", price: 6250, unit: "/gram", change: +45, trend: Array.from({ length: 7 }, () => 6100 + Math.random() * 300) },
  { metal: "Gold 24K", price: 6820, unit: "/gram", change: +52, trend: Array.from({ length: 7 }, () => 6650 + Math.random() * 350) },
  { metal: "Silver", price: 82, unit: "/gram", change: -1.2, trend: Array.from({ length: 7 }, () => 78 + Math.random() * 8) },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MiniChart = ({ data }: { data: number[] }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 60;
  const w = 180;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className="mx-auto mt-4">
      <defs>
        <linearGradient id="chartGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(43, 85%, 58%)" />
          <stop offset="100%" stopColor="hsl(38, 72%, 42%)" />
        </linearGradient>
        {/* Animated glow filter */}
        <filter id="chartGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polyline fill="none" stroke="url(#chartGold)" strokeWidth="2" points={points} filter="url(#chartGlow)" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * h} r="3" fill="hsl(43, 80%, 52%)" />
      ))}
    </svg>
  );
};

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const LiveRates = () => {
  const { isLoggedIn, enrolledSchemes } = useAuth();
  const totalSaved = enrolledSchemes.reduce((acc, s) => acc + s.monthlyAmount * s.paidMonths, 0);

  return (
    <Layout>
      <section className="pt-32 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-ivory" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-spotlight)' }} />
        {/* Temple silhouette gradient */}
        <div className="absolute top-0 left-0 right-0 h-48" style={{
          background: 'linear-gradient(180deg, hsla(38, 40%, 75%, 0.08) 0%, transparent 100%)',
        }} />
        <div className="absolute top-0 left-0 right-0 gold-divider" />
        <GoldDustParticles />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-6">
            <p className="font-elegant text-base tracking-[0.3em] uppercase text-gold-dark mb-3">Market Watch</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Live <span className="text-gold-gradient-shine">Rates</span>
            </h1>
            <p className="font-elegant text-lg text-muted-foreground italic mt-3">Today's precious metal prices</p>
          </motion.div>

          {/* Cultural headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-16"
          >
            <p className="font-elegant text-sm text-gold-dark/70 italic">
              "Today's Gold — Guiding Tomorrow's Celebrations"
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px w-32 mx-auto mt-4"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold-light)), transparent)' }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {rates.map((rate, i) => (
              <motion.div
                key={rate.metal}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-card rounded-3xl p-8 text-center spotlight relative overflow-hidden group"
                style={{ boxShadow: 'var(--shadow-luxury)' }}
              >
                {/* Molten gold gradient glow behind card */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at 50% 80%, hsla(43, 70%, 55%, 0.06) 0%, transparent 60%)',
                }} />
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, transparent, hsla(43,80%,60%,0.08), transparent)' }}
                />

                <h3 className="font-display text-lg font-bold text-foreground mb-1 relative">{rate.metal}</h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                  className="relative"
                >
                  <span className="font-display text-3xl font-bold text-gold-gradient">{formatINR(rate.price)}</span>
                  <span className="font-body text-sm text-muted-foreground">{rate.unit}</span>
                </motion.div>
                <div className={`flex items-center justify-center gap-1 mt-2 font-body text-sm ${rate.change > 0 ? "text-emerald" : "text-destructive"}`}>
                  {rate.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {rate.change > 0 ? "+" : ""}{rate.change}
                </div>

                <MiniChart data={rate.trend} />
                <div className="flex justify-between mt-1 px-1">
                  {days.map((d) => (
                    <span key={d} className="font-body text-[10px] text-muted-foreground">{d}</span>
                  ))}
                </div>

                {/* Temple pattern separator */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold-light)))' }} />
                  <div className="w-1.5 h-1.5 rotate-45 bg-gold-dark/30" />
                  <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, hsl(var(--gold-light)), transparent)' }} />
                </div>
              </motion.div>
            ))}
          </div>

          {isLoggedIn && totalSaved > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto relative overflow-hidden"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 50% 50%, hsla(43, 70%, 55%, 0.06) 0%, transparent 60%)',
              }} />
              <p className="font-elegant text-base text-muted-foreground italic mb-2 relative">Your current gold savings value</p>
              <span className="font-display text-3xl font-bold text-gold-gradient animate-text-glow relative">{formatINR(totalSaved)}</span>
              <p className="font-body text-xs text-muted-foreground mt-2 relative">Based on current 22K rate</p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default LiveRates;
