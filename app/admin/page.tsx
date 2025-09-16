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
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Activity,
  DollarSign,
  BookOpen,
  Settings,
  UserPlus,
  FileText,
  Database,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Layout from '@/components/layout'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedProblem, setSelectedProblem] = useState(null)

  const user = {
    name: "Admin User",
    level: 99,
    rank: "Admin",
    avatar: "/api/placeholder/80/80",
    currentStreak: 365,
    xp: 99999,
    xpToNext: 0
  }

  const stats = [
    { title: 'Total Users', value: '12,547', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Problems Created', value: '1,247', change: '+8%', icon: Code, color: 'green' },
    { title: 'Submissions Today', value: '3,456', change: '+23%', icon: Activity, color: 'purple' },
    { title: 'Revenue', value: '$45,678', change: '+15%', icon: DollarSign, color: 'yellow' }
  ]

  const recentProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      submissions: 15432,
      acceptance: "47.2%",
      created: "2 days ago",
      status: "published"
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "medium",
      submissions: 9876,
      acceptance: "33.8%",
      created: "1 week ago",
      status: "published"
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      submissions: 5432,
      acceptance: "28.4%",
      created: "2 weeks ago",
      status: "draft"
    },
    {
      id: 4,
      title: "Climbing Stairs",
      difficulty: "easy",
      submissions: 8765,
      acceptance: "52.1%",
      created: "3 weeks ago",
      status: "published"
    }
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@example.com",
      level: 15,
      problemsSolved: 89,
      joined: "2 days ago",
      status: "active"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      email: "alex@example.com",
      level: 12,
      problemsSolved: 67,
      joined: "1 week ago",
      status: "active"
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@example.com",
      level: 18,
      problemsSolved: 124,
      joined: "2 weeks ago",
      status: "premium"
    }
  ]

  const submissions = [
    {
      id: 1,
      user: "Sarah Chen",
      problem: "Two Sum",
      language: "Python",
      status: "accepted",
      time: "45ms",
      memory: "2.1MB",
      submitted: "5 minutes ago"
    },
    {
      id: 2,
      user: "Alex Rodriguez",
      problem: "Longest Substring",
      language: "JavaScript",
      status: "wrong_answer",
      time: "52ms",
      memory: "2.3MB",
      submitted: "12 minutes ago"
    },
    {
      id: 3,
      user: "Priya Sharma",
      problem: "Climbing Stairs",
      language: "Java",
      status: "accepted",
      time: "38ms",
      memory: "2.0MB",
      submitted: "18 minutes ago"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'success'
      case 'wrong_answer': return 'destructive'
      case 'time_limit': return 'warning'
      case 'runtime_error': return 'destructive'
      default: return 'default'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <Layout user={user} activeTab="admin" showSidebar={false}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your coding platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="premium" className="px-3 py-1">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Problem
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'problems', name: 'Problems', icon: Code },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'submissions', name: 'Submissions', icon: Activity },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map(({ id, name, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Recent Problems
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProblems.map((problem) => (
                    <div key={problem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{problem.title}</h4>
                          <Badge variant={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant={problem.status === 'published' ? 'success' : 'warning'}>
                            {problem.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{problem.submissions.toLocaleString()} submissions</span>
                          <span>{problem.acceptance} acceptance</span>
                          <span>{problem.created}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Recent Users
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={user.status === 'premium' ? 'premium' : 'default'}>
                            {user.status}
                          </Badge>
                          <span className="text-sm text-gray-600">Level {user.level}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.problemsSolved} problems • {user.joined}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Problems Tab */}
        {activeTab === 'problems' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Problem Management
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="gradient" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Problem
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Problem</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Difficulty</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Submissions</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Acceptance</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProblems.map((problem) => (
                      <tr key={problem.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{problem.title}</div>
                            <div className="text-sm text-gray-600">Created {problem.created}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {problem.submissions.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {problem.acceptance}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={problem.status === 'published' ? 'success' : 'warning'}>
                            {problem.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Submissions
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Database className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {submission.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{submission.user}</h4>
                        <p className="text-sm text-gray-600">{submission.problem}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{submission.language}</div>
                        <div className="text-xs text-gray-600">Language</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{submission.time}</div>
                        <div className="text-xs text-gray-600">Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{submission.memory}</div>
                        <div className="text-xs text-gray-600">Memory</div>
                      </div>
                      <Badge variant={getStatusColor(submission.status)}>
                        {submission.status.replace('_', ' ')}
                      </Badge>
                      <div className="text-sm text-gray-600">
                        {submission.submitted}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - User growth over time</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Problem Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Problem difficulty distribution</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Enable Registration</h4>
                    <p className="text-sm text-gray-600">Allow new users to register</p>
                  </div>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Premium Features</h4>
                    <p className="text-sm text-gray-600">Enable premium problem access</p>
                  </div>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">AI Feedback</h4>
                    <p className="text-sm text-gray-600">Enable AI-powered code review</p>
                  </div>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Require 2FA for admin access</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">API Rate Limiting</h4>
                    <p className="text-sm text-gray-600">Limit API requests per user</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Audit Logging</h4>
                    <p className="text-sm text-gray-600">Log all admin actions</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminDashboard