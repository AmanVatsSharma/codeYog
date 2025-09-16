'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Trophy, 
  Target, 
  Brain, 
  Zap, 
  Users, 
  Star, 
  ArrowRight, 
  Play, 
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  Lock,
  Unlock,
  Award,
  Flame,
  Timer,
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Layout from '@/components/layout'

const TestsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const user = {
    name: "Alex Kumar",
    level: 12,
    rank: "Gold",
    avatar: "/api/placeholder/80/80",
    currentStreak: 7,
    xp: 2450,
    xpToNext: 550
  }

  const tests = [
    {
      id: 1,
      title: "Data Structures Fundamentals",
      description: "Test your knowledge of basic data structures including arrays, linked lists, stacks, and queues.",
      category: "practice",
      difficulty: "medium",
      duration: "60 minutes",
      questions: 15,
      attempts: 1247,
      averageScore: "78%",
      premium: false,
      status: "available",
      topics: ["Arrays", "Linked Lists", "Stacks", "Queues"]
    },
    {
      id: 2,
      title: "Algorithm Design Patterns",
      description: "Master common algorithmic patterns including two pointers, sliding window, and dynamic programming.",
      category: "practice",
      difficulty: "hard",
      duration: "90 minutes",
      questions: 20,
      attempts: 892,
      averageScore: "65%",
      premium: true,
      status: "available",
      topics: ["Two Pointers", "Sliding Window", "Dynamic Programming", "Greedy"]
    },
    {
      id: 3,
      title: "Google Mock Interview",
      description: "Simulate a real Google technical interview with system design and coding questions.",
      category: "mock",
      difficulty: "hard",
      duration: "45 minutes",
      questions: 2,
      attempts: 2341,
      averageScore: "72%",
      premium: true,
      status: "available",
      topics: ["System Design", "Coding", "Behavioral"]
    },
    {
      id: 4,
      title: "JavaScript Fundamentals",
      description: "Comprehensive test covering JavaScript basics, ES6+ features, and common patterns.",
      category: "assessment",
      difficulty: "easy",
      duration: "45 minutes",
      questions: 25,
      attempts: 3456,
      averageScore: "82%",
      premium: false,
      status: "completed",
      topics: ["Variables", "Functions", "Objects", "ES6+"],
      userScore: "85%"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'destructive'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2
      case 'available': return Play
      case 'locked': return Lock
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'available': return 'default'
      case 'locked': return 'secondary'
      default: return 'warning'
    }
  }

  return (
    <Layout user={user} activeTab="tests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tests & Assessments</h1>
            <p className="text-gray-600">Validate your skills with comprehensive tests and mock interviews</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">
                {user.currentStreak} day streak
              </span>
            </div>
            <Badge variant="premium" className="px-3 py-1">
              <Award className="w-4 h-4 mr-1" />
              Premium
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tests Completed</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">82%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Spent</p>
                  <p className="text-2xl font-bold text-gray-900">12h</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Timer className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tests.map((test, index) => {
            const StatusIcon = getStatusIcon(test.status)
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {test.title}
                          </h3>
                          {test.premium && (
                            <Badge variant="premium" className="text-xs">
                              <Lock className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                          <Badge variant={getStatusColor(test.status)} className="text-xs">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {test.status}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {test.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {test.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {test.topics.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{test.topics.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{test.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>{test.questions} questions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{test.attempts.toLocaleString()} attempts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4" />
                            <span>{test.averageScore} avg score</span>
                          </div>
                        </div>

                        {test.status === 'completed' && test.userScore && (
                          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-800">Your Score</span>
                              <span className="text-lg font-bold text-green-900">{test.userScore}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                        <span className="text-sm text-gray-600 capitalize">
                          {test.category.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {test.status === 'completed' ? (
                          <>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retake
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Results
                            </Button>
                          </>
                        ) : test.status === 'available' ? (
                          <Button variant="gradient" size="sm" className="group-hover:scale-105 transition-transform">
                            <Play className="w-4 h-4 mr-2" />
                            Start Test
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default TestsPage