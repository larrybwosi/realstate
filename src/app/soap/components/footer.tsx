import Link from "next/link";
import { Leaf, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream text-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-sage" />
              <span className="font-montserrat font-bold text-lg">
                Natural Essence
              </span>
            </Link>
            <p className="text-sm text-brown/80">
              Handcrafted soaps made with natural ingredients and sustainable
              practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Shop", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-brown/80 hover:text-sage transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                "Shipping & Returns",
                "FAQ",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-brown/80 hover:text-sage transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4">
              Stay Connected
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-brown/80">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://instagram.com"
                  className="text-brown/80 hover:text-sage transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://facebook.com"
                  className="text-brown/80 hover:text-sage transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-brown/80 hover:text-sage transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sage/20 text-center text-sm text-brown/60">
          <p>© {new Date().getFullYear()} Natural Essence Soaps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}