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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store settings and configuration.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Current User Info</h2>
        {loading ? (
          <div>Loading user...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : user ? (
          <form onSubmit={handleSave} className="bg-muted rounded p-4 text-sm space-y-3 max-w-xl">
            <div><b>ID:</b> {user.id}</div>
            <div className="flex items-center gap-6 mb-2">
              <div className="w-24 h-24 rounded border bg-white flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div>
                <Label htmlFor="image">Change Image</Label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="block mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={edit.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={edit.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={edit.phone} onChange={handleChange} />
              </div>
            </div>
            <div><b>Role:</b> {user.role}</div>
            <div><b>isAdmin:</b> {user.isAdmin ? 'Yes' : 'No'}</div>
            <div><b>Created At:</b> {user.createdAt}</div>
            <div><b>Updated At:</b> {user.updatedAt}</div>
            <div><b>Roles:</b> {Array.isArray(user.roles) ? user.roles.join(', ') : '-'}</div>
            <div className="flex gap-2 mt-2">
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
              {success && <span className="text-green-600 mt-2">{success}</span>}
              {error && <span className="text-red-600 mt-2">{error}</span>}
            </div>
          </form>
        ) : null}
      </div>

 
    </div>
  );
}

export default withProtectedRoute(AdminSettingsPage, {
  requiredRoles: ['admin'],
  fallbackTo: '/login',
  showLoader: true,
});
