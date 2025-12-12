/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx";
// Simple modal component
function ConfirmModal({ open, onConfirm, onCancel, message }: { open: boolean, onConfirm: () => void, onCancel: () => void, message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.6)' }}>
      <div className="bg-white rounded shadow-lg p-6 min-w-[320px]">
        <div className="mb-4 text-lg">{message}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">OK</button>
        </div>
      </div>
    </div>
  );
}
import giveawaysService from "@/app/lib/api/services/giveaways"

interface GiveawayEntry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  facebook?: string;
  createdAt?: string;
}



export default function AdminGiveawayPage() {
  const [entries, setEntries] = useState<GiveawayEntry[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteIds, setDeleteIds] = useState<string[]>([])

  useEffect(() => {
    fetchEntries()
  }, [])


  const fetchEntries = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await giveawaysService.getAll(1, 1000) // fetch up to 1000 entries
      setEntries(Array.isArray(data) ? data : (data.data ?? []))
      setSelected([])
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (id: string, checked: boolean) => {
    setSelected((prev) => checked ? [...prev, id] : prev.filter((sid) => sid !== id))
  }

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? entries.map(e => e.id) : [])
  }

  // Open modal and set ids to delete
  const handleDelete = (ids: string[]) => {
    if (!ids.length) return;
    setDeleteIds(ids);
    setConfirmOpen(true);
  }

  // Confirm delete action
  const confirmDelete = async () => {
    setConfirmOpen(false);
    if (!deleteIds.length) return;
    setDeleting(true);
    try {
      for (const id of deleteIds) {
        await giveawaysService.delete(id);
      }
      await fetchEntries();
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    } finally {
      setDeleting(false);
      setDeleteIds([]);
    }
  };


  const handleExport = async (format: "csv" | "xlsx" = "xlsx") => {
    setExporting(true)
    try {
      const blob = await giveawaysService.export(format)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `giveaways.${format}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      alert(err.message || "Export failed.")
    } finally {
      setExporting(false)
    }
  }

  // Local Excel export using xlsx
  const handleLocalExcelExport = () => {
    const wsData = [
      ["Name", "Phone", "Facebook", "Email", "Date"],
      ...entries.map(e => [
        e.name,
        e.phone,
        e.facebook || "",
        e.email || "",
        e.createdAt ? new Date(e.createdAt).toLocaleString() : ""
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Giveaways");
    XLSX.writeFile(wb, "giveaways.xlsx");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Giveaway Entries</h1>
      <div className="mb-4 flex gap-2 items-center">
        <button
          onClick={handleLocalExcelExport}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Export to Excel (Local)
        </button>
        <button
          onClick={() => handleExport("csv")}
          disabled={exporting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {exporting ? "Exporting..." : "Export to CSV"}
        </button>
        <button
          onClick={() => handleDelete(selected)}
          disabled={deleting || selected.length === 0}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : selected.length > 1 ? `Delete Selected (${selected.length})` : "Delete Selected"}
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selected.length === entries.length && entries.length > 0}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">Facebook</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="border px-3 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(entry.id)}
                      onChange={e => handleSelect(entry.id, e.target.checked)}
                    />
                  </td>
                  <td className="border px-3 py-2">{entry.name}</td>
                  <td className="border px-3 py-2">{entry.phone}</td>
                  <td className="border px-3 py-2">{entry.facebook || '-'}</td>
                  <td className="border px-3 py-2">{entry.email || '-'}</td>
                  <td className="border px-3 py-2">{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "-"}</td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete([entry.id])}
                      disabled={deleting}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        message={`Are you sure you want to delete ${deleteIds.length > 1 ? 'these entries' : 'this entry'}?`}
      />
    </div>
  )
}
