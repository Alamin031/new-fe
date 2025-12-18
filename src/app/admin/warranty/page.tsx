"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Label } from "../../components/ui/label"
import { Plus, Search, Eye, Trash2, AlertCircle, CheckCircle, MoreVertical, X } from "lucide-react"
import { warrantyService } from "../../lib/api/services"
import type { Warranty, ActivateWarrantyRequest, WarrantyLog } from "../../lib/api/types"
import { withProtectedRoute } from "../../lib/auth/protected-route"
import { toast } from "sonner"
import { formatPrice } from "../../lib/utils/format"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

interface WarrantyWithExtras extends Warranty {
  product?: { name: string; sku?: string }
  order?: { orderNumber: string }
}

function AdminWarrantyPage() {
  const [warranties, setWarranties] = useState<WarrantyWithExtras[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Form states
  const [formOpen, setFormOpen] = useState(false)
  const [logsOpen, setLogsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyWithExtras | null>(null)
  const [logsData, setLogsData] = useState<WarrantyLog[]>([])
  const [logsLoading, setLogsLoading] = useState(false)

  const [formData, setFormData] = useState<ActivateWarrantyRequest>({
    orderId: "",
    productId: "",
    imei: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch warranties on mount
  useEffect(() => {
    fetchWarranties()
  }, [])

  const fetchWarranties = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await warrantyService.getAll(1, 100)
      let fetchedWarranties: any[] = []

      if (Array.isArray(res)) {
        fetchedWarranties = res
      } else if (res && res.data && Array.isArray(res.data)) {
        fetchedWarranties = res.data
      }

      setWarranties(fetchedWarranties)
    } catch (err) {
      setError("Failed to load warranties. Please try again.")
      console.error("Error fetching warranties:", err)
      // Fallback to mock data if API fails
      setWarranties(generateMockWarranties())
    } finally {
      setLoading(false)
    }
  }

  const generateMockWarranties = (): WarrantyWithExtras[] => {
    return [
      {
        id: "WRN-001",
        orderId: "ORD-001",
        productId: "PROD-001",
        imei: "123456789012345",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
        logs: [],
        createdAt: new Date().toISOString(),
        product: { name: "iPhone 15 Pro", sku: "SKU001" },
        order: { orderNumber: "ORD-2024-001" },
      },
      {
        id: "WRN-002",
        orderId: "ORD-002",
        productId: "PROD-002",
        imei: "987654321098765",
        startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
        status: "expired",
        logs: [],
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        product: { name: "Samsung Galaxy S23", sku: "SKU002" },
        order: { orderNumber: "ORD-2024-002" },
      },
    ]
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.orderId.trim()) {
      errors.orderId = "Order ID is required"
    }
    if (!formData.productId.trim()) {
      errors.productId = "Product ID is required"
    }
    if (!formData.imei.trim()) {
      errors.imei = "IMEI is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleAddWarranty = () => {
    setIsEditing(false)
    setFormData({ orderId: "", productId: "", imei: "" })
    setFormErrors({})
    setFormOpen(true)
  }

  const handleEditWarranty = (warranty: WarrantyWithExtras) => {
    setIsEditing(true)
    setSelectedWarranty(warranty)
    setFormData({
      orderId: warranty.orderId,
      productId: warranty.productId,
      imei: warranty.imei,
    })
    setFormErrors({})
    setFormOpen(true)
  }

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setFormSubmitting(true)
    try {
      if (isEditing && selectedWarranty) {
        await warrantyService.update(selectedWarranty.id, formData)
        toast.success("Warranty updated successfully")
      } else {
        await warrantyService.add(formData)
        toast.success("Warranty added successfully")
      }

      setFormOpen(false)
      await fetchWarranties()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save warranty"
      setFormErrors({ submit: message })
      toast.error(message)
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleViewLogs = async (warranty: WarrantyWithExtras) => {
    setSelectedWarranty(warranty)
    setLogsLoading(true)
    setLogsData([])

    try {
      const res = await warrantyService.getLogs(warranty.id, 1, 50)
      let logs: WarrantyLog[] = []

      if (Array.isArray(res)) {
        logs = res
      } else if (res && res.data && Array.isArray(res.data)) {
        logs = res.data
      }

      setLogsData(logs)
    } catch (err) {
      console.error("Error fetching logs:", err)
      setLogsData([])
    } finally {
      setLogsLoading(false)
      setLogsOpen(true)
    }
  }

  const handleDeleteWarranty = async () => {
    if (!selectedWarranty) return

    setFormSubmitting(true)
    try {
      await warrantyService.delete(selectedWarranty.id)
      toast.success("Warranty deleted successfully")
      setDeleteOpen(false)
      await fetchWarranties()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete warranty"
      toast.error(message)
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleDeleteClick = (warranty: WarrantyWithExtras) => {
    setSelectedWarranty(warranty)
    setDeleteOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600"
      case "expired":
        return "bg-red-500/10 text-red-600"
      case "claimed":
        return "bg-blue-500/10 text-blue-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Filter warranties
  const filteredWarranties = warranties.filter((warranty) => {
    const matchesSearch =
      warranty.imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.productId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || warranty.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warranty Management</h1>
          <p className="text-muted-foreground">Manage product warranties and activations.</p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading warranties...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warranty Management</h1>
          <p className="text-muted-foreground">Manage product warranties and activations.</p>
        </div>
        <Button onClick={handleAddWarranty} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Warranty
        </Button>
      </div>

      {error && (
        <div className="flex gap-2 rounded-lg bg-yellow-500/10 p-3 text-sm text-yellow-600">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by IMEI, Order ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="claimed">Claimed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredWarranties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" ? "No warranties found matching your filters." : "No warranties found. Create one to get started."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4">IMEI</th>
                    <th className="pb-3 pr-4">Product</th>
                    <th className="pb-3 pr-4">Order ID</th>
                    <th className="pb-3 pr-4">Start Date</th>
                    <th className="pb-3 pr-4">End Date</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWarranties.map((warranty) => (
                    <tr key={warranty.id} className="border-b border-border">
                      <td className="py-4 pr-4">
                        <span className="font-mono text-sm font-medium">{warranty.imei}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <div>
                          <p className="font-medium">
                            {warranty.product?.name || "Unknown Product"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {warranty.product?.sku || warranty.productId}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="font-medium">{warranty.orderId}</p>
                      </td>
                      <td className="py-4 pr-4 text-sm">
                        {formatDate(warranty.startDate)}
                      </td>
                      <td className="py-4 pr-4 text-sm">
                        {formatDate(warranty.endDate)}
                      </td>
                      <td className="py-4 pr-4">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(warranty.status)}
                        >
                          {warranty.status.charAt(0).toUpperCase() +
                            warranty.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewLogs(warranty)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Logs
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditWarranty(warranty)}
                            >
                              <span className="mr-2">✏️</span>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(warranty)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredWarranties.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredWarranties.length} of {warranties.length} warranties
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Warranty Form Modal */}
      <Sheet open={formOpen} onOpenChange={setFormOpen}>
        <SheetContent side="right" className="w-full sm:w-[650px] overflow-y-auto flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-2xl">
              {isEditing ? "Edit Warranty" : "Add New Warranty"}
            </SheetTitle>
            <SheetDescription>
              {isEditing
                ? "Update the warranty information below"
                : "Create a new warranty by filling in the details below"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2">
                  <h3 className="text-lg font-semibold">Warranty Information</h3>
                  <span className="text-sm text-red-500">*</span>
                </div>
                <div className="rounded-lg border border-border bg-card/50 p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderId" className="flex gap-1">
                      Order ID
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="orderId"
                      name="orderId"
                      placeholder="e.g., ORD-2024-001"
                      value={formData.orderId}
                      onChange={handleFormChange}
                      disabled={formSubmitting}
                      className={
                        formErrors.orderId ? "border-red-500 focus-visible:ring-red-500" : ""
                      }
                    />
                    {formErrors.orderId && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>•</span> {formErrors.orderId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productId" className="flex gap-1">
                      Product ID
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="productId"
                      name="productId"
                      placeholder="e.g., PROD-001"
                      value={formData.productId}
                      onChange={handleFormChange}
                      disabled={formSubmitting}
                      className={
                        formErrors.productId
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    {formErrors.productId && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>•</span> {formErrors.productId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imei" className="flex gap-1">
                      IMEI / Serial Number
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="imei"
                      name="imei"
                      placeholder="e.g., 123456789012345"
                      value={formData.imei}
                      onChange={handleFormChange}
                      disabled={formSubmitting}
                      className={
                        formErrors.imei ? "border-red-500 focus-visible:ring-red-500" : ""
                      }
                    />
                    {formErrors.imei && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>•</span> {formErrors.imei}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {formErrors.submit && (
                <div className="flex gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{formErrors.submit}</span>
                </div>
              )}
            </div>
          </div>

          <SheetFooter className="border-t pt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              disabled={formSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleFormSubmit} disabled={formSubmitting}>
              {formSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update Warranty"
                  : "Add Warranty"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Logs Modal */}
      <Dialog open={logsOpen} onOpenChange={setLogsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Warranty Activity Logs</DialogTitle>
            <DialogDescription>
              {selectedWarranty?.imei ? `IMEI: ${selectedWarranty.imei}` : "Activity history"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {logsLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">Loading logs...</p>
              </div>
            ) : logsData.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No activity logs found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {logsData.map((log) => (
                  <div key={log.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold">{log.action}</p>
                        {log.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {log.description}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {formatDate(log.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLogsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Warranty</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this warranty? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedWarranty && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">IMEI:</span>
                <span className="font-mono font-medium">{selectedWarranty.imei}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{selectedWarranty.orderId}</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={formSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteWarranty}
              disabled={formSubmitting}
            >
              {formSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withProtectedRoute(AdminWarrantyPage, {
  requiredRoles: ["admin"],
  fallbackTo: "/login",
  showLoader: true,
})
