/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import usersService from "../../../lib/api/services/users"
import { useAuthStore } from "../../../store/auth-store"
import { User, Lock, Eye, EyeOff, } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../../../components/ui/alert-dialog"
import { withProtectedRoute } from "../../../lib/auth/protected-route"

import { useEffect, useRef } from "react"

function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [infoLoading, setInfoLoading] = useState(true)
  const auth = useAuthStore()

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.user?.id) return;
      setInfoLoading(true)
      try {
        const user = await usersService.getCurrentUser()
        setUserInfo(user)
        // Set form fields if refs are available
        if (nameRef.current) nameRef.current.value = user.name || ""
        if (emailRef.current) emailRef.current.value = user.email || ""
        if (phoneRef.current) phoneRef.current.value = user.phone || ""
        if (user.image) setProfileImageUrl(user.image)
      } catch {
        // Optionally handle error
      } finally {
        setInfoLoading(false)
      }
    }
    fetchUser()
  }, [auth.user?.id])

  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImageUrl(url);
    } else {
      setProfileImageUrl(userInfo?.image || null);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setProfileLoading(true);
    try {
      if (!auth.user?.id) {
        setProfileError("User ID is missing. Please re-login.");
        setProfileLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("name", nameRef.current?.value || "");
      formData.append("email", emailRef.current?.value || "");
      formData.append("phone", phoneRef.current?.value || "");
      if (profileImage) {
        formData.append("image", profileImage);
      }
      await usersService.update(auth.user.id, formData);
      setProfileSuccess("Profile updated successfully.");
    } catch (err: any) {
      setProfileError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(null)
    setLoading(true)
    const form = e.currentTarget
    const currentPassword = (form.elements.namedItem("currentPassword") as HTMLInputElement)?.value || ""
    const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement)?.value || ""
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value || ""
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.")
      setLoading(false)
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.")
      setLoading(false)
      return
    }
    try {
      if (!auth.user?.id) {
        setPasswordError("User ID is missing. Please re-login.");
        setLoading(false);
        return;
      }
      await usersService.updatePassword(auth.user.id, {
        oldPassword: currentPassword,
        newPassword: newPassword,
      })
      setPasswordSuccess("Password updated successfully.")
      form.reset()
    } catch (err: any) {
      setPasswordError(err?.response?.data?.message || "Failed to update password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleProfileSubmit} encType="multipart/form-data">
            <div className="flex items-center gap-6 mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt="Profile Preview" className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <Input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
                </label>
              </div>
              <div className="flex-1 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" ref={nameRef} defaultValue="" />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" ref={emailRef} type="email" defaultValue="" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" ref={phoneRef} defaultValue="" />
            </div>
            {profileError && <div className="text-sm text-red-500">{profileError}</div>}
            {profileSuccess && <div className="text-sm text-green-600">{profileSuccess}</div>}
            <Button type="submit" disabled={infoLoading || profileLoading}>
              {profileLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handlePasswordChange} autoComplete="off">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  tabIndex={-1}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
            {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}
            {passwordSuccess && <div className="text-sm text-green-600">{passwordSuccess}</div>}
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/*
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from
                  our servers, including orders history, saved addresses, and wallet balance.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      */}
    </div>
  )
}

export default withProtectedRoute(SettingsPage, {
  requiredRoles: ["user"],
})
