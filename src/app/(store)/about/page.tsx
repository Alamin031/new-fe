/* eslint-disable react/jsx-no-comment-textnodes */
import type {Metadata} from 'next';
import Image from 'next/image';
import {Users, Award, Truck, Headphones} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about TechStore and our mission.',
};

const stats = [
  {label: 'Happy Customers', value: '500K+'},
  {label: 'Products Delivered', value: '1M+'},
  {label: 'Cities Served', value: '500+'},
  {label: 'Brand Partners', value: '100+'},
];

const values = [
  {
    icon: Users,
    title: 'Customer First',
    description:
      'We prioritize customer satisfaction above everything else, ensuring the best shopping experience.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description:
      'All our products are 100% genuine with manufacturer warranty and quality assurance.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description:
      'Express delivery options available with real-time tracking for all orders.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our dedicated support team is available round the clock to assist you.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">About TechStore</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your trusted destination for the latest electronics and gadgets.
          We&apos;re committed to bringing you the best products at the best
          prices.
        </p>
      </div>

      <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, TechStore started with a simple mission: to make
              quality technology accessible to everyone. What began as a small
              online store has grown into one of India&apos;s leading
              electronics retailers.
            </p>
            <p>
              We believe in transparency, fair pricing, and exceptional customer
              service. Our team of tech enthusiasts carefully curates products
              from the world&apos;s best brands to bring you devices that
              enhance your digital life.
            </p>
            <p>
              Today, we serve millions of customers across 500+ cities,
              delivering not just products but experiences that matter.
            </p>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
          // eslint-disable-next-line react/react-in-jsx-scope
          <Image
            src="/placeholder.svg?key=5r9x2"
            alt="TechStore team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16 rounded-2xl bg-muted/50 p-8 md:p-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(value => (
            <div key={value.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
