import type { Metadata } from "next"
import Image from "next/image"
import { Users, Award, Truck, Headphones, Target, Heart } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { generateSEO } from "../../lib/seo"

export const metadata: Metadata = generateSEO({
  title: "About Us - TechStore's Story | Premium Electronics",
  description: "Learn about TechStore - your trusted destination for genuine electronics and gadgets. Discover our mission, values, and commitment to customer satisfaction.",
  url: "/about-us",
  keywords: ["about us", "our story", "company", "mission", "values", "team"],
})

const stats = [
  { label: "Happy Customers", value: "500K+" },
  { label: "Products Delivered", value: "1M+" },
  { label: "Cities Served", value: "500+" },
  { label: "Brand Partners", value: "100+" },
]

const values = [
  {
    icon: Users,
    title: "Customer First",
    description:
      "We prioritize customer satisfaction above everything else, ensuring the best shopping experience.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "All our products are 100% genuine with manufacturer warranty and quality assurance.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Express delivery options available with real-time tracking for all orders.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to assist you.",
  },
]

const team = [
  {
    role: "CEO & Founder",
    title: "Visionary Leadership",
    description: "Leading TechStore with passion for innovation and customer excellence.",
  },
  {
    role: "Operations Director",
    title: "Seamless Operations",
    description: "Ensuring smooth delivery and logistics across all regions.",
  },
  {
    role: "Customer Care Manager",
    title: "Customer Satisfaction",
    description: "Building lasting relationships with our valued customers.",
  },
  {
    role: "Product Manager",
    title: "Quality Curation",
    description: "Selecting the best products from trusted global brands.",
  },
]

export default function AboutUsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About TechStore</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Your trusted destination for genuine electronics and gadgets. We're committed to bringing you the best products at the best prices with exceptional service.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, TechStore started with a simple mission: to make quality technology accessible to everyone. What began as a small online store has grown into one of Bangladesh's leading electronics retailers.
            </p>
            <p>
              We believe in transparency, fair pricing, and exceptional customer service. Our team of tech enthusiasts carefully curates products from the world's best brands to bring you devices that enhance your digital life.
            </p>
            <p>
              Today, we serve millions of customers across 500+ cities, delivering not just products but experiences that matter. Every device we sell comes with our promise of authenticity, quality, and support.
            </p>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
          <Image
            src="/placeholder.svg"
            alt="TechStore team and storefront"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="rounded-2xl bg-muted/50 p-8 md:p-12">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">By The Numbers</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Our Values</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Team Section */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.role}>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-center font-semibold">{member.role}</h3>
                <p className="text-center text-sm font-medium text-primary mt-1">{member.title}</p>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="rounded-2xl bg-primary/5 p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to quality technology across Bangladesh by providing genuine products, transparent pricing, and exceptional customer service that exceeds expectations.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted and customer-centric electronics retailer in Asia, known for authenticity, innovation, and unwavering commitment to customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Why Choose TechStore?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">100% Genuine Products</h3>
              <p className="text-sm text-muted-foreground">
                All products are sourced directly from authorized distributors and come with manufacturer warranty.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">Best Prices Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Competitive pricing with regular discounts, offers, and loyalty rewards for our valued customers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">Fast & Reliable Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Same-day, express, and standard delivery options with real-time tracking across Bangladesh.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">Excellent Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                24/7 dedicated support team ready to help with any questions or concerns.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">Hassle-Free Returns</h3>
              <p className="text-sm text-muted-foreground">
                7-day return policy with free pickup and quick refund processing.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">Flexible Payment Options</h3>
              <p className="text-sm text-muted-foreground">
                Multiple payment methods including bKash, Nagad, cards, bank transfer, and EMI options.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Join Our Community</h2>
        <p className="mt-4 text-muted-foreground">
          Become part of thousands of satisfied customers who trust TechStore for their technology needs.
        </p>
        <a href="/" className="mt-6 inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
          Start Shopping
        </a>
      </section>
    </div>
  )
}
