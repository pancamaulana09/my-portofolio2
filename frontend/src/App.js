import React from "react";
import "@/App.css";
import "@/styles/site.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/site/Header";
import FooterBar from "@/components/site/FooterBar";
import PageFX from "@/components/site/PageFX";
import CookieBanner from "@/components/site/CookieBanner";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <FooterBar />
        <PageFX />
        <CookieBanner />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
