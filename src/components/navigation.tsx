"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Search,
  Sparkles,
  Bath,
  LayoutDashboard,
  Upload,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { signOut, useSession } from "@/lib/authClient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MotionButton, MotionDiv, MotionNav } from "./motion";

export function Navigation() {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const handleClose = () => setIsOpen(false);

  // Effect for handling scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    handleClose();
  }, []);

  // Enhanced nav items with icons
  const navItems = [
    { href: "/apartments", label: "All Apartments", icon: Home },
    { href: "/find-home", label: "Find a Home", icon: Search },
    { href: "/cleaning-services", label: "Cleaning Services", icon: Sparkles },
    { href: "/soap", label: "Soap", icon: Bath },
    ...(data?.user.id
      ? [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/submit", label: "Submit Apartment", icon: Upload },
          {
            href: "#",
            label: "Sign Out",
            icon: LogOut,
            onClick: () =>
              signOut({
                fetchOptions: { onSuccess: () => router.push("/login") },
              }),
          },
        ]
      : [
          { href: "/login", label: "Login", icon: LogIn },
          {
            href: "/signup",
            label: "Sign Up",
            icon: UserPlus,
            isSpecial: true,
          },
        ]),
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const menuItemVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <MotionNav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-xl shadow-lg" : "bg-background/50 backdrop-blur-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="relative group">
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Cheap City
              </span>
              <MotionDiv
                className="h-1 w-0 bg-primary absolute bottom-0 left-0"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </MotionDiv>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item, index) => (
              <MotionDiv
                key={item.label}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.onClick ? (
                  <Button
                    variant="ghost"
                    onClick={item.onClick}
                    className="flex items-center gap-2 hover:bg-primary/10 transition-colors duration-300"
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Button>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant={item.isSpecial ? "default" : "ghost"}
                      className={`flex items-center gap-2 ${item.isSpecial ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "hover:bg-primary/10"} transition-all duration-300`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )}
              </MotionDiv>
            ))}
            <ThemeToggle />
          </div>
          <MotionButton
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              <MotionDiv
                key={isOpen ? "close" : "menu"}
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                exit={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </MotionDiv>
            </AnimatePresence>
          </MotionButton>
        </div>
      </div>
      {/* Mobile Navigation */}
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-16 bg-background/50 dark:bg-gray-900 backdrop-blur-xl md:hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col h-full">
              <div className="flex-grow space-y-3">
                {navItems.map((item, index) => (
                  <MotionDiv
                    key={item.label}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full"
                  >
                    {item.onClick ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          item.onClick();
                          handleClose();
                        }}
                        className="w-full justify-start text-left flex items-center gap-3"
                      >
                        <item.icon size={20} />
                        {item.label}
                      </Button>
                    ) : (
                      <Link href={item.href} onClick={handleClose}>
                        <Button
                          variant={item.isSpecial ? "default" : "ghost"}
                          className="w-full justify-start text-left flex items-center gap-3"
                        >
                          <item.icon size={20} />
                          {item.label}
                        </Button>
                      </Link>
                    )}
                  </MotionDiv>
                ))}
              </div>
              {/* User Profile Section */}
              {data?.user && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-auto pt-4 border-t"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={data.user.image!}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {data.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{data.user.name}</span>
                    </div>
                  </div>
                </MotionDiv>
              )}
              {/* Mobile Theme Toggle */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex justify-between items-center"
              >
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </MotionDiv>
            </div>
          </MotionDiv>
        )}
    </MotionNav>
  );
}
