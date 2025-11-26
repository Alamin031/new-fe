export default function NotifyProductsLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-64 rounded-lg bg-muted" />
        <div className="h-6 w-96 rounded-lg bg-muted" />
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div className="h-10 w-48 rounded-lg bg-muted" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
