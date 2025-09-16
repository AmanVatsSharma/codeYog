import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

export type ColorName = 'blue' | 'purple' | 'green' | 'yellow' | 'orange' | 'red' | 'indigo' | 'pink' | 'cyan' | 'gray';

export function colorToBg(color: ColorName, shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 = 500) {
  const map: Record<ColorName, Record<number, string>> = {
    blue: { 50: 'bg-blue-50', 100: 'bg-blue-100', 200: 'bg-blue-200', 300: 'bg-blue-300', 400: 'bg-blue-400', 500: 'bg-blue-500', 600: 'bg-blue-600', 700: 'bg-blue-700' },
    purple: { 50: 'bg-purple-50', 100: 'bg-purple-100', 200: 'bg-purple-200', 300: 'bg-purple-300', 400: 'bg-purple-400', 500: 'bg-purple-500', 600: 'bg-purple-600', 700: 'bg-purple-700' },
    green: { 50: 'bg-green-50', 100: 'bg-green-100', 200: 'bg-green-200', 300: 'bg-green-300', 400: 'bg-green-400', 500: 'bg-green-500', 600: 'bg-green-600', 700: 'bg-green-700' },
    yellow: { 50: 'bg-yellow-50', 100: 'bg-yellow-100', 200: 'bg-yellow-200', 300: 'bg-yellow-300', 400: 'bg-yellow-400', 500: 'bg-yellow-500', 600: 'bg-yellow-600', 700: 'bg-yellow-700' },
    orange: { 50: 'bg-orange-50', 100: 'bg-orange-100', 200: 'bg-orange-200', 300: 'bg-orange-300', 400: 'bg-orange-400', 500: 'bg-orange-500', 600: 'bg-orange-600', 700: 'bg-orange-700' },
    red: { 50: 'bg-red-50', 100: 'bg-red-100', 200: 'bg-red-200', 300: 'bg-red-300', 400: 'bg-red-400', 500: 'bg-red-500', 600: 'bg-red-600', 700: 'bg-red-700' },
    indigo: { 50: 'bg-indigo-50', 100: 'bg-indigo-100', 200: 'bg-indigo-200', 300: 'bg-indigo-300', 400: 'bg-indigo-400', 500: 'bg-indigo-500', 600: 'bg-indigo-600', 700: 'bg-indigo-700' },
    pink: { 50: 'bg-pink-50', 100: 'bg-pink-100', 200: 'bg-pink-200', 300: 'bg-pink-300', 400: 'bg-pink-400', 500: 'bg-pink-500', 600: 'bg-pink-600', 700: 'bg-pink-700' },
    cyan: { 50: 'bg-cyan-50', 100: 'bg-cyan-100', 200: 'bg-cyan-200', 300: 'bg-cyan-300', 400: 'bg-cyan-400', 500: 'bg-cyan-500', 600: 'bg-cyan-600', 700: 'bg-cyan-700' },
    gray: { 50: 'bg-gray-50', 100: 'bg-gray-100', 200: 'bg-gray-200', 300: 'bg-gray-300', 400: 'bg-gray-400', 500: 'bg-gray-500', 600: 'bg-gray-600', 700: 'bg-gray-700' }
  };
  return map[color][shade];
}

export function colorToText(color: ColorName, shade: 600 | 700 = 600) {
  const map: Record<ColorName, Record<number, string>> = {
    blue: { 600: 'text-blue-600', 700: 'text-blue-700' },
    purple: { 600: 'text-purple-600', 700: 'text-purple-700' },
    green: { 600: 'text-green-600', 700: 'text-green-700' },
    yellow: { 600: 'text-yellow-600', 700: 'text-yellow-700' },
    orange: { 600: 'text-orange-600', 700: 'text-orange-700' },
    red: { 600: 'text-red-600', 700: 'text-red-700' },
    indigo: { 600: 'text-indigo-600', 700: 'text-indigo-700' },
    pink: { 600: 'text-pink-600', 700: 'text-pink-700' },
    cyan: { 600: 'text-cyan-600', 700: 'text-cyan-700' },
    gray: { 600: 'text-gray-600', 700: 'text-gray-700' }
  };
  return map[color][shade];
}

export function colorToBorder(color: ColorName, shade: 200 | 300 | 400 = 300) {
  const map: Record<ColorName, Record<number, string>> = {
    blue: { 200: 'border-blue-200', 300: 'border-blue-300', 400: 'border-blue-400' },
    purple: { 200: 'border-purple-200', 300: 'border-purple-300', 400: 'border-purple-400' },
    green: { 200: 'border-green-200', 300: 'border-green-300', 400: 'border-green-400' },
    yellow: { 200: 'border-yellow-200', 300: 'border-yellow-300', 400: 'border-yellow-400' },
    orange: { 200: 'border-orange-200', 300: 'border-orange-300', 400: 'border-orange-400' },
    red: { 200: 'border-red-200', 300: 'border-red-300', 400: 'border-red-400' },
    indigo: { 200: 'border-indigo-200', 300: 'border-indigo-300', 400: 'border-indigo-400' },
    pink: { 200: 'border-pink-200', 300: 'border-pink-300', 400: 'border-pink-400' },
    cyan: { 200: 'border-cyan-200', 300: 'border-cyan-300', 400: 'border-cyan-400' },
    gray: { 200: 'border-gray-200', 300: 'border-gray-300', 400: 'border-gray-400' }
  };
  return map[color][shade];
}

