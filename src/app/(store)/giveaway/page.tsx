/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import giveawaysService from "@/app/lib/api/services/giveaways"


export default function GiveawayPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", facebook: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      await giveawaysService.create({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        facebook: form.facebook || undefined,
      })
      setSuccess(true)
      setForm({ name: "", phone: "", email: "", facebook: "" })
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Giveaway Entry</h1>
      <p className="mb-6 text-center">Enter your details for a chance to win!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="facebook"
          value={form.facebook}
          onChange={handleChange}
          placeholder="Facebook ID (optional)"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email (optional)"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Enter Giveaway"}
        </button>
        {success && <div className="text-green-600 text-center">Entry submitted successfully!</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  )
}
