/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, ChevronRight, Search, Filter, Map } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { formatPrice } from "../../../lib/utils/format"
// import { useOrderTrackingStore } from "../../../store/order-tracking-store"
import { ordersService } from "../../../lib/api/services"
import type { Order } from "../../../lib/api/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { withProtectedRoute } from "../../../lib/auth/protected-route"
import { OrderTrackingModal } from "@/app/components/order/order-tracking-modal"
import { useAuthStore } from "@/app/store/auth-store"



function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "order placed":
      return "bg-gray-500/10 text-gray-600 border-gray-200";
    case "processing":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "preparing to ship":
      return "bg-orange-500/10 text-orange-600 border-orange-200";
    case "shipped":
      return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "delivered":
      return "bg-green-500/10 text-green-600 border-green-200";
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-200";
    case "returned":
      return "bg-purple-500/10 text-purple-600 border-purple-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

interface OrderWithStatus {
  id: string;
  orderNumber?: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    productId?: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    slug?: string;
  }>;
}

function OrderCard({ order }: { order: OrderWithStatus }) {
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrackOrder = () => {
    // Build tracking data from the order object we already have
    const trackingData = {
      orderId: order.id,
      currentStatus: order.status.toLowerCase(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: order.orderNumber || order.id,
      carrier: "Standard Delivery",
      statusHistory: [
        {
          status: order.status.toLowerCase(),
          timestamp: order.date,
          message: `Order is currently ${order.status.toLowerCase()}`,
          location: "",
        },
      ],
      from: {
        name: "Friend's Telecom",
        address: "Bashundhara City Shopping Complex Basement 2, Shop 25, Dhaka, Bangladesh"
      }
    };
    setTrackingData(trackingData);
    setTrackingModalOpen(true);
  };

  // Show first product's name and image at the top
  const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
  return (
    <>
      <Card key={order.id} className="shadow-sm border border-border/60 hover:shadow-md transition-shadow rounded-xl">
        <CardContent className="p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-base text-foreground">
                  Order #{order.orderNumber || order.id}
                </p>
                <Badge className={getStatusColor(order.status)} variant="outline">
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Ordered on {order.date} · {order.items.length} {order.items.length === 1 ? "item" : "items"}
              </p>
              {firstItem?.name && (
                <p className="text-sm font-medium text-foreground/80">{firstItem.name}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{formatPrice(order.total)}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 rounded-xl bg-muted/30 border border-border/60 p-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background border">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
            <Link href={`/account/orders/${order.id}`}>
              <Button variant="outline" size="sm" className="gap-1">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="black"
              size="sm"
              className="gap-1"
              onClick={handleTrackOrder}
            >
              <Map className="h-4 w-4" />
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Modal */}
      <Dialog open={trackingModalOpen} onOpenChange={setTrackingModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
          </DialogHeader>
          {trackingData && (
            <>
              <OrderTrackingModal
                tracking={trackingData}
                productName={firstItem?.name}
                productImage={firstItem?.image}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}


function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state: any) => state.user);
  const [tab, setTab] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        if (user && user.email) {
          const res = await ordersService.getByCustomerEmail(user.email);
          setOrders(Array.isArray(res) ? res : []);
        } else {
          setOrders([]);
        }
        setError(null);
      } catch {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const term = searchTerm.trim().toLowerCase();
  const filteredOrders = orders.filter((order: any) => {
    if (!term) return true;
    const idMatch =
      order.orderNumber?.toLowerCase().includes(term) ||
      order.id?.toLowerCase().includes(term);

    const items = Array.isArray(order.orderItems) ? order.orderItems : [];
    const itemMatch = items.some((it: any) => {
      const name = (it.productName || it.name || "").toLowerCase();
      return name.includes(term);
    });

    return idMatch || itemMatch;
  });

  // Map API orderItems to items for UI
  const mapOrder = (order: any) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "",
    status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "",
    total: order.total,
    items: (order.orderItems || []).map((item: any) => ({
      productId: item.productId,
      name: item.productName || item.name || "",
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      slug: item.slug || "",
    })),
  });

  const groupedOrders = {
    all: filteredOrders.map(mapOrder),
    processing: filteredOrders.filter((o) => (o.status || "").toLowerCase() === "processing").map(mapOrder),
    shipped: filteredOrders.filter((o) => (o.status || "").toLowerCase() === "shipped").map(mapOrder),
    delivered: filteredOrders.filter((o) => (o.status || "").toLowerCase() === "delivered").map(mapOrder),
  };

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
          <p className="text-sm text-muted-foreground">Track and manage your orders.</p>
        </div>
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-100">Dashboard</Badge>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-10"
            onClick={() => setFilterOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={filterOpen}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-border/60 bg-background shadow-md z-50">
              <div className="py-1">
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => { setTab("all"); setFilterOpen(false); }}
                >
                  All Orders
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => { setTab("processing"); setFilterOpen(false); }}
                >
                  Processing
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => { setTab("shipped"); setFilterOpen(false); }}
                >
                  Shipped
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => { setTab("delivered"); setFilterOpen(false); }}
                >
                  Delivered
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="mb-4 h-12 w-12 text-red-400" />
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
            <TabsTrigger value="all" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All Orders
            </TabsTrigger>
            <TabsTrigger value="processing" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Processing
            </TabsTrigger>
            <TabsTrigger value="shipped" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Shipped
            </TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Delivered
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-4">
            {groupedOrders.all.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No orders found</p>
              </div>
            ) : (
              groupedOrders.all.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            {groupedOrders.processing.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No processing orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {groupedOrders.processing.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            {groupedOrders.shipped.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No shipped orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {groupedOrders.shipped.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            {groupedOrders.delivered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No delivered orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {groupedOrders.delivered.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default withProtectedRoute(OrdersPage, {
  requiredRoles: ["user"],
})
