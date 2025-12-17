"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog"
import { Badge } from "../../components/ui/badge"
import { Plus, Edit2, Trash2, Zap, Calendar, AlertCircle } from "lucide-react"
import { flashsellService, type Flashsell, type CreateFlashsellRequest } from "../../lib/api/services/flashsell"
import { withProtectedRoute } from "../../lib/auth/protected-route"
import { toast } from "sonner"

interface FormData {
  name: string
  description: string
  startTime: string
  endTime: string
  products: string
}

function AdminFlashsellPage() {
  const [flashsells, setFlashsells] = useState<Flashsell[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Flashsell | null>(null)

  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    products: "",
  })

  useEffect(() => {
    fetchFlashsells()
  }, [])

  const fetchFlashsells = async () => {
    try {
      const data = await flashsellService.findAll()
      setFlashsells(data)
    } catch (error) {
      toast.error("Failed to load flashsell events")
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditMode(false)
    setEditingId(null)
    setForm({
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      products: "",
    })
  }

  const handleAddClick = () => {
    setForm({
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      products: "",
    })
    setEditMode(false)
    setEditingId(null)
    setModalOpen(true)
  }

  const handleEditClick = (flashsell: Flashsell) => {
    setForm({
      name: flashsell.name,
      description: flashsell.description || "",
      startTime: flashsell.startTime,
      endTime: flashsell.endTime,
      products: flashsell.products.join(","),
    })
    setEditingId(flashsell.id)
    setEditMode(true)
    setModalOpen(true)
  }

  const handleDeleteClick = (flashsell: Flashsell) => {
    setDeleteTarget(flashsell)
    setDeleteModalOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!form.name || !form.startTime || !form.endTime) {
      toast.error("Please fill in all required fields")
      return
    }

    const startDate = new Date(form.startTime)
    const endDate = new Date(form.endTime)

    if (startDate >= endDate) {
      toast.error("End time must be after start time")
      return
    }

    setLoading(true)
    try {
      const payload: CreateFlashsellRequest = {
        name: form.name,
        description: form.description || undefined,
        startTime: form.startTime,
        endTime: form.endTime,
        products: form.products
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0),
      }

      if (editMode && editingId) {
        await flashsellService.update(editingId, payload)
        toast.success("Flashsell updated successfully!")
      } else {
        await flashsellService.create(payload)
        toast.success("Flashsell created successfully!")
      }

      await fetchFlashsells()
      handleModalClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save flashsell"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return

    setLoading(true)
    try {
      await flashsellService.remove(deleteTarget.id)
      toast.success("Flashsell deleted successfully!")
      await fetchFlashsells()
      setDeleteModalOpen(false)
      setDeleteTarget(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete flashsell"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const getFlashsellStatus = (startTime: string, endTime: string) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)

    if (now < start) {
      return { label: "Upcoming", color: "bg-blue-500/10 text-blue-600" }
    } else if (now > end) {
      return { label: "Ended", color: "bg-gray-500/10 text-gray-600" }
    } else {
      return { label: "Active", color: "bg-green-500/10 text-green-600" }
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Flash Sell Management</h1>
          <p className="text-muted-foreground">Create and manage flash sale events.</p>
        </div>
        <Button onClick={handleAddClick} className="gap-2">
          <Plus className="h-4 w-4" />
          New Flash Sell
        </Button>
      </div>

      {flashsells.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Zap className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No flash sale events yet</p>
            <Button onClick={handleAddClick} variant="outline" className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Create First Flash Sell
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {flashsells.map((flashsell) => {
            const status = getFlashsellStatus(flashsell.startTime, flashsell.endTime)
            return (
              <Card key={flashsell.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{flashsell.name}</h3>
                        <Badge className={status.color} variant="secondary">
                          {status.label}
                        </Badge>
                      </div>

                      {flashsell.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{flashsell.description}</p>
                      )}

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Start:</span>
                          <span className="font-medium">{formatDateTime(flashsell.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">End:</span>
                          <span className="font-medium">{formatDateTime(flashsell.endTime)}</span>
                        </div>
                      </div>

                      {flashsell.products && flashsell.products.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-muted-foreground">Products ({flashsell.products.length})</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {flashsell.products.slice(0, 5).map((productId) => (
                              <Badge key={productId} variant="outline" className="font-mono text-xs">
                                {productId}
                              </Badge>
                            ))}
                            {flashsell.products.length > 5 && (
                              <Badge variant="outline">+{flashsell.products.length - 5} more</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(flashsell)}
                        className="gap-1"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(flashsell)}
                        className="gap-1 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {editMode ? "Edit Flash Sell" : "Create New Flash Sell"}
            </DialogTitle>
            <DialogDescription>
              {editMode ? "Update the flash sale event details." : "Set up a new flash sale event."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Summer Flash Sale"
                value={form.name}
                onChange={handleFormChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Event description (optional)"
                value={form.description}
                onChange={handleFormChange}
                disabled={loading}
                className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  value={form.startTime}
                  onChange={handleFormChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  value={form.endTime}
                  onChange={handleFormChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="products">Product IDs</Label>
              <textarea
                id="products"
                name="products"
                placeholder="Enter product IDs separated by commas (e.g., prod1,prod2,prod3)"
                value={form.products}
                onChange={handleFormChange}
                disabled={loading}
                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">Separate multiple product IDs with commas</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : editMode ? "Update" : "Create"}
              </Button>
              <Button variant="outline" onClick={handleModalClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Flash Sell
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 pt-4">
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={loading} className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withProtectedRoute(AdminFlashsellPage, {
  requiredRoles: ["admin"],
  fallbackTo: "/login",
  showLoader: true,
})
