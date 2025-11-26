'use client'

import { useState } from "react"
import Image from "next/image"
import { Plus, Edit, Trash2, MoreVertical, GripVertical, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Switch } from "../../components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog"

interface Banner {
  id: string
  title: string
  image: string
  position: string
  link: string
  order: number
  active: boolean
}

const initialBanners: Banner[] = [
  {
    id: "1",
    title: "iPhone 15 Launch",
    image: "/iphone-banner-electronics-sale.jpg",
    position: "Hero Slider",
    link: "/product/iphone-15-pro-max",
    order: 1,
    active: true,
  },
  {
    id: "2",
    title: "Flash Sale",
    image: "/flash-sale-electronics-discount.jpg",
    position: "Hero Slider",
    link: "/category/flash-sale",
    order: 2,
    active: true,
  },
  {
    id: "3",
    title: "Audio Collection",
    image: "/headphones-audio-collection.jpg",
    position: "Category Banner",
    link: "/category/audio",
    order: 1,
    active: true,
  },
  {
    id: "4",
    title: "MacBook Promo",
    image: "/macbook-laptop-promotional-banner.jpg",
    position: "Hero Slider",
    link: "/product/macbook-air-m3",
    order: 3,
    active: false,
  },
]

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [hideOpen, setHideOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
  const [editFormData, setEditFormData] = useState<Banner | null>(null)
  const [createFormData, setCreateFormData] = useState({
    title: "",
    position: "Hero Slider",
    link: "",
    active: true,
  })

  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner)
    setEditFormData({ ...banner })
    setEditOpen(true)
  }

  const handleHideClick = (banner: Banner) => {
    setSelectedBanner(banner)
    setHideOpen(true)
  }

  const handleDeleteClick = (banner: Banner) => {
    setSelectedBanner(banner)
    setDeleteOpen(true)
  }

  const handleSaveEdit = () => {
    if (editFormData) {
      setBanners(banners.map((b) => (b.id === editFormData.id ? editFormData : b)))
      setEditOpen(false)
      setEditFormData(null)
    }
  }

  const handleConfirmHide = () => {
    if (selectedBanner) {
      setBanners(
        banners.map((b) =>
          b.id === selectedBanner.id ? { ...b, active: !b.active } : b
        )
      )
      setHideOpen(false)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedBanner) {
      setBanners(banners.filter((b) => b.id !== selectedBanner.id))
      setDeleteOpen(false)
      setSelectedBanner(null)
    }
  }

  const handleCreateBanner = () => {
    if (createFormData.title.trim()) {
      const newBanner: Banner = {
        id: String(Date.now()),
        title: createFormData.title,
        position: createFormData.position,
        link: createFormData.link,
        image: "/placeholder.svg",
        order: banners.length + 1,
        active: createFormData.active,
      }
      setBanners([...banners, newBanner])
      setIsCreateDialogOpen(false)
      setCreateFormData({
        title: "",
        position: "Hero Slider",
        link: "",
        active: true,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">Manage promotional banners and sliders.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bannerTitle">Banner Title</Label>
                <Input
                  id="bannerTitle"
                  value={createFormData.title}
                  onChange={(e) => setCreateFormData({ ...createFormData, title: e.target.value })}
                  placeholder="Enter banner title"
                />
              </div>
              <div className="grid gap-2">
                <Label>Banner Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <span className="text-sm text-muted-foreground">Click to upload (1920×600 recommended)</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bannerPosition">Position</Label>
                <Select value={createFormData.position} onValueChange={(value) => setCreateFormData({ ...createFormData, position: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hero Slider">Hero Slider</SelectItem>
                    <SelectItem value="Category Banner">Category Banner</SelectItem>
                    <SelectItem value="Promotional Banner">Promotional Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bannerLink">Link URL</Label>
                <Input
                  id="bannerLink"
                  value={createFormData.link}
                  onChange={(e) => setCreateFormData({ ...createFormData, link: e.target.value })}
                  placeholder="/category/sale"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="bannerActive"
                  checked={createFormData.active}
                  onCheckedChange={(checked) => setCreateFormData({ ...createFormData, active: checked })}
                />
                <Label htmlFor="bannerActive">Active</Label>
              </div>
              <Button type="button" onClick={handleCreateBanner}>
                Create Banner
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {banners.map((banner) => (
              <div key={banner.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                <div className="cursor-grab text-muted-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="h-20 w-40 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    width={160}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{banner.title}</h3>
                    <Badge variant="secondary">{banner.position}</Badge>
                    {!banner.active && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{banner.link}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={banner.active} onCheckedChange={() => handleHideClick(banner)} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(banner)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleHideClick(banner)}>
                        {banner.active ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Show
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(banner)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Banner Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
            <DialogDescription>Update banner details and settings</DialogDescription>
          </DialogHeader>
          {editFormData && (
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Banner Title</Label>
                <Input
                  id="edit-title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  placeholder="Enter banner title"
                />
              </div>
              <div className="grid gap-2">
                <Label>Banner Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <Image
                    src={editFormData.image || "/placeholder.svg"}
                    alt={editFormData.title}
                    width={300}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Click to change image (1920×600 recommended)</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-position">Position</Label>
                <Select value={editFormData.position} onValueChange={(value) => setEditFormData({ ...editFormData, position: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hero Slider">Hero Slider</SelectItem>
                    <SelectItem value="Category Banner">Category Banner</SelectItem>
                    <SelectItem value="Promotional Banner">Promotional Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-link">Link URL</Label>
                <Input
                  id="edit-link"
                  value={editFormData.link}
                  onChange={(e) => setEditFormData({ ...editFormData, link: e.target.value })}
                  placeholder="/category/sale"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  checked={editFormData.active}
                  onCheckedChange={(checked) => setEditFormData({ ...editFormData, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
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

      {/* Hide/Show Banner Modal */}
      <AlertDialog open={hideOpen} onOpenChange={setHideOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedBanner?.active ? "Hide" : "Show"} Banner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {selectedBanner?.active ? "hide" : "show"} <span className="font-semibold">{selectedBanner?.title}</span>? This will {selectedBanner?.active ? "remove it from" : "add it to"} the frontend.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmHide}>
              {selectedBanner?.active ? "Hide Banner" : "Show Banner"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Banner Modal */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedBanner?.title}</span>? This action cannot be undone.
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
