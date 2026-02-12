import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp, Calendar, ShoppingBag, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const AnimatedCounter = ({ value }: { value: number }) => (
  <motion.span
    className="font-display text-3xl md:text-4xl font-bold text-gold-gradient"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    {formatINR(value)}
  </motion.span>
);

const Dashboard = () => {
  const { user, enrolledSchemes } = useAuth();
  const navigate = useNavigate();

  const totalGold = enrolledSchemes.reduce((acc, s) => acc + s.monthlyAmount * s.paidMonths, 0);
  const nextInstallment = enrolledSchemes.length > 0 ? "15th Feb 2026" : "—";

  return (
    <Layout>
      <section className="pt-32 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-ivory" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-spotlight)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23b8860b' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">
              Welcome, <span className="text-gold-gradient-shine">{user?.name || "Member"}</span>
            </h1>
            <p className="font-elegant text-lg text-muted-foreground italic mb-12">Your golden portfolio at a glance</p>
          </motion.div>

          {/* Stats cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: TrendingUp, label: "Total Gold Saved", value: <AnimatedCounter value={totalGold} /> },
              { icon: ShoppingBag, label: "Active Schemes", value: <span className="font-display text-3xl font-bold text-foreground">{enrolledSchemes.length}</span> },
              { icon: Calendar, label: "Next Installment", value: <span className="font-display text-lg font-bold text-foreground">{nextInstallment}</span> },
              { icon: BarChart3, label: "Gold Rate (22K)", value: <span className="font-display text-lg font-bold text-foreground">₹6,250/g</span> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 spotlight"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <stat.icon className="w-6 h-6 text-gold-dark mb-3" />
                <p className="font-body text-sm text-muted-foreground mb-1">{stat.label}</p>
                {stat.value}
              </motion.div>
            ))}
          </div>

          {/* Enrolled schemes */}
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Your Schemes</h2>
          {enrolledSchemes.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
              <p className="font-body text-muted-foreground mb-4">You haven't enrolled in any schemes yet.</p>
              <button onClick={() => navigate("/schemes")} className="btn-gold text-sm px-8 py-3">
                Explore Schemes
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {enrolledSchemes.map((scheme, i) => {
                const progress = (scheme.paidMonths / scheme.totalMonths) * 100;
                return (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-6"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-lg font-bold text-foreground">{scheme.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs font-body font-semibold bg-gold/10 text-gold-dark border border-gold/20">
                        Active
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground mb-1">
                      {formatINR(scheme.monthlyAmount)}/month • {scheme.paidMonths}/{scheme.totalMonths} paid
                    </p>
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      Gold saved: {formatINR(scheme.monthlyAmount * scheme.paidMonths)}
                    </p>
                    <div className="w-full h-2 rounded-full bg-cream overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--gradient-gold)' }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-2">
                      {scheme.totalMonths - scheme.paidMonths} months remaining
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Quick links */}
          <div className="grid sm:grid-cols-2 gap-6">
            <button onClick={() => navigate("/products")} className="glass-card rounded-2xl p-6 text-left hover:border-gold/40 transition-colors" style={{ boxShadow: 'var(--shadow-card)' }}>
              <ShoppingBag className="w-6 h-6 text-gold-dark mb-2" />
              <h3 className="font-display text-lg font-bold text-foreground">Browse Products</h3>
              <p className="font-body text-sm text-muted-foreground">Explore our curated jewelry collection</p>
            </button>
            <button onClick={() => navigate("/live-rates")} className="glass-card rounded-2xl p-6 text-left hover:border-gold/40 transition-colors" style={{ boxShadow: 'var(--shadow-card)' }}>
              <BarChart3 className="w-6 h-6 text-gold-dark mb-2" />
              <h3 className="font-display text-lg font-bold text-foreground">Live Gold Rates</h3>
              <p className="font-body text-sm text-muted-foreground">Track today's gold and silver prices</p>
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
