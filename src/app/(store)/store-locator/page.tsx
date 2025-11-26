import type { Metadata } from "next"
import { MapPin, Phone, Clock, Globe } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { generateSEO } from "../../lib/seo"
import { StoreSearchClient } from "./store-search"

export const metadata: Metadata = generateSEO({
  title: "Store Locator - Find TechStore Near You | Locations",
  description: "Find TechStore locations near you. Visit our physical stores across Bangladesh for products, support, and expert advice. View hours, directions, and contact information.",
  url: "/store-locator",
  keywords: ["store locator", "locations", "find store", "physical store", "showroom"],
})

const stores = [
  {
    id: 1,
    name: "TechStore Gulshan",
    address: "123 Tech Street, Gulshan 1, Dhaka",
    phone: "+880 1234-567890",
    email: "gulshan@techstore.com",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 7:00 PM",
    lat: 23.8103,
    lng: 90.4125,
    district: "Dhaka",
    services: ["Service Center", "Demo Zone", "Expert Support", "Accessories"],
  },
  {
    id: 2,
    name: "TechStore Banani",
    address: "456 Electronics Rd, Banani, Dhaka",
    phone: "+880 1234-567891",
    email: "banani@techstore.com",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 7:00 PM",
    lat: 23.8207,
    lng: 90.4246,
    district: "Dhaka",
    services: ["Service Center", "Expert Support", "Accessories", "Repair"],
  },
  {
    id: 3,
    name: "TechStore Mirpur",
    address: "789 Tech Plaza, Mirpur 2, Dhaka",
    phone: "+880 1234-567892",
    email: "mirpur@techstore.com",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM | Sun: 12:00 PM - 8:00 PM",
    lat: 23.8006,
    lng: 90.3631,
    district: "Dhaka",
    services: ["Demo Zone", "Expert Support", "Accessories"],
  },
  {
    id: 4,
    name: "TechStore Chittagong",
    address: "321 Metro Plaza, Halishahar, Chittagong",
    phone: "+880 1234-567893",
    email: "chittagong@techstore.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM | Sun: 12:00 PM - 7:00 PM",
    lat: 22.3569,
    lng: 91.8133,
    district: "Chittagong",
    services: ["Service Center", "Demo Zone", "Expert Support", "Accessories", "Repair"],
  },
  {
    id: 5,
    name: "TechStore Sylhet",
    address: "654 Zindabazar, Sylhet",
    phone: "+880 1234-567894",
    email: "sylhet@techstore.com",
    hours: "Mon-Sat: 10:00 AM - 6:00 PM | Sun: Closed",
    lat: 24.9141,
    lng: 91.8679,
    district: "Sylhet",
    services: ["Expert Support", "Accessories"],
  },
  {
    id: 6,
    name: "TechStore Khulna",
    address: "987 Sonadanga, Khulna",
    phone: "+880 1234-567895",
    email: "khulna@techstore.com",
    hours: "Mon-Sat: 10:00 AM - 6:00 PM | Sun: Closed",
    lat: 22.8046,
    lng: 89.5587,
    district: "Khulna",
    services: ["Expert Support", "Accessories"],
  },
]

export default function StoreLocatorPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Find a Store Near You</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Visit our physical stores across Bangladesh for expert advice, product demonstrations, and after-sales support.
        </p>
      </section>

      {/* Store Search */}
      <section>
        <StoreSearchClient stores={stores} />
      </section>

      {/* Store Directory */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">All Store Locations</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
                <p className="text-sm text-primary font-medium mb-4">{store.district}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-xs text-muted-foreground">{store.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href={`tel:${store.phone}`} className="text-xs text-primary hover:underline">
                        {store.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Hours</p>
                      <p className="text-xs text-muted-foreground">{store.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Services</p>
                      <p className="text-xs text-muted-foreground">{store.services.join(", ")}</p>
                    </div>
                  </div>
                </div>

                <a href={`tel:${store.phone}`} className="inline-block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                  Call Store
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Store Services */}
      <section className="rounded-2xl bg-muted/50 p-8 md:p-12">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">What to Expect at Our Stores</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold">Product Showroom</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See and touch the latest gadgets before buying
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold">Expert Staff</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get personalized recommendations from tech experts
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold">After-Sales Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Access warranty and repair services
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold">Convenient Hours</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Visit during your preferred time
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Store FAQs</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          <details className="group rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold text-lg flex items-center justify-between">
              <span>Can I purchase online for pickup at store?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Yes, you can order online and pick up at your nearest store. You'll receive a confirmation when the product is ready for pickup.
            </p>
          </details>

          <details className="group rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold text-lg flex items-center justify-between">
              <span>Are all products available at every store?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Not all products are available at every location. We recommend calling ahead to check product availability.
            </p>
          </details>

          <details className="group rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold text-lg flex items-center justify-between">
              <span>Can I return online purchases at a physical store?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Yes, you can initiate returns at any of our physical stores. Our staff will help you with the return process.
            </p>
          </details>

          <details className="group rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold text-lg flex items-center justify-between">
              <span>Do you offer same-day delivery from stores?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Same-day delivery availability varies by location. Contact your nearest store for details on same-day delivery options.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Need Help?</h2>
        <p className="mt-4 text-muted-foreground">
          Can't find what you're looking for? Contact us for assistance.
        </p>
        <a href="/contact-us" className="mt-6 inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
          Get in Touch
        </a>
      </section>
    </div>
  )
}
