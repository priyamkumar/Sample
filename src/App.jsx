import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

// Pages
import Home from "@pages/Home";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Products from "@pages/Products";
import ProductDetail from "@pages/ProductDetail";
import NotFound from "@pages/NotFound";
import Admin from "@pages/Admin";
import AdminProducts from "@pages/AdminProducts";
import AdminMessages from "@pages/AdminMessages";
import Login from "./pages/Login";
import AdminProvider from "./context/AdminProvider";

function App() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header scrolled={scrolled} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminProvider>
                  <Admin />
                </AdminProvider>
              }
            >
              <Route path="products" element={<AdminProducts />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
