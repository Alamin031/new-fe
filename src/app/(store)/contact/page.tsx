import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with TechStore customer support.",
}

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "1800-123-4567",
    subtext: "Toll-free, 24/7",
  },
  {
    icon: Mail,
    title: "Email",
    content: "support@techstore.com",
    subtext: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Business Park, Tower A",
    subtext: "Mumbai, Maharashtra 400001",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 9AM - 9PM",
    subtext: "Sun: 10AM - 6PM",
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Have a question or need assistance? We&apos;re here to help. Reach out to us through any of the channels
          below.
        </p>
      </div>

      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((info) => (
          <Card key={info.title}>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <info.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{info.title}</h3>
              <p className="mt-1 font-medium">{info.content}</p>
              <p className="text-sm text-muted-foreground">{info.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Send us a message</h2>
                <p className="text-sm text-muted-foreground">We&apos;ll get back to you within 24 hours</p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order">Order Related</SelectItem>
                    <SelectItem value="product">Product Inquiry</SelectItem>
                    <SelectItem value="return">Return/Refund</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} required />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="h-[400px] overflow-hidden rounded-2xl bg-muted lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
