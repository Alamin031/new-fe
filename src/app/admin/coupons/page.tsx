'use client'

import { useState } from "react"
import { Plus, Search, Edit, Trash2, MoreVertical, Copy, Tag } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog"
import { formatPrice } from "../../lib/utils/format"

interface Coupon {
  id: string
  code: string
  type: string
  value: number
  minOrder: number
  maxDiscount: number | null
  usageLimit: number
  used: number
  validFrom: string
  validTo: string
  status: string
}

const initialCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minOrder: 999,
    maxDiscount: 500,
    usageLimit: 1000,
    used: 456,
    validFrom: "Nov 01, 2024",
    validTo: "Dec 31, 2024",
    status: "Active",
  },
  {
    id: "2",
    code: "FLAT500",
    type: "Fixed",
    value: 500,
    minOrder: 4999,
    maxDiscount: null,
    usageLimit: 500,
    used: 234,
    validFrom: "Nov 15, 2024",
    validTo: "Nov 30, 2024",
    status: "Active",
  },
  {
    id: "3",
    code: "SUMMER20",
    type: "Percentage",
    value: 20,
    minOrder: 1999,
    maxDiscount: 1000,
    usageLimit: 200,
    used: 200,
    validFrom: "Oct 01, 2024",
    validTo: "Oct 31, 2024",
    status: "Expired",
  },
  {
    id: "4",
    code: "NEWYEAR25",
    type: "Percentage",
    value: 25,
    minOrder: 2999,
    maxDiscount: 2000,
    usageLimit: 1000,
    used: 0,
    validFrom: "Dec 25, 2024",
    validTo: "Jan 05, 2025",
    status: "Scheduled",
  },
]

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [duplicateOpen, setDuplicateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [editFormData, setEditFormData] = useState<Coupon | null>(null)
  const [duplicateFormData, setDuplicateFormData] = useState<Coupon | null>(null)
  const [createFormData, setCreateFormData] = useState({
    code: "",
    type: "Percentage",
    value: 0,
    minOrder: 0,
    maxDiscount: "",
    usageLimit: "",
    validFrom: "",
    validTo: "",
  })

  const handleEditClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setEditFormData({ ...coupon })
    setEditOpen(true)
  }

  const handleDuplicateClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setDuplicateFormData({ ...coupon, id: String(Date.now()) })
    setDuplicateOpen(true)
  }

  const handleDeleteClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setDeleteOpen(true)
  }

  const handleSaveEdit = () => {
    if (editFormData) {
      setCoupons(coupons.map((c) => (c.id === editFormData.id ? editFormData : c)))
      setEditOpen(false)
      setEditFormData(null)
    }
  }

  const handleConfirmDuplicate = () => {
    if (duplicateFormData && duplicateFormData.code) {
      setCoupons([...coupons, duplicateFormData])
      setDuplicateOpen(false)
      setDuplicateFormData(null)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedCoupon) {
      setCoupons(coupons.filter((c) => c.id !== selectedCoupon.id))
      setDeleteOpen(false)
      setSelectedCoupon(null)
    }
  }

  const handleCreateCoupon = () => {
    if (createFormData.code.trim()) {
      const newCoupon: Coupon = {
        id: String(Date.now()),
        code: createFormData.code.toUpperCase(),
        type: createFormData.type,
        value: createFormData.value,
        minOrder: createFormData.minOrder,
        maxDiscount: createFormData.maxDiscount ? Number(createFormData.maxDiscount) : null,
        usageLimit: createFormData.usageLimit ? Number(createFormData.usageLimit) : 1000,
        used: 0,
        validFrom: createFormData.validFrom,
        validTo: createFormData.validTo,
        status: "Active",
      }
      setCoupons([newCoupon, ...coupons])
      setIsCreateDialogOpen(false)
      setCreateFormData({
        code: "",
        type: "Percentage",
        value: 0,
        minOrder: 0,
        maxDiscount: "",
        usageLimit: "",
        validFrom: "",
        validTo: "",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
          <p className="text-muted-foreground">Manage discount coupons and promotions.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="couponCode">Coupon Code</Label>
                <Input
                  id="couponCode"
                  value={createFormData.code}
                  onChange={(e) => setCreateFormData({ ...createFormData, code: e.target.value })}
                  placeholder="Enter coupon code"
                  className="uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select value={createFormData.type} onValueChange={(value) => setCreateFormData({ ...createFormData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={createFormData.value}
                    onChange={(e) => setCreateFormData({ ...createFormData, value: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minOrder">Min. Order Value</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    value={createFormData.minOrder}
                    onChange={(e) => setCreateFormData({ ...createFormData, minOrder: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxDiscount">Max. Discount</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={createFormData.maxDiscount}
                    onChange={(e) => setCreateFormData({ ...createFormData, maxDiscount: e.target.value })}
                    placeholder="No limit"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={createFormData.validFrom}
                    onChange={(e) => setCreateFormData({ ...createFormData, validFrom: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input
                    id="validTo"
                    type="date"
                    value={createFormData.validTo}
                    onChange={(e) => setCreateFormData({ ...createFormData, validTo: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={createFormData.usageLimit}
                  onChange={(e) => setCreateFormData({ ...createFormData, usageLimit: e.target.value })}
                  placeholder="Unlimited"
                />
              </div>
              <Button type="button" onClick={handleCreateCoupon}>
                Create Coupon
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search coupons..." className="pl-9" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4">Code</th>
                  <th className="pb-3 pr-4">Discount</th>
                  <th className="pb-3 pr-4">Min. Order</th>
                  <th className="pb-3 pr-4">Usage</th>
                  <th className="pb-3 pr-4">Validity</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-mono font-semibold">{coupon.code}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      {coupon.type === "Percentage" ? (
                        <span>{coupon.value}% off</span>
                      ) : (
                        <span>{formatPrice(coupon.value)} off</span>
                      )}
                      {coupon.maxDiscount && (
                        <p className="text-xs text-muted-foreground">Max: {formatPrice(coupon.maxDiscount)}</p>
                      )}
                    </td>
                    <td className="py-4 pr-4">{formatPrice(coupon.minOrder)}</td>
                    <td className="py-4 pr-4">
                      <span>
                        {coupon.used} / {coupon.usageLimit}
                      </span>
                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(coupon.used / coupon.usageLimit) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <p>{coupon.validFrom}</p>
                      <p className="text-muted-foreground">to {coupon.validTo}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge
                        variant="secondary"
                        className={
                          coupon.status === "Active"
                            ? "bg-green-500/10 text-green-600"
                            : coupon.status === "Scheduled"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-gray-500/10 text-gray-600"
                        }
                      >
                        {coupon.status}
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
                          <DropdownMenuItem onClick={() => handleEditClick(coupon)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateClick(coupon)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(coupon)}>
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
        </CardContent>
      </Card>

      {/* Edit Coupon Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>Update coupon details and settings</DialogDescription>
          </DialogHeader>
          {editFormData && (
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-code">Coupon Code</Label>
                <Input
                  id="edit-code"
                  value={editFormData.code}
                  onChange={(e) => setEditFormData({ ...editFormData, code: e.target.value.toUpperCase() })}
                  placeholder="Enter coupon code"
                  className="uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Discount Type</Label>
                  <Select value={editFormData.type} onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-value">Discount Value</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    value={editFormData.value}
                    onChange={(e) => setEditFormData({ ...editFormData, value: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-min">Min. Order Value</Label>
                  <Input
                    id="edit-min"
                    type="number"
                    value={editFormData.minOrder}
                    onChange={(e) => setEditFormData({ ...editFormData, minOrder: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-max">Max. Discount</Label>
                  <Input
                    id="edit-max"
                    type="number"
                    value={editFormData.maxDiscount || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, maxDiscount: e.target.value ? Number(e.target.value) : null })}
                    placeholder="No limit"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-from">Valid From</Label>
                  <Input
                    id="edit-from"
                    type="date"
                    value={editFormData.validFrom}
                    onChange={(e) => setEditFormData({ ...editFormData, validFrom: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-to">Valid To</Label>
                  <Input
                    id="edit-to"
                    type="date"
                    value={editFormData.validTo}
                    onChange={(e) => setEditFormData({ ...editFormData, validTo: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-limit">Usage Limit</Label>
                <Input
                  id="edit-limit"
                  type="number"
                  value={editFormData.usageLimit}
                  onChange={(e) => setEditFormData({ ...editFormData, usageLimit: Number(e.target.value) })}
                  placeholder="Unlimited"
                />
              </div>
            </form>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Coupon Modal */}
      <Dialog open={duplicateOpen} onOpenChange={setDuplicateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Duplicate Coupon</DialogTitle>
            <DialogDescription>Create a copy of this coupon with a new code</DialogDescription>
          </DialogHeader>
          {duplicateFormData && (
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="duplicate-code">New Coupon Code</Label>
                <Input
                  id="duplicate-code"
                  value={duplicateFormData.code}
                  onChange={(e) => setDuplicateFormData({ ...duplicateFormData, code: e.target.value.toUpperCase() })}
                  placeholder="Enter new coupon code"
                  className="uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duplicate-type">Discount Type</Label>
                  <Select value={duplicateFormData.type} onValueChange={(value) => setDuplicateFormData({ ...duplicateFormData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duplicate-value">Discount Value</Label>
                  <Input
                    id="duplicate-value"
                    type="number"
                    value={duplicateFormData.value}
                    onChange={(e) => setDuplicateFormData({ ...duplicateFormData, value: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duplicate-min">Min. Order Value</Label>
                  <Input
                    id="duplicate-min"
                    type="number"
                    value={duplicateFormData.minOrder}
                    onChange={(e) => setDuplicateFormData({ ...duplicateFormData, minOrder: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duplicate-max">Max. Discount</Label>
                  <Input
                    id="duplicate-max"
                    type="number"
                    value={duplicateFormData.maxDiscount || ""}
                    onChange={(e) => setDuplicateFormData({ ...duplicateFormData, maxDiscount: e.target.value ? Number(e.target.value) : null })}
                    placeholder="No limit"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duplicate-from">Valid From</Label>
                  <Input
                    id="duplicate-from"
                    type="date"
                    value={duplicateFormData.validFrom}
                    onChange={(e) => setDuplicateFormData({ ...duplicateFormData, validFrom: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duplicate-to">Valid To</Label>
                  <Input
                    id="duplicate-to"
                    type="date"
                    value={duplicateFormData.validTo}
                    onChange={(e) => setDuplicateFormData({ ...duplicateFormData, validTo: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duplicate-limit">Usage Limit</Label>
                <Input
                  id="duplicate-limit"
                  type="number"
                  value={duplicateFormData.usageLimit}
                  onChange={(e) => setDuplicateFormData({ ...duplicateFormData, usageLimit: Number(e.target.value) })}
                  placeholder="Unlimited"
                />
              </div>
            </form>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDuplicateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDuplicate}>Create Duplicate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Coupon Modal */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the coupon <span className="font-semibold">{selectedCoupon?.code}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
