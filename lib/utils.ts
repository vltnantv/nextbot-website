import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "1 отзив" / "64 отзива": Bulgarian has one form for 1 and another for every other number. */
export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
