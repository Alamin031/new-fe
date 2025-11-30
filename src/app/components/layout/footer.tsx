import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Headphones,
} from 'lucide-react';
import {Input} from '../ui/input';
import {Button} from '../ui/button';

const footerLinks = {
  shop: [
    {name: 'All Products', href: '/products'},
    {name: 'Smartphones', href: '/category/smartphones'},
    {name: 'Laptops', href: '/category/laptops'},
    {name: 'Tablets', href: '/category/tablets'},
    {name: 'Accessories', href: '/category/accessories'},
  ],
  support: [
    {name: 'Contact Us', href: '/contact'},
    {name: 'FAQs', href: '/faq'},
    {name: 'Shipping Info', href: '/shipping'},
    {name: 'Returns & Refunds', href: '/returns'},
    {name: 'Warranty', href: '/warranty'},
  ],
  company: [
    {name: 'About Us', href: '/about'},
    {name: 'Careers', href: '/careers'},
    {name: 'Blog', href: '/blog'},
    {name: 'API List', href: '/api-list'},
  ],
  legal: [
    {name: 'Privacy Policy', href: '/privacy'},
    {name: 'Terms of Service', href: '/terms'},
    {name: 'Refund Policy', href: '/refund-policy'},
  ],
};

const features = [
  {icon: Truck, title: 'Free Shipping', description: 'On orders over ৳5,000'},
  {icon: Shield, title: 'Secure Payment', description: '100% secure checkout'},
  {icon: CreditCard, title: 'Easy EMI', description: '0% interest available'},
  {icon: Headphones, title: '24/7 Support', description: 'Dedicated support'},
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Features Bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {features.map(feature => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/image/logo.png"
                alt="Friend's Telecom"
                width={140}
                height={30}
                className="rounded-lg object-contain"
                priority
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted destination for Apple products and mobile devices in
              Dhaka.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold">
                Subscribe to our newsletter
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Get updates on new products and exclusive deals.
              </p>
              <form className="mt-3 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-9"
                />
                <Button size="sm" className="h-9">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/FriendsTelecom2015"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80">
                <Facebook className="h-4 w-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@friendstelecom2015"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80"
                aria-label="TikTok">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M16.5 3.5h2.25v3.375a5.625 5.625 0 0 1-5.625-3.375H16.5zM9 8.25a6.75 6.75 0 1 0 6.75 6.75v-6.75h-1.5v6.75A5.25 5.25 0 1 1 9 8.25z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/friendstelecom2015/"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80">
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@friendstelecom2015"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Bashundhara City Shopping Complex Basement 2, Shop 25, Dhaka,
                  Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  +880 1343-159931
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href="mailto:support@Friend's Telecom.com"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  help.frtel@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Friend&apos;s Telecom. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
