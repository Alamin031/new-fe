import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Shield, CheckCircle, AlertCircle, Clock, FileText } from "lucide-react"

const warrantyTypes = [
  {
    type: "Standard Warranty",
    duration: "1 Year",
    coverage: [
      "Manufacturing defects",
      "Hardware malfunctions",
      "Software issues (factory reset)",
      "Battery performance issues (if below 80%)",
      "Free repair or replacement",
    ],
    excludes: [
      "Physical damage from drops/falls",
      "Water damage (unless water-resistant model)",
      "Unauthorized modifications",
      "Normal wear and tear",
      "Accidental damage",
    ],
  },
  {
    type: "Care+ Extended Warranty",
    duration: "2 Years",
    cost: "8% of product price",
    coverage: [
      "Everything in standard warranty",
      "Accidental damage from drops",
      "Liquid damage (coffee, water, etc.)",
      "Screen replacement coverage",
      "Battery degradation coverage",
      "Free pickup and repair",
      "Priority service",
    ],
    excludes: [
      "Extreme abuse or misuse",
      "Intentional damage",
      "Modifications not by us",
      "Normal cosmetic wear",
    ],
  },
]

const claimProcess = [
  {
    step: 1,
    title: "Contact Support",
    description:
      "Reach out to our warranty team with your product details and warranty number.",
  },
  {
    step: 2,
    title: "Provide Documentation",
    description: "Share photos of the issue, invoice, and warranty card if applicable.",
  },
  {
    step: 3,
    title: "Arrange Service",
    description:
      "We'll arrange free pickup and provide a service reference number.",
  },
  {
    step: 4,
    title: "Inspection & Repair",
    description:
      "Our technicians inspect and repair or replace your device.",
  },
  {
    step: 5,
    title: "Return & Support",
    description: "Your device is returned with full functionality restored.",
  },
]

const coverageTable = [
  {
    component: "Display/Screen",
    standard: "✓ Manufacturing defects only",
    careplus: "✓ Cracks, damage covered",
  },
  {
    component: "Battery",
    standard: "✓ Below 80% capacity",
    careplus: "✓ Any degradation",
  },
  {
    component: "Motherboard",
    standard: "✓ Manufacturing defects",
    careplus: "✓ Manufacturing defects",
  },
  {
    component: "Camera",
    standard: "✓ Manufacturing defects",
    careplus: "✓ Manufacturing & accidental damage",
  },
  {
    component: "Buttons/Ports",
    standard: "✓ Manufacturing defects",
    careplus: "✓ Manufacturing & accidental damage",
  },
  {
    component: "Water Damage",
    standard: "✗ Not covered",
    careplus: "✓ Covered (accidental immersion)",
  },
]

export default function WarrantyPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Warranty & Protection</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive coverage for your peace of mind
        </p>
      </section>

      {/* Warranty Types */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Warranty Options</h2>
        <div className="space-y-6">
          {warrantyTypes.map((warranty, idx) => (
            <Card key={idx} className={idx === 1 ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {warranty.type}
                    </CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Duration: {warranty.duration}
                      {warranty.cost && ` • Cost: ${warranty.cost}`}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3 font-semibold">What's Covered</h4>
                  <ul className="space-y-2">
                    {warranty.coverage.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">What's Not Covered</h4>
                  <ul className="space-y-2">
                    {warranty.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Coverage Table */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Component Coverage Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Component</th>
                <th className="px-6 py-3 text-left font-semibold">Standard Warranty</th>
                <th className="px-6 py-3 text-left font-semibold">Care+ Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coverageTable.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 font-medium">{row.component}</td>
                  <td className="px-6 py-4">{row.standard}</td>
                  <td className="px-6 py-4">{row.careplus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Warranty Claim Process */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">How to File a Warranty Claim</h2>
        <div className="space-y-4">
          {claimProcess.map((item) => (
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

      {/* What You Need */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Documents You'll Need</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Original Invoice</h3>
                <p className="text-sm text-muted-foreground">
                  Purchase receipt or order confirmation email
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Warranty Card</h3>
                <p className="text-sm text-muted-foreground">
                  Original warranty card or certificate (if applicable)
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Product Photos</h3>
                <p className="text-sm text-muted-foreground">
                  Clear photos showing the defect or damage
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Serial Number</h3>
                <p className="text-sm text-muted-foreground">
                  IMEI or serial number from your device
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Warranty Timeline */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Warranty Service Timeline</h2>
        <div className="space-y-3">
          <div className="flex gap-4 rounded-lg bg-muted/50 p-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Claim Submission</p>
              <p className="text-sm text-muted-foreground">Within 7 days of issue discovery</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-lg bg-muted/50 p-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Device Inspection</p>
              <p className="text-sm text-muted-foreground">2-3 business days</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-lg bg-muted/50 p-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Repair/Replacement</p>
              <p className="text-sm text-muted-foreground">3-5 business days (subject to parts availability)</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-lg bg-muted/50 p-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Device Return</p>
              <p className="text-sm text-muted-foreground">2-3 business days delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex gap-4 pt-6">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-semibold text-amber-900">Important to Remember</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                <li>• Warranty is non-transferable</li>
                <li>• Tampered or opened seals void warranty</li>
                <li>• Original packaging required for some claims</li>
                <li>• Warranty does not cover software issues post-factory reset</li>
                <li>• Cosmetic damage is not covered under standard warranty</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
