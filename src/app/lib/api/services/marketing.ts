import { apiClient } from "../client"
import { SendMarketingEmailRequest, MarketingEmailResponse } from "../types"

export const marketingService = {
  /**
   * Send marketing email
   */
  sendEmail: async (data: SendMarketingEmailRequest): Promise<MarketingEmailResponse[]> => {
    const response = await apiClient.post<MarketingEmailResponse[]>("/api/marketing/email", data)
    return response.data
  },

  /**
   * Get email campaign status
   */
  getCampaignStatus: async (campaignId: string): Promise<{
    id: string
    status: string
    sentCount: number
    openCount: number
    clickCount: number
    bounceCount: number
    createdAt: string
    updatedAt: string
  }> => {
    const response = await apiClient.get(`/api/marketing/campaigns/${campaignId}`)
    return response.data
  },

  /**
   * Get all campaigns
   */
  getAllCampaigns: async (page = 1, limit = 20): Promise<{
    data: Array<{
      id: string
      name: string
      status: string
      sentCount: number
      openRate: number
      clickRate: number
      createdAt: string
    }>
    pagination: any
  }> => {
    const response = await apiClient.get("/api/marketing/campaigns", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Create promotional banner
   */
  createBanner: async (data: {
    title: string
    description?: string
    image: string
    link?: string
    isActive: boolean
    displayFrom: string
    displayTo?: string
  }): Promise<{
    id: string
    title: string
    description?: string
    image: string
    link?: string
    isActive: boolean
  }> => {
    const response = await apiClient.post("/api/marketing/banners", data)
    return response.data
  },

  /**
   * Get active banners
   */
  getActiveBanners: async (): Promise<Array<{
    id: string
    title: string
    description?: string
    image: string
    link?: string
    displayPosition: string
  }>> => {
    const response = await apiClient.get("/api/marketing/banners/active")
    return response.data
  },

  /**
   * Schedule email campaign
   */
  scheduleEmailCampaign: async (data: {
    name: string
    recipientSegment: string
    subject: string
    template: string
    scheduledAt: string
    templateVariables?: Record<string, unknown>
  }): Promise<{
    campaignId: string
    status: string
    scheduledAt: string
  }> => {
    const response = await apiClient.post("/api/marketing/schedule-campaign", data)
    return response.data
  },

  /**
   * Get customer segments
   */
  getSegments: async (): Promise<Array<{
    id: string
    name: string
    description: string
    customerCount: number
    createdAt: string
  }>> => {
    const response = await apiClient.get("/api/marketing/segments")
    return response.data
  },

  /**
   * Send SMS notification
   */
  sendSMS: async (data: {
    phoneNumbers: string[]
    message: string
    scheduleTime?: string
  }): Promise<{
    status: string
    sentCount: number
    failedCount: number
  }> => {
    const response = await apiClient.post("/api/marketing/sms", data)
    return response.data
  },
}

export default marketingService
