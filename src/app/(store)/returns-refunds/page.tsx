import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { RotateCcw, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

const returnSteps = [
  {
    step: 1,
    title: "Initiate Return",
    description: "Contact us within 7 days of delivery with your order number.",
  },
  {
    step: 2,
    title: "Get Return Authorization",
    description: "We'll provide you with a return authorization number and shipping label.",
  },
  {
    step: 3,
    title: "Ship Back",
    description: "Package your item safely and ship it back using the provided label.",
  },
  {
    step: 4,
    title: "Inspection",
    description: "We'll inspect your return and verify the condition within 2-3 days.",
  },
  {
    step: 5,
    title: "Refund Processed",
    description: "Once verified, your refund is processed within 5-7 business days.",
  },
]

const returnPolicy = [
  {
    condition: "Unopened Items",
    timeframe: "7 Days from delivery",
    refund: "100% Refund",
    details: "Full refund including original shipping. Return shipping is free.",
  },
  {
    condition: "Opened Items",
    timeframe: "3 Days from delivery",
    refund: "90% Refund",
    details: "Refund minus 10% restocking fee. Return shipping is free.",
  },
  {
    condition: "Damaged Items",
    timeframe: "3 Days from delivery",
    refund: "100% Refund",
    details: "Full refund for items damaged in transit. Report immediately upon delivery.",
  },
  {
    condition: "Defective Items",
    timeframe: "Lifetime",
    refund: "Warranty Coverage",
    details: "Covered under manufacturer warranty. Repair or replacement provided.",
  },
]

const excludedItems = [
  "Items returned after 7 days",
  "Used or heavily damaged items",
  "Items missing original packaging/accessories",
  "Custom built/configured items",
  "Clearance or final sale items",
  "Digital products (once accessed)",
]

export default function ReturnsRefundsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Returns & Refunds</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our hassle-free return policy ensures your satisfaction
        </p>
      </section>

      {/* Quick Summary */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex gap-4 pt-6">
            <RotateCcw className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">7-Day Returns</h3>
              <p className="text-sm text-muted-foreground">
                Return unopened items within 7 days for full refund
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex gap-4 pt-6">
            <Truck className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Free Returns</h3>
              <p className="text-sm text-muted-foreground">
                We arrange free pickup and provide return shipping label
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex gap-4 pt-6">
            <Clock className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Quick Refunds</h3>
              <p className="text-sm text-muted-foreground">
                Refunds processed within 5-7 business days after verification
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Return Steps */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">How to Return an Item</h2>
        <div className="space-y-4">
          {returnSteps.map((item) => (
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

      {/* Return Policy Table */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Return Policy Details</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Condition</th>
                <th className="px-6 py-3 text-left font-semibold">Timeframe</th>
                <th className="px-6 py-3 text-left font-semibold">Refund Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {returnPolicy.map((policy, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 font-medium">{policy.condition}</td>
                  <td className="px-6 py-4">{policy.timeframe}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">{policy.refund}</td>
                  <td className="px-6 py-4 text-muted-foreground">{policy.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Exclusions */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">What Cannot Be Returned</h2>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">Non-Returnable Items:</p>
                <ul className="mt-3 space-y-2">
                  {excludedItems.map((item, idx) => (
                    <li key={idx} className="text-sm text-red-800">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Return Conditions */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Return Conditions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Acceptable Condition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Original sealed packaging (unopened items)</li>
                <li>✓ All original accessories and documentation included</li>
                <li>✓ No physical damage or defects</li>
                <li>✓ Original receipt and box in good condition</li>
                <li>✓ Within return timeframe</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Unacceptable Condition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✗ Heavily used or worn items</li>
                <li>✗ Missing original accessories</li>
                <li>✗ Visible damage or defects</li>
                <li>✗ Signs of water damage</li>
                <li>✗ Returned after specified timeframe</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Refund Methods */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Refund Methods</h2>
        <p className="mb-4 text-muted-foreground">
          Refunds are issued to your original payment method:
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Bank Transfers:</span> 5-7 business days
          </p>
          <p>
            <span className="font-medium">Card Payments:</span> 5-7 business days (may appear as credit on statement)
          </p>
          <p>
            <span className="font-medium">Mobile Payments (bKash/Nagad):</span> 1-2 business days
          </p>
          <p>
            <span className="font-medium">Cash on Delivery:</span> Refund via bank transfer
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Need to Start a Return?</h2>
        <p className="mt-2 text-muted-foreground">
          Contact our support team to initiate your return process
        </p>
        <Link href="/contact-us">
          <Button className="mt-6">Contact Support</Button>
        </Link>
      </section>
    </div>
  )
}
