/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import {ArrowLeft, CheckCircle2, MapPin, Phone} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {Button} from '../../../../components/ui/button';
import {Badge} from '../../../../components/ui/badge';
import {Separator} from '../../../../components/ui/separator';
import {formatPrice} from '../../../../lib/utils/format';
import {withProtectedRoute} from '../../../../lib/auth/protected-route';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {ordersService} from '../../../../lib/api/services/orders';

// Map backend timeline to UI timeline
function mapOrderTimeline(tracking: {
  timeline?: {
    status?: string;
    date?: string;
    completed?: boolean;
    label?: string;
  }[];
}) {
  if (tracking && Array.isArray(tracking.timeline)) {
    let foundCurrent = false;
    return tracking.timeline.map(item => {
      let completed = false;
      if (item.completed !== undefined) {
        completed = item.completed;
      } else if (item.status) {
        // Mark all previous statuses as completed until the current one
        if (
          !foundCurrent &&
          ['delivered', 'cancelled', 'returned'].includes(item.status)
        ) {
          completed = true;
        } else if (!foundCurrent) {
          completed = true;
        } else {
          completed = false;
        }
      }
      if (
        item.status &&
        ['delivered', 'cancelled', 'returned'].includes(item.status)
      ) {
        foundCurrent = true;
      }
      return {
        status: item.status
          ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
          : item.label,
        date: item.date ? new Date(item.date).toLocaleString() : '',
        completed,
      };
    });
  }
  return [];
}

function OrderDetailPage() {
  // Download Invoice handler
  const handleDownloadInvoice = async () => {
    try {
      if (!tracking?.orderNumber) return;
      const invoice = await ordersService.generateInvoice(tracking.orderNumber);
      if (invoice?.pdfUrl) {
        window.open(invoice.pdfUrl, '_blank');
      } else if (invoice?.html) {
        // fallback: open HTML in new tab
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(invoice.html);
          newWindow.document.close();
        }
      } else {
        alert('Invoice not available.');
      }
    } catch {
      alert('Failed to download invoice.');
    }
  };
  const params = useParams();
  const orderId = params?.id;
  type Tracking = {
    id?: string;
    orderNumber: string;
    status: string;
    timeline?: {
      status?: string;
      date?: string;
      completed?: boolean;
      label?: string;
    }[];
    statusHistory?: {
      status?: string;
      date?: string;
      completed?: boolean;
      label?: string;
    }[];
    shippingAddress?: {
      fullName?: string;
      name?: string;
      address?: string;
      division?: string;
      district?: string;
      city?: string;
      upzila?: string;
      postCode?: string;
      pincode?: string;
      phone?: string;
    };
    paymentSummary?: {
      subtotal?: number;
      discount?: number;
      total?: number;
      paymentMethod?: string;
    };
    orderItems?: any[];
    items?: any[];
    customer?: {
      fullName?: string;
      name?: string;
      email?: string;
      phone?: string;
      division?: string;
      district?: string;
      city?: string;
      upzila?: string;
      postCode?: string;
      pincode?: string;
      address?: string;
      paymentMethod?: string;
      deliveryMethod?: string;
    };
    fullName?: string;
    name?: string;
    email?: string;
    phone?: string;
    division?: string;
    district?: string;
    city?: string;
    upzila?: string;
    postCode?: string;
    pincode?: string;
    address?: string;
    paymentMethod?: string;
    deliveryMethod?: string;
    subtotal?: number;
    discount?: number;
    total?: number;
    createdAt?: string;
    updatedAt?: string;
    paymentStatus?: string;
  } | null;

  const [tracking, setTracking] = useState<Tracking>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    // Use the new tracking endpoint for details page
    const fetchOrder = async () => {
      setLoading(true);
      const id = Array.isArray(orderId) ? orderId[0] : orderId;
      try {
        const data = await ordersService.track(id);
        setTracking(data);
        setError(null);
      } catch {
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="py-12 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="py-12 text-center text-red-500">{error}</div>;
  }
  if (!tracking) {
    return <div className="py-12 text-center">Order not found.</div>;
  }

  // Timeline: prefer timeline, fallback to statusHistory
  const timeline =
    Array.isArray(tracking?.timeline) && tracking.timeline.length > 0
      ? mapOrderTimeline(tracking)
      : Array.isArray(tracking?.statusHistory)
      ? mapOrderTimeline({timeline: tracking.statusHistory})
      : [];

  // Shipping address: prefer shippingAddress, then customer, then root fields, and support all possible field names
  const shippingAddress = (() => {
    if (tracking?.shippingAddress && typeof tracking.shippingAddress === 'object') {
      return tracking.shippingAddress;
    }
    if (tracking?.customer && typeof tracking.customer === 'object') {
      // Prefer customer fields, but fallback to root if missing
      return {
        fullName: tracking.customer.fullName || tracking.fullName,
        name: tracking.customer.name || tracking.name,
        address: tracking.customer.address || tracking.address,
        division: tracking.customer.division || tracking.division,
        district: tracking.customer.district || tracking.district,
        city: tracking.customer.city || tracking.city,
        upzila: tracking.customer.upzila || tracking.upzila,
        postCode: tracking.customer.postCode || tracking.postCode,
        pincode: tracking.customer.pincode || tracking.pincode,
        phone: tracking.customer.phone || tracking.phone,
      };
    }
    // fallback: build from root fields
    return {
      fullName: tracking?.fullName,
      name: tracking?.name,
      address: tracking?.address,
      division: tracking?.division,
      district: tracking?.district,
      city: tracking?.city,
      upzila: tracking?.upzila,
      postCode: tracking?.postCode,
      pincode: tracking?.pincode,
      phone: tracking?.phone,
    };
  })();

  // Payment summary: prefer paymentSummary, fallback to root fields and customer fields
  const paymentSummary = (() => {
    if (tracking?.paymentSummary && typeof tracking.paymentSummary === 'object') {
      return {
        ...tracking.paymentSummary,
        paymentMethod: tracking.paymentSummary.paymentMethod || tracking?.customer?.paymentMethod || tracking?.paymentMethod || '-',
      };
    }
    return {
      subtotal: tracking?.subtotal ?? tracking?.total ?? 0,
      discount: tracking?.discount ?? 0,
      total: tracking?.total ?? 0,
      paymentMethod: tracking?.customer?.paymentMethod || tracking?.paymentMethod || '-',
    };
  })();

  // Prefer orderItems if available, fallback to items
  const items =
    Array.isArray(tracking?.orderItems) && tracking.orderItems.length > 0
      ? tracking.orderItems
      : Array.isArray(tracking?.items)
      ? tracking.items
      : [];

  const discount = tracking?.paymentSummary?.discount ?? 0;
  console.log(`Discount: ${discount}`);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/account/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {tracking.orderNumber || orderId}
          </h1>
          {/* You can add placed date if available */}
        </div>
        <Badge
          className="ml-auto bg-green-500/10 text-green-600 border-green-200"
          variant="outline">
          {tracking.status
            ? tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1)
            : '-'}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6">
                {timeline.length === 0 ? (
                  <div className="text-muted-foreground">
                    No timeline available
                  </div>
                ) : (
                  timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            event.completed
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                          {event.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-current" />
                          )}
                        </div>
                        {index < timeline.length - 1 && (
                          <div
                            className={`absolute top-8 h-full w-0.5 ${
                              event.completed ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-medium">
                  {shippingAddress.fullName || shippingAddress.name || '-'}
                </p>
                <p className="text-muted-foreground">
                  {shippingAddress.address || '-'}
                </p>
                <p className="text-muted-foreground">
                  {shippingAddress.division || '-'},{' '}
                  {shippingAddress.district || shippingAddress.city || '-'} -{' '}
                  {shippingAddress.postCode || shippingAddress.pincode || '-'}
                </p>
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {shippingAddress.phone || '-'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(paymentSummary.subtotal || 0)}</span>
              </div>

              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(paymentSummary.total || 0)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Paid via {paymentSummary.paymentMethod || '-'}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleDownloadInvoice}>
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtectedRoute(OrderDetailPage, {
  requiredRoles: ['user'],
});
