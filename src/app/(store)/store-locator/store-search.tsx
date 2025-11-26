"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Globe } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface Store {
  id: number
  name: string
  address: string
  phone: string
  email: string
  hours: string
  lat: number
  lng: number
  district: string
  services: string[]
}

interface StoreSearchClientProps {
  stores: Store[]
}

export function StoreSearchClient({ stores }: StoreSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")

  const districts = Array.from(new Set(stores.map((s) => s.district))).sort()

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.district.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDistrict = !selectedDistrict || store.district === selectedDistrict

    return matchesSearch && matchesDistrict
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by store name, address, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filter by district" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filteredStores.length === 0 ? (
        <div className="rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground">
            No stores found matching your search criteria. Please try different filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredStores.map((store) => (
            <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
                <p className="text-sm text-primary font-medium mb-4">{store.district}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-xs text-muted-foreground">{store.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href={`tel:${store.phone}`} className="text-xs text-primary hover:underline">
                        {store.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Hours</p>
                      <p className="text-xs text-muted-foreground">{store.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Services</p>
                      <p className="text-xs text-muted-foreground">{store.services.join(", ")}</p>
                    </div>
                  </div>
                </div>

                <a href={`tel:${store.phone}`} className="inline-block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                  Call Store
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {filteredStores.length === 1
            ? "1 store found"
            : `${filteredStores.length} stores found`}
        </p>
      </div>
    </div>
  )
}
