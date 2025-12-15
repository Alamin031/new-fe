/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import {Button} from '../../components/ui/button';
import {Input} from '../../components/ui/input';
import {Label} from '../../components/ui/label';
import {withProtectedRoute} from '../../lib/auth/protected-route';
import { useEffect, useState, useRef } from 'react';
import usersService from '../../lib/api/services/users';



function AdminSettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState({ name: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usersService.getCurrentUser()
      .then((u) => {
        setUser(u);
        setEdit({ name: u.name || "", email: u.email || "", phone: u.phone || "" });
        setImagePreview(u.image || null);
      })
      .catch((err) => setError(err?.message || "Failed to load user"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      let payload: any;
      let useFormData = false;
      if (imageFile) {
        useFormData = true;
      }
      if (useFormData) {
        const formData = new FormData();
        formData.append("name", edit.name);
        formData.append("email", edit.email);
        formData.append("phone", edit.phone);
        if (imageFile) formData.append("image", imageFile);
        payload = formData;
      } else {
        payload = {
          name: edit.name,
          email: edit.email,
          phone: edit.phone,
        };
      }
      const updated = await usersService.update(user.id, payload);
      setUser(updated);
      setSuccess("Profile updated successfully.");
      setImageFile(null);
    } catch (err: any) {
      setError(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-blue-800 dark:text-blue-200">
          Loading your profile...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Success State */}
      {success && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-200">
          {success}
        </div>
      )}

      {!loading && user && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Picture & Basic Info Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
              <div className="flex items-center gap-8">
                {/* Image Preview */}
                <div className="shrink-0">
                  <div className="w-32 h-32 rounded-full border-4 border-border bg-muted flex items-center justify-center overflow-hidden shadow-sm">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl text-muted-foreground">👤</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Section */}
                <div className="grow">
                  <Label htmlFor="image" className="text-base font-medium mb-2 block">
                    Change Profile Picture
                  </Label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold">Edit Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={edit.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={edit.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={edit.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="h-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto h-11 font-semibold"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>

          {/* Account Information Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">User ID</p>
                <p className="font-mono text-sm font-semibold break-all">{user.id}</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Role</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Admin Status</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    user.isAdmin
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">All Roles</p>
                <p className="text-sm font-semibold">
                  {Array.isArray(user.roles) && user.roles.length > 0
                    ? user.roles.join(', ')
                    : '-'}
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Created At</p>
                <p className="text-sm font-semibold">{user.createdAt}</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                <p className="text-sm font-semibold">{user.updatedAt}</p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default withProtectedRoute(AdminSettingsPage, {
  requiredRoles: ['admin'],
  fallbackTo: '/login',
  showLoader: true,
});
