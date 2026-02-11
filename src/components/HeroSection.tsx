import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const SparkleParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number }[] = [];

    const createParticle = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          size: Math.random() * 3 + 1,
          opacity: 1,
          life: Math.random() * 60 + 30,
        });
      }
    };

    // Ambient particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.5 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        life: 999999,
      });
    }

    const handleMouse = (e: MouseEvent) => createParticle(e.clientX, e.clientY);
    canvas.addEventListener("mousemove", handleMouse);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.life < 999999) {
          p.life--;
          p.opacity = Math.max(0, p.opacity - 0.015);
        }
        if (p.life <= 0 || p.opacity <= 0) {
          if (p.life === 999999) {
            p.x = Math.random() * canvas.width;
            p.y = canvas.height + 10;
            p.opacity = Math.random() * 0.6 + 0.2;
          } else {
            particles.splice(i, 1);
            continue;
          }
        }
        if (p.y < -10) { p.y = canvas.height + 10; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(43, 80%, 65%, ${p.opacity})`);
        grad.addColorStop(1, `hsla(43, 80%, 55%, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-auto" />;
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury Indian gold jewelry display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/70 via-ivory/50 to-cream/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-pearl/60 via-transparent to-pearl/60" />
      </div>

      {/* Sparkle Particles */}
      <SparkleParticles />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="font-elegant text-lg md:text-xl tracking-[0.3em] uppercase text-gold-dark mb-4">
            ✦ Premium Gold Savings ✦
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">Build Your </span>
          <span className="text-gold-gradient">Golden Future</span>
          <br />
          <span className="text-foreground">with Trust</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-elegant text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 italic"
        >
          India's most elegant gold savings experience designed for your dreams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#products" className="btn-gold text-base md:text-lg px-10 py-4">
            Explore Schemes
          </a>
          <a
            href="#about"
            className="px-10 py-4 rounded-full font-body font-semibold text-base md:text-lg border-2 border-gold/40 text-foreground hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            Start Gold Journey
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
