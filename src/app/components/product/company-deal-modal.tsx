"use client"

import { X, CheckCircle2, Award, Users, Zap, Shield, Handshake, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, VisuallyHiddenTitle } from "../ui/dialog"
import { Button } from "../ui/button"

interface CompanyDealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyDealModal({ open, onOpenChange }: CompanyDealModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-0">
        <VisuallyHiddenTitle>Company Deal</VisuallyHiddenTitle>
        
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-lg p-1 hover:bg-muted transition-colors"
          aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        {/* Corporate Page Content */}
        <div className="bg-gradient-to-b from-emerald-50 via-white to-blue-50 dark:from-emerald-950/30 dark:via-background dark:to-blue-950/30">
          
          {/* Hero Section */}
          <div className="px-6 pt-8 pb-6 text-center border-b border-border/30">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Corporate Deals & Partnerships</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium solutions designed for businesses and organizations seeking quality and reliability
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="px-6 py-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Why Partner With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-border/50 bg-white/60 dark:bg-background/60 p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Award className="h-6 w-6 text-emerald-600 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Certified Quality</h4>
                    <p className="text-sm text-muted-foreground">100% genuine products with official warranty and after-sales support</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-white/60 dark:bg-background/60 p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Zap className="h-6 w-6 text-blue-600 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Bulk Discounts</h4>
                    <p className="text-sm text-muted-foreground">Competitive wholesale pricing for large orders and corporate purchases</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-white/60 dark:bg-background/60 p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Users className="h-6 w-6 text-purple-600 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Dedicated Support</h4>
                    <p className="text-sm text-muted-foreground">24/7 customer service and dedicated account managers for corporate clients</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-white/60 dark:bg-background/60 p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Shield className="h-6 w-6 text-orange-600 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Secure Transactions</h4>
                    <p className="text-sm text-muted-foreground">Flexible payment terms and secure invoicing for organizations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Stats */}
          <div className="px-6 py-8 border-t border-border/30 border-b border-border/30 bg-white/40 dark:bg-background/40">
            <h3 className="text-xl font-bold text-foreground mb-6">Our Track Record</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">50K+</div>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">1000+</div>
                <p className="text-sm text-muted-foreground">Corporate Partners</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">15+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Key Services */}
          <div className="px-6 py-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Corporate Services</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Bulk Order Management</p>
                  <p className="text-sm text-muted-foreground">Handle large orders with streamlined procurement and delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Custom Solutions</p>
                  <p className="text-sm text-muted-foreground">Tailored packages based on your organization's specific requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Extended Warranty Options</p>
                  <p className="text-sm text-muted-foreground">Premium protection plans available for corporate equipment</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Flexible Payment Terms</p>
                  <p className="text-sm text-muted-foreground">Multiple payment options including EMI, invoicing, and corporate credit</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">On-site Support</p>
                  <p className="text-sm text-muted-foreground">Technical support and maintenance services at your location</p>
                </div>
              </div>
            </div>
          </div>

          {/* Partnerships Section */}
          <div className="px-6 py-8 border-t border-border/30 bg-white/40 dark:bg-background/40">
            <h3 className="text-xl font-bold text-foreground mb-6">Trusted By Leading Organizations</h3>
            <p className="text-sm text-muted-foreground mb-6">We partner with major corporations, educational institutions, and government organizations across Bangladesh and the region</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Banking Sector", "Tech Companies", "Education", "Healthcare"].map((sector) => (
                <div key={sector} className="px-4 py-3 rounded-lg bg-muted/50 border border-border/30 text-center">
                  <p className="text-sm font-medium text-foreground">{sector}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="px-6 py-8 border-t border-border/30">
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-600/20 dark:to-blue-600/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 p-6 text-center">
              <Handshake className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-2">Ready to Work Together?</h3>
              <p className="text-sm text-muted-foreground mb-4">Contact our corporate team to discuss your organization's needs and get a customized quotation</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  onClick={() => window.location.href = 'mailto:corporate@example.com'}>
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-lg"
                  onClick={() => window.location.href = 'tel:+880123456789'}>
                  Call: +880-1234-567890
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-6 py-6 border-t border-border/30 text-center text-xs text-muted-foreground">
            <p className="mb-2">📧 corporate@techstore.com | 📱 +880-1234-567890</p>
            <p>Corporate Sales Office: Dhaka, Bangladesh | Available: Mon-Fri, 9 AM - 6 PM</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
