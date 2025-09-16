'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Layout from '@/components/layout'

const ProblemsPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const user = {
    name: "Alex Kumar",
    level: 12,
    rank: "Gold",
    avatar: "/api/placeholder/80/80",
    currentStreak: 7,
    xp: 2450,
    xpToNext: 550
  }

  const categories = [
    { id: 'all', name: 'All Problems', count: 1247, icon: Code },
    { id: 'arrays', name: 'Arrays & Strings', count: 245, icon: Target },
    { id: 'dp', name: 'Dynamic Programming', count: 189, icon: Brain },
    { id: 'graphs', name: 'Graph Algorithms', count: 156, icon: TrendingUp },
    { id: 'trees', name: 'Binary Trees', count: 134, icon: Target },
    { id: 'sorting', name: 'Sorting & Searching', count: 98, icon: Zap },
    { id: 'math', name: 'Math & Logic', count: 87, icon: Brain },
    { id: 'greedy', name: 'Greedy Algorithms', count: 76, icon: Trophy }
  ]

  const difficulties = [
    { id: 'all', name: 'All', color: 'gray' },
    { id: 'easy', name: 'Easy', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'hard', name: 'Hard', color: 'red' }
  ]

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      category: "arrays",
      acceptance: "47.2%",
      likes: 12543,
      dislikes: 2341,
      premium: false,
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      tags: ["Array", "Hash Table"],
      companies: ["Google", "Amazon", "Microsoft"],
      solved: false
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "medium",
      category: "arrays",
      acceptance: "33.8%",
      likes: 9876,
      dislikes: 1234,
      premium: false,
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      tags: ["Hash Table", "String", "Sliding Window"],
      companies: ["Facebook", "Amazon", "Google"],
      solved: true
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      category: "arrays",
      acceptance: "28.4%",
      likes: 5432,
      dislikes: 987,
      premium: true,
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      companies: ["Google", "Amazon", "Microsoft"],
      solved: false
    },
    {
      id: 4,
      title: "Climbing Stairs",
      difficulty: "easy",
      category: "dp",
      acceptance: "52.1%",
      likes: 8765,
      dislikes: 456,
      premium: false,
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
      tags: ["Math", "Dynamic Programming", "Memoization"],
      companies: ["Amazon", "Google"],
      solved: true
    },
    {
      id: 5,
      title: "Course Schedule",
      difficulty: "medium",
      category: "graphs",
      acceptance: "41.3%",
      likes: 6543,
      dislikes: 789,
      premium: false,
      description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.",
      tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
      companies: ["Facebook", "Amazon", "Google"],
      solved: false
    },
    {
      id: 6,
      title: "Maximum Subarray",
      difficulty: "medium",
      category: "dp",
      acceptance: "48.7%",
      likes: 7654,
      dislikes: 567,
      premium: false,
      description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum.",
      tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
      companies: ["Microsoft", "Amazon", "Google"],
      solved: false
    }
  ]

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDifficulty && matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'destructive'
      default: return 'default'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return CheckCircle
      case 'medium': return Clock
      case 'hard': return Flame
      default: return Target
    }
  }

  return (
    <Layout user={user} activeTab="practice">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Problems</h1>
            <p className="text-gray-600">Sharpen your coding skills with premium challenges</p>
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

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty.id}
                    variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`${
                      selectedDifficulty === difficulty.id 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {difficulty.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="w-4 h-4 mr-3" />
                    <span className="flex-1 text-left">{category.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Problems List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredProblems.map((problem, index) => {
                const DifficultyIcon = getDifficultyIcon(problem.difficulty)
                return (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {problem.title}
                              </h3>
                              {problem.premium && (
                                <Badge variant="premium" className="text-xs">
                                  <Lock className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                              {problem.solved && (
                                <Badge variant="success" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Solved
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {problem.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {problem.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <DifficultyIcon className="w-4 h-4" />
                                <span className="capitalize">{problem.difficulty}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>{problem.acceptance}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4" />
                                <span>{problem.likes}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2 ml-4">
                            <Button 
                              variant="gradient" 
                              size="sm"
                              className="group-hover:scale-105 transition-transform"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Solve
                            </Button>
                            <div className="text-xs text-gray-500 text-right">
                              <div>Companies:</div>
                              <div className="font-medium">{problem.companies.slice(0, 2).join(', ')}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {filteredProblems.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No problems found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search query</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProblemsPage