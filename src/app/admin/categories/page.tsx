"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Search, Edit, Trash2, MoreVertical, Eye } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog"

interface Subcategory {
  id: string
  name: string
  products: number
}

interface Category {
  id: string
  name: string
  slug: string
  image: string
  products: number
  subcategories: Subcategory[]
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Smartphones",
    slug: "smartphones",
    image: "/placeholder.svg?key=5c3bh",
    products: 156,
    subcategories: [
      { id: "1a", name: "Android Phones", products: 89 },
      { id: "1b", name: "iPhones", products: 67 },
    ],
  },
  {
    id: "2",
    name: "Laptops",
    slug: "laptops",
    image: "/placeholder.svg?key=9qrz3",
    products: 98,
    subcategories: [
      { id: "2a", name: "MacBooks", products: 34 },
      { id: "2b", name: "Windows Laptops", products: 64 },
    ],
  },
  {
    id: "3",
    name: "Audio",
    slug: "audio",
    image: "/placeholder.svg?key=vb5kn",
    products: 234,
    subcategories: [
      { id: "3a", name: "Headphones", products: 89 },
      { id: "3b", name: "Earbuds", products: 145 },
    ],
  },
  {
    id: "4",
    name: "Wearables",
    slug: "wearables",
    image: "/placeholder.svg?key=m2k8p",
    products: 67,
    subcategories: [],
  },
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [addSubcategoryOpen, setAddSubcategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [editFormData, setEditFormData] = useState<Category | null>(null)
  const [subcategoryFormData, setSubcategoryFormData] = useState({ name: "", products: 0 })

  const handleViewClick = (category: Category) => {
    setSelectedCategory(category)
    setViewOpen(true)
  }

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category)
    setEditFormData({ ...category })
    setEditOpen(true)
  }

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category)
    setDeleteOpen(true)
  }

  const handleSaveEdit = () => {
    if (editFormData) {
      setCategories(categories.map((c) => (c.id === editFormData.id ? editFormData : c)))
      setEditOpen(false)
      setEditFormData(null)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      setCategories(categories.filter((c) => c.id !== selectedCategory.id))
      setDeleteOpen(false)
      setSelectedCategory(null)
    }
  }

  const handleAddSubcategoryClick = (category: Category) => {
    setSelectedCategory(category)
    setSubcategoryFormData({ name: "", products: 0 })
    setAddSubcategoryOpen(true)
  }

  const handleSaveSubcategory = () => {
    if (selectedCategory && subcategoryFormData.name.trim()) {
      const newSubcategory: Subcategory = {
        id: `${selectedCategory.id}-${Date.now()}`,
        name: subcategoryFormData.name,
        products: subcategoryFormData.products,
      }

      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id
            ? { ...c, subcategories: [...c.subcategories, newSubcategory] }
            : c
        )
      )
      setAddSubcategoryOpen(false)
      setSubcategoryFormData({ name: "", products: 0 })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product categories and subcategories.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="catName">Category Name</Label>
                <Input id="catName" placeholder="Enter category name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="catSlug">URL Slug</Label>
                <Input id="catSlug" placeholder="category-slug" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent">Parent Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="None (Top Level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Category Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                </div>
              </div>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Create Category
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
              <Input placeholder="Search categories..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border border-border">
                <div className="flex items-center gap-4 p-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge variant="secondary">{category.products} products</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">/{category.slug}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewClick(category)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClick(category)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddSubcategoryClick(category)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Subcategory
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(category)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {category.subcategories.length > 0 && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Subcategories</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <Badge key={sub.id} variant="outline" className="gap-1">
                          {sub.name}
                          <span className="text-muted-foreground">({sub.products})</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>View Category</DialogTitle>
            <DialogDescription>Category details and information</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-4">
                  <Image
                    src={selectedCategory.image || "/placeholder.svg"}
                    alt={selectedCategory.name}
                    width={200}
                    height={200}
                    className="h-48 w-full object-cover rounded"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase">Category Name</Label>
                    <p className="mt-1 font-medium text-base">{selectedCategory.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase">URL Slug</Label>
                    <p className="mt-1 font-medium text-base">{selectedCategory.slug}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase">Total Products</Label>
                    <p className="mt-1 font-medium text-base">{selectedCategory.products}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase">Subcategories</Label>
                    <p className="mt-1 font-medium text-base">{selectedCategory.subcategories.length}</p>
                  </div>
                </div>
              </div>
              {selectedCategory.subcategories.length > 0 && (
                <div>
                  <Label className="text-muted-foreground text-xs uppercase">Subcategories List</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCategory.subcategories.map((sub) => (
                      <Badge key={sub.id} variant="outline" className="gap-1">
                        {sub.name}
                        <span className="text-muted-foreground">({sub.products})</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category information</DialogDescription>
          </DialogHeader>
          {editFormData && (
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-slug">URL Slug</Label>
                <Input
                  id="edit-slug"
                  value={editFormData.slug}
                  onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                  placeholder="category-slug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-products">Total Products</Label>
                <Input
                  id="edit-products"
                  type="number"
                  value={editFormData.products}
                  onChange={(e) => setEditFormData({ ...editFormData, products: Number(e.target.value) })}
                  placeholder="Enter number of products"
                />
              </div>
              <div className="grid gap-2">
                <Label>Category Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted">
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                </div>
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

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedCategory?.name}</span>? This action cannot be undone.
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

      {/* Add Subcategory Modal */}
      <Dialog open={addSubcategoryOpen} onOpenChange={setAddSubcategoryOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Subcategory</DialogTitle>
            <DialogDescription>
              Add a new subcategory to <span className="font-semibold">{selectedCategory?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sub-name">Subcategory Name</Label>
              <Input
                id="sub-name"
                value={subcategoryFormData.name}
                onChange={(e) => setSubcategoryFormData({ ...subcategoryFormData, name: e.target.value })}
                placeholder="Enter subcategory name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sub-products">Number of Products</Label>
              <Input
                id="sub-products"
                type="number"
                value={subcategoryFormData.products}
                onChange={(e) => setSubcategoryFormData({ ...subcategoryFormData, products: Number(e.target.value) })}
                placeholder="Enter number of products"
              />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSubcategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSubcategory}>Add Subcategory</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
