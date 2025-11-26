"use client"

import Link from "next/link"
import { Package, MapPin, Heart, CreditCard, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { formatPrice } from "../../lib/utils/format"
import { useAuthStore } from "@/app/store/auth-store"

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "Nov 20, 2024",
    status: "Delivered",
    total: 129999,
    items: 2,
  },
  {
    id: "ORD-2024-002",
    date: "Nov 15, 2024",
    status: "Shipped",
    total: 49999,
    items: 1,
  },
  {
    id: "ORD-2024-003",
    date: "Nov 10, 2024",
    status: "Processing",
    total: 79999,
    items: 3,
  },
]

const quickStats = [
  { label: "Total Orders", value: "12", icon: Package },
  { label: "Wishlist Items", value: "5", icon: Heart },
  { label: "Saved Addresses", value: "2", icon: MapPin },
  { label: "Wallet Balance", value: formatPrice(2500), icon: CreditCard },
]

export default function AccountPage() {
  const { user } = useAuthStore()
  const firstName = user?.name?.split(" ")[0] || "User"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Orders
          </CardTitle>
          <Link href="/account/orders">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                  <p className="mt-1 font-semibold">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rewards & Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-center">
              <p className="text-4xl font-bold text-primary">1,250</p>
              <p className="text-muted-foreground">Available Points</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Points earned this month</span>
                <span className="font-medium">+350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Points redeemed</span>
                <span className="font-medium">-100</span>
              </div>
            </div>
            <Button className="mt-4 w-full bg-transparent" variant="outline">
              Redeem Points
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/account/orders">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Package className="h-4 w-4" />
                Track My Orders
              </Button>
            </Link>
            <Link href="/account/addresses">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <MapPin className="h-4 w-4" />
                Manage Addresses
              </Button>
            </Link>
            <Link href="/account/wishlist">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Heart className="h-4 w-4" />
                View Wishlist
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
