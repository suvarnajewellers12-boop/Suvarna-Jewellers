import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import showroomImg from "@/assets/showroom.jpg";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-pearl to-ivory" />
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-base tracking-[0.3em] uppercase text-gold-dark mb-3">Visit Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to Our <span className="text-gold-gradient">Showroom</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Showroom Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-lg"
          >
            <img src={showroomImg} alt="Swarna Suraksha showroom" className="w-full h-full object-cover min-h-[400px]" />
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between"
          >
            {/* Info */}
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Phone</p>
                  <p className="font-body font-semibold text-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Email</p>
                  <p className="font-body font-semibold text-foreground">support@swarnasuraksha.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Address</p>
                  <p className="font-body font-semibold text-foreground">
                    Swarna Suraksha Showroom<br />
                    D.No 10-45, Main Road, Gajuwaka<br />
                    Visakhapatnam, Andhra Pradesh – 530026<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-pearl/60 border border-gold/15 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-pearl/60 border border-gold/15 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-pearl/60 border border-gold/15 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
              />
              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 text-base"
              >
                {submitted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    ✨ Message Sent!
                  </motion.span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
