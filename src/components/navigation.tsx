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
  Sparkles,
  LayoutDashboard,
  Upload,
  LogOut,
  LogIn,
  UserPlus,
  Hotel,
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/apartments", label: "All Apartments", icon: Home },
    { href: "/cleaning-services", label: "Cleaning Services", icon: Sparkles },
    { href: "/courts", label: "Courts", icon: Hotel },
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
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const menuItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.645, 0.045, 0.355, 1],
      },
    }),
  };

  return (
    <MotionNav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 dark:bg-background/80 backdrop-blur-lg shadow-xs"
          : "bg-background/80 dark:bg-background/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="relative group">
            <MotionDiv
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Cheap City
              </span>
              <MotionDiv
                className="h-0.5 w-0 bg-primary absolute -bottom-1 left-0 rounded-full"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </MotionDiv>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <MotionDiv
                key={item.label}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.onClick ? (
                  <Button
                    variant="ghost"
                    onClick={item.onClick}
                    className="flex items-center gap-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span>{item.label}</span>
                  </Button>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant={item.isSpecial ? "default" : "ghost"}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        item.isSpecial
                          ? "bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/30"
                          : "hover:bg-primary/10 dark:hover:bg-primary/20"
                      } transition-all duration-300`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${
                          item.isSpecial ? "text-white" : "text-primary"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )}
              </MotionDiv>
            ))}
            <div className="ml-2 pl-2 border-l border-border">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              <MotionDiv
                key={isOpen ? "close" : "menu"}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: isOpen ? 90 : 0, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </MotionDiv>
            </AnimatePresence>
          </MotionButton>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-16 bg-background/95 dark:bg-background/90 backdrop-blur-lg md:hidden overflow-hidden border-b"
          >
            <div className="px-4 py-4 space-y-2">
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
                        item.onClick?.();
                        handleClose();
                      }}
                      className="w-full justify-start gap-3 h-12 rounded-lg px-4"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      {item.label}
                    </Button>
                  ) : (
                    <Link href={item.href} onClick={handleClose}>
                      <Button
                        variant={item.isSpecial ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 h-12 rounded-lg px-4 ${
                          item.isSpecial
                            ? "bg-linear-to-r from-primary to-primary/90"
                            : ""
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${
                            item.isSpecial ? "text-white" : "text-primary"
                          }`}
                        />
                        {item.label}
                      </Button>
                    </Link>
                  )}
                </MotionDiv>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center justify-between px-4">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </div>

              {data?.user && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 px-4">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarImage
                        src={data.user.image!}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {data.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{data.user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {data.user.email}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionNav>
  );
}
