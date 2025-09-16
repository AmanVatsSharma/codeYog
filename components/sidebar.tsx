'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
  ChevronRight,
  Star,
  Medal,
  Award,
  Clock,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface SidebarProps {
  user?: {
    name: string
    level: number
    rank: string
    avatar: string
    currentStreak: number
    xp: number
    xpToNext: number
  }
  activeTab?: string
}

export default function Sidebar({ user, activeTab = 'overview' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3, href: '/dashboard' },
    { id: 'practice', name: 'Practice', icon: Play, href: '/problems' },
    { id: 'progress', name: 'Progress', icon: TrendingUp, href: '/dashboard?tab=progress' },
    { id: 'ai-coach', name: 'AI Coach', icon: Brain, href: '/dashboard?tab=ai-coach' },
  ]

  const quickStats = [
    { label: 'Problems Solved', value: '89', icon: Trophy, color: 'text-yellow-500' },
    { label: 'Current Streak', value: '7 days', icon: Flame, color: 'text-orange-500' },
    { label: 'Rank', value: 'Gold', icon: Medal, color: 'text-amber-500' },
    { label: 'Level', value: '12', icon: Star, color: 'text-purple-500' },
  ]

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CodeYog
                  </h2>
                  <p className="text-xs text-gray-600">Dashboard</p>
                </div>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-gray-100"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* User Profile */}
        {user && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 border-b border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">Level {user.level} • {user.rank}</p>
              </div>
            </div>
            
            {/* XP Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{user.xp} XP</span>
              </div>
              <Progress value={(user.xp / (user.xp + user.xpToNext)) * 100} className="h-2" />
              <p className="text-xs text-gray-500">{user.xpToNext} XP to next level</p>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={item.href}>
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start space-x-3 transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'hover:bg-gray-100'
                  } ${isCollapsed ? 'px-2' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 border-t border-gray-200"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors"
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed ? (
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start space-x-3">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button variant="ghost" size="icon" className="w-full">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}