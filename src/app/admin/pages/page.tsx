'use client'

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, MoreVertical, Eye, FileText } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Textarea } from "../../components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface Page {
  id: string
  title: string
  slug: string
  status: string
  lastUpdated: string
  content?: string
}

const initialPages: Page[] = [
  {
    id: "1",
    title: "About Us",
    slug: "about",
    status: "Published",
    lastUpdated: "Nov 15, 2024",
    content: "Learn about our company and mission.",
  },
  {
    id: "2",
    title: "Privacy Policy",
    slug: "privacy-policy",
    status: "Published",
    lastUpdated: "Nov 10, 2024",
    content: "Our privacy policy outlines how we handle customer data.",
  },
  {
    id: "3",
    title: "Terms & Conditions",
    slug: "terms",
    status: "Published",
    lastUpdated: "Nov 10, 2024",
    content: "Please read our terms and conditions carefully.",
  },
  {
    id: "4",
    title: "Return Policy",
    slug: "return-policy",
    status: "Published",
    lastUpdated: "Nov 05, 2024",
    content: "Information about returns and refunds.",
  },
  {
    id: "5",
    title: "FAQ",
    slug: "faq",
    status: "Draft",
    lastUpdated: "Nov 01, 2024",
    content: "Frequently asked questions.",
  },
]

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>(initialPages)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [editFormData, setEditFormData] = useState<Page | null>(null)
  const [createFormData, setCreateFormData] = useState({
    title: "",
    slug: "",
    content: "",
    status: "Draft",
  })

  const handleEditClick = (page: Page) => {
    setSelectedPage(page)
    setEditFormData({ ...page })
    setEditOpen(true)
  }

  const handleDeleteClick = (page: Page) => {
    setSelectedPage(page)
    setDeleteOpen(true)
  }

  const handleSaveEdit = () => {
    if (editFormData) {
      setPages(pages.map((p) => (p.id === editFormData.id ? editFormData : p)))
      setEditOpen(false)
      setEditFormData(null)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedPage) {
      setPages(pages.filter((p) => p.id !== selectedPage.id))
      setDeleteOpen(false)
      setSelectedPage(null)
    }
  }

  const handleCreatePage = () => {
    if (createFormData.title.trim() && createFormData.slug.trim()) {
      const newPage: Page = {
        id: String(Date.now()),
        title: createFormData.title,
        slug: createFormData.slug,
        content: createFormData.content,
        status: createFormData.status,
        lastUpdated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      }
      setPages([newPage, ...pages])
      setIsCreateDialogOpen(false)
      setCreateFormData({
        title: "",
        slug: "",
        content: "",
        status: "Draft",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage static content pages.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input
                  id="pageTitle"
                  value={createFormData.title}
                  onChange={(e) => setCreateFormData({ ...createFormData, title: e.target.value })}
                  placeholder="Enter page title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pageSlug">URL Slug</Label>
                <Input
                  id="pageSlug"
                  value={createFormData.slug}
                  onChange={(e) => setCreateFormData({ ...createFormData, slug: e.target.value })}
                  placeholder="page-url-slug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pageStatus">Status</Label>
                <Select value={createFormData.status} onValueChange={(value) => setCreateFormData({ ...createFormData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pageContent">Content</Label>
                <Textarea
                  id="pageContent"
                  value={createFormData.content}
                  onChange={(e) => setCreateFormData({ ...createFormData, content: e.target.value })}
                  placeholder="Enter page content..."
                  rows={10}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreatePage}>
                  Create Page
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search pages..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-4">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{page.title}</h3>
                      <Badge
                        variant="secondary"
                        className={
                          page.status === "Published"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }
                      >
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      /{page.slug} • Updated {page.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/${page.slug}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(page)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(page)}>
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

      {/* Edit Page Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>Update page content and settings</DialogDescription>
          </DialogHeader>
          {editFormData && (
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Page Title</Label>
                <Input
                  id="edit-title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  placeholder="Enter page title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-slug">URL Slug</Label>
                <Input
                  id="edit-slug"
                  value={editFormData.slug}
                  onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                  placeholder="page-url-slug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editFormData.status} onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={editFormData.content || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                  placeholder="Enter page content..."
                  rows={10}
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

      {/* Delete Page Modal */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedPage?.title}</span>? This action cannot be undone.
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
