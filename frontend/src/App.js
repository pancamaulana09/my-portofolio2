import React from "react";
import "@/App.css";
import "@/styles/site.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/site/Header";
import FooterBar from "@/components/site/FooterBar";
import PageFX from "@/components/site/PageFX";
import CookieBanner from "@/components/site/CookieBanner";
import { Toaster } from "@/components/ui/toaster";
import SmoothScroll from "@/components/site/fx/SmoothScroll";
import ScrollProgress from "@/components/site/fx/ScrollProgress";
import CustomCursor from "@/components/site/fx/CustomCursor";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";

function Shell() {
  const location = useLocation();
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <FooterBar />
      <PageFX />
      <CookieBanner />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
