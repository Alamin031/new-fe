"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Truck, Shield, Tag, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Separator } from "../../components/ui/separator"
import { formatPrice } from "../../lib/utils/format"

const cartItems = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    variant: "256GB - Natural Titanium",
    image: "/placeholder.svg?key=ck1",
    price: 129999,
    quantity: 1,
  },
  {
    id: "2",
    name: "AirPods Pro 2",
    variant: "White",
    image: "/placeholder.svg?key=ck2",
    price: 24999,
    quantity: 1,
  },
]

const savedAddresses = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 98765 43210",
    type: "Home",
  },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showCoupon, setShowCoupon] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = Math.round(subtotal * 0.18)
  const discount = 5000
  const total = subtotal + shipping + tax - discount

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`relative rounded-lg border p-4 ${
                      selectedAddress === address.id ? "border-primary" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value={address.id} id={address.id} className="absolute right-4 top-4" />
                    <div className="pr-8">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-medium">{address.name}</span>
                        <span className="rounded bg-muted px-2 py-0.5 text-xs">{address.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{address.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{address.phone}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <Button variant="outline" className="mt-4 w-full bg-transparent">
                Add New Address
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div
                  className={`rounded-lg border p-4 ${paymentMethod === "card" ? "border-primary" : "border-border"}`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <span className="font-medium">Credit/Debit Card</span>
                      <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                    </Label>
                  </div>
                  {paymentMethod === "card" && (
                    <div className="mt-4 grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`rounded-lg border p-4 ${paymentMethod === "upi" ? "border-primary" : "border-border"}`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <span className="font-medium">UPI</span>
                      <p className="text-sm text-muted-foreground">Pay using UPI apps like GPay, PhonePe</p>
                    </Label>
                  </div>
                  {paymentMethod === "upi" && (
                    <div className="mt-4">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" className="mt-2" />
                    </div>
                  )}
                </div>

                <div
                  className={`rounded-lg border p-4 ${paymentMethod === "cod" ? "border-primary" : "border-border"}`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <span className="font-medium">Cash on Delivery</span>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                      <p className="mt-1 text-sm font-medium">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 flex w-full items-center justify-between text-sm"
                onClick={() => setShowCoupon(!showCoupon)}
              >
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Apply Coupon
                </span>
                {showCoupon ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showCoupon && (
                <div className="mt-3 flex gap-2">
                  <Input placeholder="Enter coupon code" className="flex-1" />
                  <Button variant="outline">Apply</Button>
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button className="mt-6 w-full" size="lg">
                Place Order
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secure checkout powered by SSL encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
