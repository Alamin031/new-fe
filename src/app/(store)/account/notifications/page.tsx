/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Bell, Package, Tag, CreditCard, Megaphone, Check, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Switch } from "../../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { withProtectedRoute } from "../../../lib/auth/protected-route"
import { notificationService } from "../../../lib/api/services/notify"
import { useAuthStore } from "../../../store/auth-store"

// Notification icon mapping (API types are likely uppercase, but fallback to string match)
const notificationIconMap: Record<string, any> = {
  ORDER_UPDATE: Package,
  PROMOTION: Tag,
  PAYMENT: CreditCard,
  GIVEAWAY: Megaphone,
  SYSTEM: Bell,
  PRODUCT_STOCK_OUT: Bell,
  'order_update': Package,
  'promotion': Tag,
  'payment': CreditCard,
  'giveaway': Megaphone,
  'system': Bell,
  'product_stock_out': Bell,
};

const notificationSettings = [
  { id: "orders", label: "Order Updates", description: "Get notified about your order status", enabled: true },
  {
    id: "promotions",
    label: "Promotions & Offers",
    description: "Receive exclusive deals and discounts",
    enabled: true,
  },
  { id: "payments", label: "Payment Alerts", description: "Get notified about payment activities", enabled: true },
  { id: "newsletter", label: "Newsletter", description: "Weekly updates on new products", enabled: false },
]


function NotificationsPage() {
  const user = useAuthStore((state) => state.user);
  type Notification = {
    id: string;
    type?: string;
    icon: React.ElementType;
    title: string;
    message: string;
    time: string;
    read: boolean;
    [key: string]: any;
  };
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [settings, setSettings] = useState(notificationSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const data = await notificationService.getHeader({ userId: user.email });
        // Attach icon to each notification based on type
        const mapped = (data || []).map((n: any) => {
          // Normalize type for icon mapping
          const typeKey = (n.type || '').toUpperCase();
          const icon = notificationIconMap[typeKey] || notificationIconMap[(n.type || '').toLowerCase()] || Bell;
          return {
            ...n,
            icon,
            title: n.title || n.type || 'Notification',
            message: n.message || '',
            time: n.createdAt ? new Date(n.createdAt).toLocaleString() : '',
            read: !!n.read,
          };
        });
        setNotifs(mapped);
        setError(null);
      } catch {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const markAllAsRead = () => {
    setNotifs(notifs.map((n: any) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifs(notifs.filter((n: any) => n.id !== id));
  };

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const unreadCount = notifs.filter((n: any) => !n.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Manage your notifications and preferences.</p>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        <TabsContent value="all" className="mt-6 space-y-4">
          {loading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Loading notifications...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-red-400" />
                <p className="text-red-500">{error}</p>
              </CardContent>
            </Card>
          ) : notifs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          ) : (
            notifs.map((notification: any) => (
              <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      notification.read ? "bg-muted" : "bg-primary/10"
                    }`}
                  >
                    <notification.icon
                      className={`h-5 w-5 ${notification.read ? "text-muted-foreground" : "text-primary"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!notification.read && <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6 space-y-4">
          {loading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Check className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Loading notifications...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Check className="mb-4 h-12 w-12 text-red-400" />
                <p className="text-red-500">{error}</p>
              </CardContent>
            </Card>
          ) : notifs.filter((n: any) => !n.read).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Check className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">All caught up!</p>
              </CardContent>
            </Card>
          ) : (
            notifs
              .filter((n: any) => !n.read)
              .map((notification: any) => (
                <Card key={notification.id}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <notification.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withProtectedRoute(NotificationsPage, {
  requiredRoles: ["user"],
})
