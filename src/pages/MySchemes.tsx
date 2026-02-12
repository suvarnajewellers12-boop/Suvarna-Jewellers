import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const MySchemes = () => {
  const { enrolledSchemes } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="pt-32 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-ivory" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-spotlight)' }} />
        <div className="absolute top-0 left-0 right-0 gold-divider" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="font-elegant text-base tracking-[0.3em] uppercase text-gold-dark mb-3">Portfolio</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              My <span className="text-gold-gradient-shine">Schemes</span>
            </h1>
          </motion.div>

          {enrolledSchemes.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto" style={{ boxShadow: 'var(--shadow-luxury)' }}>
              <p className="font-body text-muted-foreground mb-6">No active schemes. Start your golden journey today.</p>
              <button onClick={() => navigate("/schemes")} className="btn-gold text-sm px-8 py-3">Explore Schemes</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledSchemes.map((scheme, i) => {
                const progress = (scheme.paidMonths / scheme.totalMonths) * 100;
                const goldAccumulated = scheme.monthlyAmount * scheme.paidMonths;
                const remaining = scheme.totalMonths - scheme.paidMonths;
                const status = remaining === 0 ? "Completed" : "Active";

                return (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="glass-card rounded-3xl p-8 spotlight"
                    style={{ boxShadow: 'var(--shadow-luxury)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-xl font-bold text-foreground">{scheme.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold border ${
                        status === "Active"
                          ? "bg-gold/10 text-gold-dark border-gold/20"
                          : "bg-emerald/10 text-emerald border-emerald/20"
                      }`}>
                        {status}
                      </span>
                    </div>

                    <p className="font-body text-sm text-muted-foreground mb-1">EMI: {formatINR(scheme.monthlyAmount)}/month</p>
                    <p className="font-body text-sm text-muted-foreground mb-4">Gold Accumulated: <span className="font-semibold text-foreground">{formatINR(goldAccumulated)}</span></p>

                    <div className="w-full h-3 rounded-full bg-cream overflow-hidden mb-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--gradient-gold)' }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between font-body text-xs text-muted-foreground">
                      <span>{scheme.paidMonths} of {scheme.totalMonths} months</span>
                      <span>{remaining} remaining</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MySchemes;
