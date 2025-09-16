'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Trophy, 
  Target, 
  Brain, 
  BarChart3, 
  Play, 
  TrendingUp, 
  Flame, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface NavigationProps {
  user?: {
    name: string
    level: number
    rank: string
    avatar: string
    currentStreak: number
  }
}

export default function Navigation({ user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3, href: '/dashboard' },
    { id: 'practice', name: 'Practice', icon: Play, href: '/problems' },
    { id: 'progress', name: 'Progress', icon: TrendingUp, href: '/dashboard?tab=progress' },
    { id: 'ai-coach', name: 'AI Coach', icon: Brain, href: '/dashboard?tab=ai-coach' },
  ]

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Code className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeYog
              </h1>
              <p className="text-xs text-gray-600">Your AI Coding Companion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
              >
                3
              </Badge>
            </Button>

            {/* Streak */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  {user.currentStreak} days
                </span>
              </div>
            )}

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">Level {user.level} • {user.rank}</p>
                </div>
                <div className="relative">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="gradient" size="sm">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start space-x-2 ${
                        activeTab === item.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : ''
                      }`}
                      onClick={() => {
                        setActiveTab(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                ))}
                
                {user && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">Level {user.level} • {user.rank}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-700">
                        {user.currentStreak} day streak
                      </span>
                    </div>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}