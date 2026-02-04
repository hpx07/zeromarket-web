import numeral from "numeral"
import { format } from "date-fns"

export function formatCurrency(value: number, currency: string = "INR"): string {
  if (currency === "INR") {
    return `₹${numeral(value).format("0,0.00")}`
  }
  return `$${numeral(value).format("0,0.00")}`
}

export function formatNumber(value: number): string {
  return numeral(value).format("0,0.00")
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${numeral(value).format("0.00")}%`
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), "MMM dd, yyyy")
}

export function formatDateTime(date: Date | string): string {
  return format(new Date(date), "MMM dd, yyyy HH:mm")
}

export function formatCompactNumber(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
  return value.toFixed(2)
}
