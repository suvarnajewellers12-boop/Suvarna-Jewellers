import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="page-container">
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
