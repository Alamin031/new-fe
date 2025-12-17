

"use client";
import React, { useState, useEffect } from "react";
import giveawaysService from "@/app/lib/api/services/giveaways";
import herobannerService, { Herobanner } from "@/app/lib/api/services/herobanner";
import Image from "next/image";

export default function GiveawayPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", facebook: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [banners, setBanners] = useState<Herobanner[]>([])
  const [bannersLoading, setBannersLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await herobannerService.findAllGive()
        setBanners(data)
      } catch (err) {
        console.error("Failed to fetch giveaway banners:", err)
      } finally {
        setBannersLoading(false)
      }
    }
    fetchBanners()
  }, [])

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
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Giveaway Banner (use first banner) */}
      {bannersLoading ? (
        <div
          className="mb-10 relative overflow-hidden rounded-2xl bg-muted flex items-center justify-center"
          style={{ aspectRatio: "1920/800" }}
        >
          <span className="text-muted-foreground">Loading banners...</span>
        </div>
      ) : banners.length > 0 ? (
        <div className="mb-10 relative overflow-hidden rounded-2xl bg-muted shadow-md" style={{ aspectRatio: "1920/800" }}>
          <Image
            src={banners[0].img}
            alt="Giveaway banner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : null}

      {/* CTA to open modal */}
      <div className="mb-8 flex justify-center">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="relative inline-flex items-center justify-center px-8 py-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 static-border-btn group text-base md:text-lg"
        >
          <span className="relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-white/90 via-white/80 to-white/90 px-10 py-4 text-lg font-extrabold text-gray-900 shadow-xl border border-transparent static-border-inner transition-all duration-200 group-hover:scale-105 group-hover:shadow-2xl">
            Ready to participate on Giveaway
          </span>
        </button>
        <style jsx>{`
          .static-border-btn {
            --border-width: 5px;
            --border-radius: 9999px;
            filter: drop-shadow(0 0 12px #fbbf24aa) drop-shadow(0 0 8px #60a5fa88);
          }
          .static-border-inner {
            position: relative;
            z-index: 1;
            box-shadow: 0 2px 24px 0 #60a5fa22, 0 1.5px 8px 0 #fbbf2444;
          }
          .static-border-btn::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: var(--border-radius);
            padding: var(--border-width);
            background: conic-gradient(
              #f87171 0%,
              #fbbf24 20%,
              #34d399 40%,
              #60a5fa 60%,
              #a78bfa 80%,
              #f87171 100%
            );
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: xor;
            pointer-events: none;
            z-index: 0;
            box-shadow: 0 0 16px 2px #fbbf24cc, 0 0 8px 2px #60a5fa99;
            transition: box-shadow 0.2s;
          }
          .static-border-btn:hover::before {
            box-shadow: 0 0 32px 6px #fbbf24ee, 0 0 16px 4px #60a5faee;
          }
        `}</style>
      </div>

      {/* Modal for Entry Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 md:px-0">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-4 md:p-8 relative animate-fade-in border border-gray-200">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close modal"
            >
              ×
            </button>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-center text-blue-700">Giveaway Entry</h1>
            <p className="mb-4 md:mb-6 text-center text-gray-600">Enter your details for a chance to win!</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone<span className="text-red-500">*</span></label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">Facebook ID</label>
                <input
                  id="facebook"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  placeholder="Facebook ID (optional)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50"
              >
                {loading ? <span className="animate-pulse">Submitting...</span> : "Enter Giveaway"}
              </button>
              {success && <div className="text-green-600 text-center font-medium">Entry submitted successfully!</div>}
              {error && <div className="text-red-600 text-center font-medium">{error}</div>}
            </form>
          </div>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.2s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
