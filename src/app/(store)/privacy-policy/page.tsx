import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TechStore privacy policy and data protection information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mb-8 text-muted-foreground">Last updated: November 2024</p>

      <div className="prose prose-neutral max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            TechStore (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
            website or make a purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
          <p className="mb-4 text-muted-foreground">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Personal information (name, email address, phone number)</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (credit card details are processed securely by our payment partners)</li>
            <li>Order history and preferences</li>
            <li>Communications you send to us</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
          <p className="mb-4 text-muted-foreground">We use the information we collect to:</p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your inquiries and customer service requests</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Information Sharing</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We may share your information with third-party service providers
            who assist us in operating our website, conducting our business, or serving you, as long as those parties
            agree to keep this information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. This includes SSL encryption, secure payment processing, and regular
            security assessments.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic,
            and understand where our visitors are coming from. You can control cookie settings through your browser
            preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>
          <p className="mb-4 text-muted-foreground">You have the right to:</p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@techstore.com
            <br />
            Phone: 1800-123-4567
          </p>
        </section>
      </div>
    </div>
  )
}
