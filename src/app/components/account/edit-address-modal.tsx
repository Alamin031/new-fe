"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Address } from "../../types"

interface EditAddressModalProps {
  isOpen: boolean
  onClose: () => void
  address: Address | null
  onSave: (address: Address) => void
}

const addressTypes = ["Home", "Work", "Office", "Other"]

export function EditAddressModal({
  isOpen,
  onClose,
  address,
  onSave,
}: EditAddressModalProps) {
  const [formData, setFormData] = useState<Address>(
    address || {
      id: `addr-${Date.now()}`,
      name: "",
      phone: "",
      address: "",
      city: "",
      area: "",
      isDefault: false,
    },
  )

  useEffect(() => {
    if (address) {
      setFormData(address)
    }
  }, [address])

  const handleChange = (field: keyof Address, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill in all required fields")
      return
    }

    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {address ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-2"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="mt-2"
              placeholder="+880 1234567890"
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="mt-2"
              placeholder="123 Main Street, Apt 4B"
            />
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="mt-2"
              placeholder="Dhaka"
            />
          </div>

          {/* Area */}
          <div>
            <Label htmlFor="area">Area / District</Label>
            <Input
              id="area"
              value={formData.area}
              onChange={(e) => handleChange("area", e.target.value)}
              className="mt-2"
              placeholder="Gulshan"
            />
          </div>

          {/* Address Type */}
          <div>
            <Label>Address Type</Label>
            <RadioGroup
              value={formData.name}
              onValueChange={(value) => handleChange("name", value)}
              className="mt-2 flex gap-3"
            >
              {addressTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <RadioGroupItem value={type} id={`type-${type}`} />
                  <Label htmlFor={`type-${type}`} className="font-normal cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Default Address */}
          <div className="flex items-center gap-2 rounded-lg border border-border p-3">
            <input
              type="checkbox"
              id="default"
              checked={formData.isDefault}
              onChange={(e) => handleChange("isDefault", e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="default" className="flex-1 font-normal cursor-pointer">
              Set as default address
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              className="flex-1"
            >
              {address ? "Update Address" : "Add Address"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
