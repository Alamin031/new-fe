"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { useLoyaltyPointsStore, type LoyaltyTier } from "../../store/loyalty-points-store"
import { Plus, Trash2, Edit2, Gift, Zap, Users, TrendingUp } from "lucide-react"
import { cn } from "../../lib/utils"

export default function LoyaltyPointsManagementPage() {
  const { config, users, updateConfig, addTier, removeTier, updateTier } = useLoyaltyPointsStore()
  const [isAddingTier, setIsAddingTier] = useState(false)
  const [editingTier, setEditingTier] = useState<LoyaltyTier | null>(null)
  const [newTier, setNewTier] = useState<Partial<LoyaltyTier>>({
    name: "",
    minPoints: 0,
    maxPoints: 0,
    multiplier: 1,
    benefits: [],
    color: "bg-blue-600",
  })

  const handleAddTier = () => {
    if (newTier.name && newTier.minPoints !== undefined) {
      addTier({
        id: `tier-${Date.now()}`,
        name: newTier.name || "",
        minPoints: newTier.minPoints,
        maxPoints: newTier.maxPoints || 999999,
        multiplier: newTier.multiplier || 1,
        benefits: newTier.benefits || [],
        color: newTier.color || "bg-blue-600",
      })
      setNewTier({ name: "", minPoints: 0, maxPoints: 0, multiplier: 1, benefits: [], color: "bg-blue-600" })
      setIsAddingTier(false)
    }
  }

  const handleUpdateTier = () => {
    if (editingTier) {
      updateTier(editingTier.id, editingTier)
      setEditingTier(null)
    }
  }

  const userStats = {
    totalUsers: Object.keys(users).length,
    totalPoints: Object.values(users).reduce((sum, u) => sum + u.totalPoints, 0),
    averagePoints: Math.round(Object.values(users).reduce((sum, u) => sum + u.totalPoints, 0) / Object.keys(users).length),
    tierDistribution: {
      bronze: Object.values(users).filter((u) => u.currentTier === "bronze").length,
      silver: Object.values(users).filter((u) => u.currentTier === "silver").length,
      gold: Object.values(users).filter((u) => u.currentTier === "gold").length,
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Loyalty Points Management</h1>
        <p className="text-muted-foreground">Configure loyalty tiers, rules, and track user points</p>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="mt-1 text-2xl font-bold">{userStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points Issued</p>
                <p className="mt-1 text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
              </div>
              <Gift className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Points</p>
                <p className="mt-1 text-2xl font-bold">{userStats.averagePoints.toLocaleString()}</p>
              </div>
              <Zap className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Tier Members</p>
                <p className="mt-1 text-2xl font-bold">{userStats.tierDistribution.gold}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loyalty Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Points Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="pointsPerBDT">Points per ৳100</Label>
              <Input
                id="pointsPerBDT"
                type="number"
                step="0.1"
                value={config.pointsPerBDT}
                onChange={(e) => updateConfig({ pointsPerBDT: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Points earned per ৳100 spent</p>
            </div>
            <div>
              <Label htmlFor="redeemPointsPerBDT">Redeem: 1 Point = ৳</Label>
              <Input
                id="redeemPointsPerBDT"
                type="number"
                value={config.redeemPointsPerBDT}
                onChange={(e) => updateConfig({ redeemPointsPerBDT: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Redemption rate in BDT</p>
            </div>
            <div>
              <Label htmlFor="birthMonthBonus">Birthday Bonus Points</Label>
              <Input
                id="birthMonthBonus"
                type="number"
                value={config.birthMonthBonus}
                onChange={(e) => updateConfig({ birthMonthBonus: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Bonus on birthday month</p>
            </div>
            <div>
              <Label htmlFor="reviewPoints">Points per Review</Label>
              <Input
                id="reviewPoints"
                type="number"
                value={config.reviewPoints}
                onChange={(e) => updateConfig({ reviewPoints: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Points for product reviews</p>
            </div>
          </div>

          <div>
            <Label htmlFor="referralPoints">Referral Bonus Points</Label>
            <Input
              id="referralPoints"
              type="number"
              value={config.referralPoints}
              onChange={(e) => updateConfig({ referralPoints: Number(e.target.value) })}
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground">Points earned when referral completes purchase</p>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Tiers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Loyalty Tiers
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAddingTier(!isAddingTier)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Tier
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAddingTier && (
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-4 font-semibold">New Loyalty Tier</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="newTierName">Tier Name</Label>
                    <Input
                      id="newTierName"
                      value={newTier.name || ""}
                      onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                      className="mt-2"
                      placeholder="e.g., Platinum"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newTierMultiplier">Points Multiplier</Label>
                    <Input
                      id="newTierMultiplier"
                      type="number"
                      step="0.1"
                      value={newTier.multiplier || 1}
                      onChange={(e) => setNewTier({ ...newTier, multiplier: Number(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="newTierMin">Minimum Points</Label>
                    <Input
                      id="newTierMin"
                      type="number"
                      value={newTier.minPoints || 0}
                      onChange={(e) => setNewTier({ ...newTier, minPoints: Number(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newTierMax">Maximum Points</Label>
                    <Input
                      id="newTierMax"
                      type="number"
                      value={newTier.maxPoints || 0}
                      onChange={(e) => setNewTier({ ...newTier, maxPoints: Number(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddTier}>
                    Save Tier
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsAddingTier(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {config.tiers
              .sort((a, b) => a.minPoints - b.minPoints)
              .map((tier) => (
                <div key={tier.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  {editingTier?.id === tier.id ? (
                    <div className="flex-1 space-y-3">
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <Label className="text-xs">Tier Name</Label>
                          <Input
                            value={editingTier.name}
                            onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Min Points</Label>
                          <Input
                            type="number"
                            value={editingTier.minPoints}
                            onChange={(e) => setEditingTier({ ...editingTier, minPoints: Number(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Max Points</Label>
                          <Input
                            type="number"
                            value={editingTier.maxPoints}
                            onChange={(e) => setEditingTier({ ...editingTier, maxPoints: Number(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Multiplier</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={editingTier.multiplier}
                            onChange={(e) => setEditingTier({ ...editingTier, multiplier: Number(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleUpdateTier}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingTier(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn("h-4 w-4 rounded-full", tier.color)}
                        />
                        <div>
                          <p className="font-medium">{tier.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} points • {tier.multiplier}x multiplier
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {tier.benefits.map((benefit, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingTier(tier)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive"
                          onClick={() => removeTier(tier.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* User Loyalty Points Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Loyalty Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="py-3 text-left font-medium">User ID</th>
                  <th className="py-3 text-center font-medium">Total Points</th>
                  <th className="py-3 text-center font-medium">Tier</th>
                  <th className="py-3 text-center font-medium">This Month</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(users).map((user) => {
                  const tier = config.tiers.find((t) => t.id === user.currentTier)
                  return (
                    <tr key={user.userId} className="border-b border-border last:border-0">
                      <td className="py-3 font-medium">{user.userId}</td>
                      <td className="py-3 text-center">{user.totalPoints.toLocaleString()}</td>
                      <td className="py-3 text-center">
                        <Badge
                          className={cn(tier?.color || "bg-gray-600", "text-white")}
                        >
                          {tier?.name}
                        </Badge>
                      </td>
                      <td className="py-3 text-center">{user.pointsThisMonth.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tier Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Tier Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { tier: "gold", label: "Gold", count: userStats.tierDistribution.gold },
              { tier: "silver", label: "Silver", count: userStats.tierDistribution.silver },
              { tier: "bronze", label: "Bronze", count: userStats.tierDistribution.bronze },
            ].map(({ tier, label, count }) => (
              <div key={tier}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  <span className="text-sm text-muted-foreground">{count} users</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${
                        userStats.totalUsers > 0
                          ? (count / userStats.totalUsers) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
