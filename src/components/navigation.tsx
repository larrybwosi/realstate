'use client'

import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut, useSession } from '@/lib/authClient'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Navigation() {
  const { data } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    setIsOpen(false);
  };

  // Handle closing on outside click (useEffect not needed here)
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".Navigation")) {
        handleClose();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "/apartments", label: "All Apartments" },
    { href: "/find-home", label: "Find a Home" },
    { href: "/cleaning-services", label: "Cleaning Services" },
    ...(data?.user.id
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "#", label: "Sign Out", onClick: () => signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/login");
                },
              },
            }) },
                    ]
      : [
          { href: "/login", label: "Login" },
          { href: "/signup", label: "Sign Up", isSpecial: true },
        ]),
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg"
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className=" mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Chep City
            </motion.span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.onClick ? (
                  <Button
                    variant="ghost"
                    onClick={item.onClick}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 bg-primary/10 transform translate-y-full transition-transform group-hover:translate-y-0" />
                  </Button>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant={item.isSpecial ? "default" : "ghost"}
                      className={`relative overflow-hidden group ${
                        item.isSpecial ? "bg-primary hover:bg-primary/90" : ""
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute inset-0 bg-primary/10 transform translate-y-full transition-transform group-hover:translate-y-0" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%" }} // Slide in from left on mobile
            animate={{ x: 0 }}
            exit={{ x: "-100%" }} // Slide out to left on close
            className={`fixed w-screen h-screen top-0 left-0 overflow-auto z-50 transition-all duration-300 bg-background/95 backdrop-blur-lg`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col h-full">
              {/* Navigation Items */}
              <div className="flex-grow space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    {item.onClick ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          item.onClick();
                          handleClose();
                        }}
                        className="w-full justify-start text-left"
                      >
                        {item.label}
                      </Button>
                    ) : (
                      <Link href={item.href} onClick={handleClose}>
                        <Button
                          variant={item.isSpecial ? "default" : "ghost"}
                          className="w-full justify-start text-left"
                        >
                          {item.label}
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* User Information (if logged in) */}
              {data?.user && (
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex-row flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={data.user.image!}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg bg-primary text-white">
                        {data.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm+'>{data.user.name}</span>
                  </div>
                  <Button variant="ghost" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </div>
              )}

              {/* Theme Toggle */}
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 md:hidden"
              onClick={handleClose}
            >
              <X size={24} />
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}