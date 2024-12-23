'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/apartments', label: 'All Apartments' },
    { href: '/find-a-home', label: 'Find a Home' },
    { href: '/cleaning-services', label: 'Cleaning Services' },
    ...(session 
      ? [
          { href: '/dashboard', label: 'Dashboard' },
          { href: '#', label: 'Sign Out', onClick: () => signOut() }
        ]
      : [
          { href: '/login', label: 'Login' },
          { href: '/signup', label: 'Sign Up', isSpecial: true }
        ]
    )
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg shadow-lg'
          : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ApartmentFinder
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
                        item.isSpecial ? 'bg-primary hover:bg-primary/90' : ''
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  {item.onClick ? (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        item.onClick()
                        setIsOpen(false)
                      }}
                      className="w-full justify-start text-left"
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
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
              <div className="pt-2 border-t">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}