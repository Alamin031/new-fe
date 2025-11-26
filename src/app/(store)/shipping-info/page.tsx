import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Truck, Clock, MapPin, AlertCircle, Check } from "lucide-react"

const shippingOptions = [
  {
    type: "Standard Delivery",
    time: "3-7 Business Days",
    cost: "৳120 (Free on orders above ৳5,000)",
    coverage: "All of Bangladesh",
    description: "Our most economical shipping option, perfect for non-urgent deliveries.",
  },
  {
    type: "Express Delivery",
    time: "1-2 Business Days",
    cost: "৳300-500 (Based on location)",
    coverage: "Dhaka & Major Cities",
    description: "Fast and reliable delivery for time-sensitive purchases.",
  },
  {
    type: "Same Day Delivery",
    time: "Same Day (by 6 PM)",
    cost: "৳599",
    coverage: "Dhaka Metro Area Only",
    description: "Order before 2 PM for same-day delivery to your doorstep.",
  },
]

const shippingProcess = [
  {
    step: 1,
    title: "Order Confirmation",
    description: "Your order is confirmed and payment is verified.",
  },
  {
    step: 2,
    title: "Preparation",
    description: "We carefully pack your items with protective materials.",
  },
  {
    step: 3,
    title: "Dispatch",
    description: "Your package is handed to our courier partner with tracking number.",
  },
  {
    step: 4,
    title: "In Transit",
    description: "You can track your package in real-time via SMS and email updates.",
  },
  {
    step: 5,
    title: "Delivery",
    description: "Your package is delivered to your doorstep with verification.",
  },
]

const serviceAreas = [
  { district: "Dhaka", time: "1-2 days (Express)", coverage: "All areas" },
  { district: "Chittagong", time: "2-3 days", coverage: "All areas" },
  { district: "Sylhet", time: "3-4 days", coverage: "City areas" },
  { district: "Khulna", time: "3-5 days", coverage: "City areas" },
  { district: "Rajshahi", time: "3-5 days", coverage: "City areas" },
  { district: "Barisal", time: "4-5 days", coverage: "City areas" },
]

export default function ShippingInfoPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Shipping Information</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fast, reliable delivery across Bangladesh
        </p>
      </section>

      {/* Shipping Options */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Shipping Options</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {shippingOptions.map((option, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {option.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivery Time</p>
                  <p className="text-lg font-semibold">{option.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cost</p>
                  <p className="text-lg font-semibold">{option.cost}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coverage</p>
                  <p className="text-lg font-semibold">{option.coverage}</p>
                </div>
                <p className="pt-3 text-sm text-muted-foreground">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Shipping Process */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">How Shipping Works</h2>
        <div className="space-y-4">
          {shippingProcess.map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {item.step}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Service Areas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">District</th>
                <th className="px-4 py-3 text-left font-semibold">Delivery Time</th>
                <th className="px-4 py-3 text-left font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {serviceAreas.map((area) => (
                <tr key={area.district} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{area.district}</td>
                  <td className="px-4 py-3">{area.time}</td>
                  <td className="px-4 py-3">{area.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shipping Tips */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Shipping Tips</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <Check className="h-5 w-5 shrink-0 text-green-600" />
              <div>
                <h3 className="font-semibold">Secure Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  We use premium protective materials to ensure your items arrive safely.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <Check className="h-5 w-5 shrink-0 text-green-600" />
              <div>
                <h3 className="font-semibold">Real-Time Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track your order every step of the way via SMS and email.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <Check className="h-5 w-5 shrink-0 text-green-600" />
              <div>
                <h3 className="font-semibold">Free Returns</h3>
                <p className="text-sm text-muted-foreground">
                  We arrange free pickup for returns within 7 days.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <Check className="h-5 w-5 shrink-0 text-green-600" />
              <div>
                <h3 className="font-semibold">Verified Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  All deliveries are verified for authenticity and condition.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Notes */}
      <section>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex gap-4 pt-6">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-semibold text-amber-900">Important to Know</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                <li>• Delivery times are estimates and may vary based on location and circumstances</li>
                <li>• Orders placed after 2 PM are processed next business day</li>
                <li>• We recommend signature confirmation for high-value items</li>
                <li>• Please verify package contents upon delivery before accepting</li>
                <li>• Keep your tracking number safe for reference</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
