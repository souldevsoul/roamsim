import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format bytes to human readable
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Format price from cents
export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}

// Convert eSIM Access price (value * 10000) to cents
export function apiPriceToCents(apiPrice: number): number {
  return Math.round(apiPrice / 100) // 10000 = $1.00, we want 100 = $1.00
}

// Apply markup percentage
export function applyMarkup(priceInCents: number, markupPercent: number): number {
  return Math.round(priceInCents * (1 + markupPercent / 100))
}

// Generate unique transaction ID
export function generateTransactionId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `RS-${timestamp}-${random}`.toUpperCase()
}

// Parse location codes to country names
export function parseLocationCodes(locationString: string): string[] {
  return locationString.split(',').map(code => code.trim())
}

// Get country name from ISO code
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  DE: 'Germany',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy',
  JP: 'Japan',
  KR: 'South Korea',
  CN: 'China',
  HK: 'Hong Kong',
  TW: 'Taiwan',
  TH: 'Thailand',
  SG: 'Singapore',
  MY: 'Malaysia',
  ID: 'Indonesia',
  PH: 'Philippines',
  VN: 'Vietnam',
  AU: 'Australia',
  NZ: 'New Zealand',
  CA: 'Canada',
  MX: 'Mexico',
  BR: 'Brazil',
  AR: 'Argentina',
  PT: 'Portugal',
  NL: 'Netherlands',
  BE: 'Belgium',
  AT: 'Austria',
  CH: 'Switzerland',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  IE: 'Ireland',
  PL: 'Poland',
  CZ: 'Czech Republic',
  GR: 'Greece',
  TR: 'Turkey',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  EG: 'Egypt',
  ZA: 'South Africa',
  IN: 'India',
  '!GL': 'Global',
  '!RG': 'Regional',
}

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] || code
}

// Get flag emoji from country code
export function getFlagEmoji(countryCode: string): string {
  if (countryCode.startsWith('!')) return '🌍'

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}

// Format duration
export function formatDuration(duration: number, unit: string): string {
  const unitMap: Record<string, string> = {
    DAY: duration === 1 ? 'day' : 'days',
    MONTH: duration === 1 ? 'month' : 'months',
    YEAR: duration === 1 ? 'year' : 'years',
  }

  return `${duration} ${unitMap[unit] || unit.toLowerCase()}`
}

// Calculate usage percentage
export function calculateUsagePercent(used: number, total: number): number {
  if (total === 0) return 0
  return Math.min(100, Math.round((used / total) * 100))
}

// Get status color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    RELEASED: 'text-blue-400',
    ENABLED: 'text-green-400',
    IN_USE: 'text-green-400',
    DISABLED: 'text-yellow-400',
    SUSPENDED: 'text-yellow-400',
    DELETED: 'text-red-400',
    USED_UP: 'text-gray-400',
    EXPIRED: 'text-red-400',
    CANCEL: 'text-red-400',
  }

  return colors[status] || 'text-gray-400'
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
