"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { useEMIStore, type EMIPlan } from "../../store/emi-store"
import { Plus, Trash2, Edit2, DollarSign, Percent, Package } from "lucide-react"
import { formatPrice } from "../../lib/utils/format"

export default function EMIManagementPage() {
  const { config, updateConfig, addPlan, removePlan, updatePlan } = useEMIStore()
  const [isAddingPlan, setIsAddingPlan] = useState(false)
  const [editingPlan, setEditingPlan] = useState<EMIPlan | null>(null)
  const [newPlan, setNewPlan] = useState({ months: 0, name: "", interestRate: 0 })

  const handleAddPlan = () => {
    if (newPlan.months && newPlan.name) {
      addPlan({
        id: `plan-${Date.now()}`,
        months: newPlan.months,
        name: newPlan.name,
        interestRate: newPlan.interestRate,
        enabled: true,
      })
      setNewPlan({ months: 0, name: "", interestRate: 0 })
      setIsAddingPlan(false)
    }
  }

  const handleUpdatePlan = () => {
    if (editingPlan) {
      updatePlan(editingPlan.id, editingPlan)
      setEditingPlan(null)
    }
  }

  const togglePlanStatus = (planId: string) => {
    const plan = config.plans.find((p) => p.id === planId)
    if (plan) {
      updatePlan(planId, { enabled: !plan.enabled })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">EMI Management</h1>
        <p className="text-muted-foreground">Configure EMI plans, eligibility, and settings</p>
      </div>

      {/* EMI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            EMI Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="minAmount">Minimum EMI Amount (৳)</Label>
              <Input
                id="minAmount"
                type="number"
                value={config.minAmount}
                onChange={(e) => updateConfig({ minAmount: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Minimum order amount eligible for EMI</p>
            </div>
            <div>
              <Label htmlFor="maxAmount">Maximum EMI Amount (৳)</Label>
              <Input
                id="maxAmount"
                type="number"
                value={config.maxAmount}
                onChange={(e) => updateConfig({ maxAmount: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Maximum order amount eligible for EMI</p>
            </div>
          </div>

          <Separator />

          {/* Eligible Categories */}
          <div>
            <Label className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Eligible Categories
            </Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {["smartphones", "laptops", "tablets", "audio", "wearables"].map((category) => (
                <Badge
                  key={category}
                  variant={config.eligibleCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const updated = config.eligibleCategories.includes(category)
                      ? config.eligibleCategories.filter((c) => c !== category)
                      : [...config.eligibleCategories, category]
                    updateConfig({ eligibleCategories: updated })
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EMI Plans */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            EMI Plans
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAddingPlan(!isAddingPlan)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Plan
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAddingPlan && (
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-4 font-semibold">New EMI Plan</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="newMonths">Months</Label>
                    <Input
                      id="newMonths"
                      type="number"
                      value={newPlan.months}
                      onChange={(e) => setNewPlan({ ...newPlan, months: Number(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newName">Plan Name</Label>
                    <Input
                      id="newName"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="mt-2"
                      placeholder="e.g., 6 Months"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newRate">Interest Rate (%)</Label>
                    <Input
                      id="newRate"
                      type="number"
                      step="0.1"
                      value={newPlan.interestRate}
                      onChange={(e) => setNewPlan({ ...newPlan, interestRate: Number(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddPlan}>
                    Save Plan
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsAddingPlan(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {config.plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                {editingPlan?.id === plan.id ? (
                  <div className="flex-1 space-y-3">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <Label className="text-xs">Months</Label>
                        <Input
                          type="number"
                          value={editingPlan.months}
                          onChange={(e) =>
                            setEditingPlan({ ...editingPlan, months: Number(e.target.value) })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Plan Name</Label>
                        <Input
                          value={editingPlan.name}
                          onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Interest Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={editingPlan.interestRate}
                          onChange={(e) =>
                            setEditingPlan({ ...editingPlan, interestRate: Number(e.target.value) })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleUpdatePlan}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingPlan(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium">{plan.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{plan.months} months</span>
                        <span>•</span>
                        <span>{plan.interestRate}% interest</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={plan.enabled ? "default" : "secondary"}>
                        {plan.enabled ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePlanStatus(plan.id)}
                      >
                        {plan.enabled ? "Disable" : "Enable"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingPlan(plan)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        onClick={() => removePlan(plan.id)}
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

      {/* EMI Calculator Preview */}
      <Card>
        <CardHeader>
          <CardTitle>EMI Calculator Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Example: For ৳100,000 order with available plans
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="py-2 text-left font-medium">Plan</th>
                    <th className="py-2 text-center font-medium">Monthly Payment</th>
                    <th className="py-2 text-center font-medium">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {config.plans.filter((p) => p.enabled).map((plan) => {
                    const principal = 100000
                    const monthlyRate = plan.interestRate / 100 / 12
                    const emi =
                      (principal * monthlyRate * Math.pow(1 + monthlyRate, plan.months)) /
                      (Math.pow(1 + monthlyRate, plan.months) - 1)
                    const totalInterest = emi * plan.months - principal

                    return (
                      <tr key={plan.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium">{plan.name}</td>
                        <td className="py-3 text-center">{formatPrice(emi)}</td>
                        <td className="py-3 text-center">{formatPrice(totalInterest)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
