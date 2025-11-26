import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { generateSEO } from "../../lib/seo"
import { ContactFormClient } from "./contact-form-client"

export const metadata: Metadata = generateSEO({
  title: "Contact Us - Get in Touch | TechStore",
  description: "Have questions or feedback? Contact TechStore's support team. We're available 9 AM - 6 PM (GMT+6), Monday to Saturday. Email, phone, or visit us today.",
  url: "/contact-us",
  keywords: ["contact us", "customer support", "get in touch", "help", "feedback"],
})

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    description: "We're available 9 AM - 6 PM (GMT+6), Monday to Saturday",
    details: ["+880 1234-567890", "+880 1987-654321"],
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    details: ["support@friendstelecom.com", "hello@friendstelecom.com"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come to our main office",
    details: ["123 Tech Street, Gulshan, Dhaka 1212, Bangladesh"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "We're here to help",
    details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
]

export default function ContactUsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{info.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
                  <div className="mt-3 space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-xs font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <div className="mx-auto max-w-2xl">
          <ContactFormClient />
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Still have questions?</h2>
        <p className="mt-2 text-muted-foreground">
          Check out our <a href="/faqs" className="text-primary hover:underline">FAQs</a> for quick answers
        </p>
      </section>
    </div>
  )
}
