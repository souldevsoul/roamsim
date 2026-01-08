import axios, { AxiosInstance } from 'axios'
import crypto from 'crypto'

const API_BASE_URL = 'https://api.esimaccess.com/api/v1/open'

interface ESIMAccessConfig {
  accessCode: string
  secretKey: string
}

interface PackageListParams {
  locationCode?: string
  type?: 'BASE' | 'TOPUP'
  packageCode?: string
  slug?: string
  iccid?: string
  dataType?: string
}

interface Package {
  packageCode: string
  slug: string
  name: string
  price: number // value * 10000
  currencyCode: string
  volume: number // bytes
  smsStatus: number
  dataType: number
  unusedValidTime: number
  duration: number
  durationUnit: string
  location: string
  description: string
  activeType: number
  favorite: boolean
  retailPrice: number
  speed: string
  locationNetworkList: Array<{
    locationName: string
    locationLogo: string
    operatorList: Array<{
      operatorName: string
      networkType: string
    }>
  }>
  ipExport?: string
  supportTopUpType?: number
  fupPolicy?: string
}

interface OrderParams {
  transactionId: string
  amount?: number // total * 10000
  packageInfoList: Array<{
    packageCode: string
    count: number
    price?: number
    periodNum?: number
  }>
}

interface ESIMProfile {
  esimTranNo: string
  orderNo: string
  transactionId: string
  imsi: string
  iccid: string
  smsStatus: number
  msisdn: string
  ac: string // activation code
  qrCodeUrl: string
  shortUrl: string
  smdpStatus: string
  eid: string
  activeType: number
  dataType: number
  activateTime: string | null
  expiredTime: string
  totalVolume: number
  totalDuration: number
  durationUnit: string
  orderUsage: number
  esimStatus: string
  pin: string
  puk: string
  apn: string
  packageList: Array<{
    packageName: string
    packageCode: string
    slug: string
    duration: number
    volume: number
    locationCode: string
    createTime: string
  }>
}

interface QueryParams {
  orderNo?: string
  esimTranNo?: string
  iccid?: string
  startTime?: string
  endTime?: string
  pager: {
    pageNum: number
    pageSize: number
  }
}

interface APIResponse<T> {
  success: boolean
  errorCode: string | null
  errorMsg: string | null
  obj: T
}

export class ESIMAccessAPI {
  private client: AxiosInstance
  private accessCode: string
  private secretKey: string

  constructor(config: ESIMAccessConfig) {
    this.accessCode = config.accessCode
    this.secretKey = config.secretKey

    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private generateSignature(timestamp: string, requestId: string, body: string): string {
    const signData = timestamp + requestId + this.accessCode + body
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(signData)
      .digest('hex')
      .toLowerCase()
  }

  private async request<T>(endpoint: string, data: object = {}): Promise<T> {
    const timestamp = Date.now().toString()
    const requestId = crypto.randomUUID()
    const body = JSON.stringify(data)

    const signature = this.generateSignature(timestamp, requestId, body)

    const response = await this.client.post<APIResponse<T>>(endpoint, data, {
      headers: {
        'RT-AccessCode': this.accessCode,
        'RT-RequestID': requestId,
        'RT-Signature': signature,
        'RT-Timestamp': timestamp,
      },
    })

    if (!response.data.success) {
      throw new Error(
        `eSIM Access API Error: ${response.data.errorCode} - ${response.data.errorMsg}`
      )
    }

    return response.data.obj
  }

  // Get all available data packages
  async getPackages(params: PackageListParams = {}): Promise<{ packageList: Package[] }> {
    return this.request('/package/list', params)
  }

  // Order eSIM profiles
  async orderProfiles(params: OrderParams): Promise<{ orderNo: string; transactionId: string }> {
    return this.request('/esim/order', params)
  }

  // Query allocated profiles
  async queryProfiles(params: QueryParams): Promise<{
    esimList: ESIMProfile[]
    pager: { pageSize: number; pageNum: number; total: number }
  }> {
    return this.request('/esim/query', params)
  }

  // Cancel a profile (refundable if not used)
  async cancelProfile(params: { iccid?: string; esimTranNo?: string }): Promise<object> {
    return this.request('/esim/cancel', params)
  }

  // Suspend a profile
  async suspendProfile(params: { iccid?: string; esimTranNo?: string }): Promise<object> {
    return this.request('/esim/suspend', params)
  }

  // Unsuspend a profile
  async unsuspendProfile(params: { iccid?: string; esimTranNo?: string }): Promise<object> {
    return this.request('/esim/unsuspend', params)
  }

  // Revoke a profile (non-refundable)
  async revokeProfile(params: { iccid?: string; esimTranNo?: string }): Promise<object> {
    return this.request('/esim/revoke', params)
  }

  // Query account balance
  async getBalance(): Promise<{ balance: number }> {
    return this.request('/balance/query', {})
  }

  // Top up an existing eSIM
  async topUp(params: {
    transactionId: string
    esimTranNo?: string
    iccid?: string
    packageInfoList: Array<{
      packageCode: string
      count: number
      price?: number
    }>
  }): Promise<{ orderNo: string; transactionId: string }> {
    return this.request('/esim/topup', params)
  }

  // Set webhook URL
  async setWebhook(webhookUrl: string): Promise<object> {
    return this.request('/webhook/save', { webhook: webhookUrl })
  }

  // Query current webhook
  async getWebhook(): Promise<{ webhook: string }> {
    return this.request('/webhook/query', {})
  }

  // Send SMS to eSIM
  async sendSMS(params: {
    iccid?: string
    esimTranNo?: string
    message: string
  }): Promise<object> {
    return this.request('/esim/sendSms', params)
  }

  // Check usage (if available)
  async checkUsage(params: { iccid?: string; esimTranNo?: string }): Promise<object> {
    return this.request('/esim/usage', params)
  }

  // Get supported regions
  async getSupportedRegions(): Promise<object> {
    return this.request('/region/list', {})
  }
}

// Create singleton instance
let esimApi: ESIMAccessAPI | null = null

export function getESIMAccessAPI(): ESIMAccessAPI {
  if (!esimApi) {
    const accessCode = process.env.ESIM_ACCESS_CODE
    const secretKey = process.env.ESIM_SECRET_KEY

    if (!accessCode || !secretKey) {
      throw new Error('eSIM Access API credentials not configured')
    }

    esimApi = new ESIMAccessAPI({
      accessCode,
      secretKey,
    })
  }

  return esimApi
}

export type { Package, ESIMProfile, OrderParams, QueryParams }
