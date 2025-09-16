'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './navigation'
import Sidebar from './sidebar'

interface LayoutProps {
  children: React.ReactNode
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
  showSidebar?: boolean
}

export default function Layout({ 
  children, 
  user, 
  activeTab = 'overview', 
  showSidebar = true 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation user={user} />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar user={user} activeTab={activeTab} />
        )}
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? 'ml-80' : 'ml-0'
          }`}
        >
          <div className="p-6">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  )
}