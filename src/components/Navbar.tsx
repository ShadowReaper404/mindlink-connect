import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Get Help", href: "#help" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-2xl border-b border-primary/20 shadow-primary/5"
          : "bg-gradient-to-b from-background/60 to-transparent backdrop-blur-sm"
      }`}
    >
      {/* Glassmorphism overlay */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      )}
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 hover-scale cursor-pointer group">
            <div className="relative">
              <Heart className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Project Anon</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/90 hover:text-primary transition-all duration-300 font-medium story-link relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-0 blur-sm" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" className="backdrop-blur-sm hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300">
                Sign In
              </Button>
            </Link>
            <Button variant="hero" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in backdrop-blur-xl bg-background/95 rounded-b-2xl border-b border-primary/20 shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-primary/10 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-primary/20">
                <Link to="/signin">
                  <Button variant="ghost" className="w-full backdrop-blur-sm hover:bg-primary/10 border border-transparent hover:border-primary/20">
                    Sign In
                  </Button>
                </Link>
                <Button variant="hero" className="w-3/4 mx-auto h-10 text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
