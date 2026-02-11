import { useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw } from "lucide-react";

import productNecklace from "@/assets/product-necklace.jpg";
import productBridalSet from "@/assets/product-bridal-set.jpg";
import productMangalsutra from "@/assets/product-mangalsutra.jpg";
import productBangles from "@/assets/product-bangles.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productPooja from "@/assets/product-pooja.jpg";

const products = [
  {
    name: "Gold Necklace",
    price: "₹1,25,000",
    image: productNecklace,
    description: "A masterpiece of traditional Indian craftsmanship, this temple-style gold necklace features intricate kundan work and delicate filigree patterns passed down through generations.",
    story: "In Indian tradition, a gold necklace symbolizes prosperity and is often the centerpiece of a bride's trousseau, carrying blessings from one generation to the next.",
  },
  {
    name: "Bridal Temple Set",
    price: "₹2,10,500",
    image: productBridalSet,
    description: "Complete bridal ensemble featuring a statement necklace, matching jhumka earrings, and maang tikka, all crafted in 22K gold with precious stone settings.",
    story: "The bridal set represents the coming together of two families, each piece carefully chosen to honor the sacred bond of marriage in Indian culture.",
  },
  {
    name: "Diamond Mangalsutra",
    price: "₹75,000",
    image: productMangalsutra,
    description: "A contemporary take on the sacred mangalsutra, blending traditional black beads with a stunning diamond-encrusted gold pendant.",
    story: "The mangalsutra is the most sacred piece of jewelry in Indian marriages — a symbol of love, commitment, and the eternal bond between husband and wife.",
  },
  {
    name: "Gold Bangles",
    price: "₹95,000",
    image: productBangles,
    description: "Set of six intricately designed gold bangles featuring traditional temple motifs and meenakari enamel work in vibrant colors.",
    story: "The jingling of gold bangles has been the sound of celebration in Indian households for millennia, from festivals to weddings.",
  },
  {
    name: "Bridal Earrings",
    price: "₹55,000",
    image: productEarrings,
    description: "Grand bridal jhumka earrings with kundan setting, pearl drops, and detailed gold filigree work that catches every ray of light.",
    story: "Jhumkas have adorned Indian women since the Mughal era, their bell-shaped design creating a mesmerizing dance of light and sound.",
  },
  {
    name: "Silver Pooja Collection",
    price: "₹35,000",
    image: productPooja,
    description: "Complete silver pooja set including an ornate thali, diya, kalash, and accessories — perfect for daily worship and special ceremonies.",
    story: "Every Indian home has a sacred space for worship. This collection brings divinity and beauty to your daily rituals.",
  },
];

interface Product {
  name: string;
  price: string;
  image: string;
  description: string;
  story: string;
}

const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      onClick={(e) => e.stopPropagation()}
      className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0"
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden rounded-t-3xl bg-cream">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pearl/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-pearl transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center text-gold-dark">
          <RotateCcw className="w-5 h-5" />
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl font-bold text-foreground">{product.name}</h3>
          <span className="font-display text-xl font-bold text-gold-gradient">{product.price}</span>
        </div>
        <p className="font-body text-muted-foreground mb-6">{product.description}</p>
        <div className="border-t border-gold/20 pt-6">
          <h4 className="font-elegant text-lg italic text-gold-dark mb-2">Cultural Inspiration</h4>
          <p className="font-body text-sm text-muted-foreground">{product.story}</p>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/15">
          <p className="font-body text-sm text-center text-muted-foreground">
            ✦ Available through our exclusive savings schemes ✦
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-24 px-4 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-cream" />
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-base tracking-[0.3em] uppercase text-gold-dark mb-3">Curated Collection</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Exquisite <span className="text-gold-gradient">Treasures</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Each piece tells a story of heritage, crafted with devotion and designed to be cherished for generations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="product-card cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden rounded-t-2xl bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="font-display text-xl font-bold text-gold-gradient">{product.price}</p>
                <p className="font-body text-xs text-muted-foreground mt-2">Click to explore</p>
              </div>
              {/* Spotlight glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 60px hsla(43, 80%, 55%, 0.08)" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <div className="absolute bottom-0 left-0 right-0 gold-divider" />
    </section>
  );
};

export default ProductsSection;
