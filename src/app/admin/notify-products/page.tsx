"use client"

import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Checkbox } from "../../components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AlertCircle, Trash2, CheckCircle2, Clock, Filter, MoreVertical } from "lucide-react"
import { useProductNotifyStore, ProductNotification } from "@/store/product-notify-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

export default function NotifyProductsPage() {
  const { notifications, markAsResolved, removeNotification } = useProductNotifyStore()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const pendingNotifications = notifications.filter((n) => n.status === "pending")
  const resolvedNotifications = notifications.filter((n) => n.status === "resolved")

  const handleSelectAll = (checked: boolean, items: ProductNotification[]) => {
    if (checked) {
      setSelectedIds([...selectedIds, ...items.map((n) => n.id).filter((id) => !selectedIds.includes(id))])
    } else {
      const itemIds = items.map((n) => n.id)
      setSelectedIds(selectedIds.filter((id) => !itemIds.includes(id)))
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id))
    }
  }

  const handleDeleteMultiple = () => {
    selectedIds.forEach((id) => removeNotification(id))
    setSelectedIds([])
  }

  const handleMarkAsResolved = (id: string) => {
    markAsResolved(id)
  }

  const handleDelete = (id: string) => {
    removeNotification(id)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Notifications</h1>
          <p className="text-muted-foreground">Manage product notifications from users</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="pending">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="pending">
                  Pending ({pendingNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved ({resolvedNotifications.length})
                </TabsTrigger>
              </TabsList>
              {selectedIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
                  <Button size="sm" variant="outline" onClick={() => setSelectedIds([])}>
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDeleteMultiple}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <TabsContent value="pending">
              {pendingNotifications.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50">
                  <AlertCircle className="h-12 w-12 text-muted-foreground/40" />
                  <p className="text-muted-foreground">No pending notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4 hover:bg-card transition-colors"
                    >
                      <Checkbox
                        checked={selectedIds.includes(notification.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(notification.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm break-words">{notification.productName}</p>
                            <p className="text-xs text-muted-foreground">Product ID: {notification.productId}</p>
                          </div>
                          <Badge className="ml-2 shrink-0">New</Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          <p className="text-sm">{notification.message}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div>
                              <p className="font-medium">{notification.userName}</p>
                              <p>{notification.userEmail}</p>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(notification.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleMarkAsResolved(notification.id)}
                            className="gap-1.5"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Mark as Resolved
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(notification.id)}
                            className="gap-1.5"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleMarkAsResolved(notification.id)}
                            className="gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Mark as Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(notification.id)}
                            className="gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="resolved">
              {resolvedNotifications.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground/40" />
                  <p className="text-muted-foreground">No resolved notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resolvedNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4 opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <Checkbox
                        checked={selectedIds.includes(notification.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(notification.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm break-words line-through">{notification.productName}</p>
                            <p className="text-xs text-muted-foreground">Product ID: {notification.productId}</p>
                          </div>
                          <Badge variant="outline" className="ml-2 shrink-0 bg-green-50 text-green-700 border-green-200">
                            Resolved
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          <p className="text-sm">{notification.message}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div>
                              <p className="font-medium">{notification.userName}</p>
                              <p>{notification.userEmail}</p>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(notification.updatedAt)}
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(notification.id)}
                          className="gap-1.5"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDelete(notification.id)}
                            className="gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
