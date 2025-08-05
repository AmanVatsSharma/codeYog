'use client';
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Target, Clock, Code, Brain, TrendingUp, 
  Award, Calendar, Zap, BookOpen, ChevronRight,
  Star, Medal, Flame, Users, BarChart3, Play
} from 'lucide-react';

const CodeYogDashboard = () => {
  const [user, setUser] = useState({
    name: "Alex Kumar",
    level: 12,
    xp: 2450,
    xpToNext: 550,
    currentStreak: 7,
    longestStreak: 23,
    totalProblems: 156,
    solvedProblems: 89,
    rank: "Gold",
    avatar: "/api/placeholder/80/80"
  });

  const [progress, setProgress] = useState({
    languageProgress: [
      { language: 'Python', solved: 34, total: 50, level: 'Intermediate', xp: 680 },
      { language: 'JavaScript', solved: 28, total: 45, level: 'Intermediate', xp: 560 },
      { language: 'Java', solved: 15, total: 30, level: 'Beginner', xp: 300 },
      { language: 'C++', solved: 12, total: 31, level: 'Beginner', xp: 240 }
    ],
    conceptMastery: [
      { concept: 'Arrays & Strings', mastery: 85, problems: 25, needsReview: false },
      { concept: 'Dynamic Programming', mastery: 65, problems: 15, needsReview: true },
      { concept: 'Graph Algorithms', mastery: 40, problems: 8, needsReview: false },
      { concept: 'Binary Trees', mastery: 70, problems: 18, needsReview: false },
      { concept: 'Sorting & Searching', mastery: 90, problems: 23, needsReview: false }
    ],
    recentAchievements: [
      { title: 'Week Warrior', icon: 'Flame', description: '7-day coding streak!', date: 'Today' },
      { title: 'Python Pro', icon: 'code', description: 'Solved 30+ Python problems', date: '2 days ago' },
      { title: 'Speed Demon', icon: 'zap', description: 'Solved problem in under 5 minutes', date: '3 days ago' }
    ]
  });

  const [aiInsights, setAiInsights] = useState({
    todaysRecommendation: {
      problem: "Two Sum Variations",
      reason: "Perfect for strengthening your hash table skills",
      difficulty: "Medium",
      estimatedTime: "25 min"
    },
    weeklyFocus: "Dynamic Programming",
    strengthAreas: ["Array Manipulation", "String Processing"],
    improvementAreas: ["Graph Traversal", "Recursion Optimization"],
    nextMilestone: "Solve 10 more DP problems to reach Advanced level"
  });

  const [activeTab, setActiveTab] = useState('overview');

  const MasteryBar = ({ concept, mastery, problems, needsReview }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{concept}</h4>
          <p className="text-sm text-gray-600">{problems} problems solved</p>
        </div>
        {needsReview && (
          <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
            Review
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full ${mastery >= 80 ? 'bg-green-500' : mastery >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${mastery}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{mastery}% mastered</span>
        <span className={`font-medium ${mastery >= 80 ? 'text-green-600' : mastery >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {mastery >= 80 ? 'Advanced' : mastery >= 60 ? 'Intermediate' : 'Beginner'}
        </span>
      </div>
    </div>
  );

  const LanguageCard = ({ language, solved, total, level, xp }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{language}</h3>
            <p className="text-sm text-gray-600">{level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{solved}</p>
          <p className="text-sm text-gray-600">/{total}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          style={{ width: `${(solved/total) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{xp} XP</span>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Practice →
        </button>
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CodeYog</h1>
                  <p className="text-sm text-gray-600">Your AI Coding Companion</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-gray-900">{user.currentStreak} days</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">Level {user.level} • {user.rank}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'practice', name: 'Practice', icon: Play },
              { id: 'progress', name: 'Progress', icon: TrendingUp },
              { id: 'ai-coach', name: 'AI Coach', icon: Brain }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Trophy} 
                title="Problems Solved" 
                value={user.solvedProblems} 
                subtitle={`of ${user.totalProblems} attempted`}
                color="yellow"
              />
              <StatCard 
                icon={Flame} 
                title="Current Streak" 
                value={`${user.currentStreak} days`} 
                subtitle={`Best: ${user.longestStreak} days`}
                color="orange"
              />
              <StatCard 
                icon={Star} 
                title="Experience Points" 
                value={user.xp} 
                subtitle={`${user.xpToNext} to next level`}
                color="purple"
              />
              <StatCard 
                icon={Medal} 
                title="Current Rank" 
                value={user.rank} 
                subtitle={`Level ${user.level}`}
                color="green"
              />
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All →
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Today's Challenge</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-blue-600">{aiInsights.todaysRecommendation.problem}</p>
                    <p className="text-sm text-gray-600">{aiInsights.todaysRecommendation.reason}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {aiInsights.todaysRecommendation.difficulty}
                      </span>
                      <span className="text-gray-500">~{aiInsights.todaysRecommendation.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Next Milestone</h3>
                  <p className="text-sm text-gray-600 mb-3">{aiInsights.nextMilestone}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600 font-medium">Focus: {aiInsights.weeklyFocus}</span>
                    <Target className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Language Progress */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Language Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {progress.languageProgress.map((lang) => (
                  <LanguageCard key={lang.language} {...lang} />
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {progress.recentAchievements.map((achievement, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Concept Mastery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {progress.conceptMastery.map((concept, index) => (
                  <MasteryBar key={index} {...concept} />
                ))}
              </div>
            </div>

            {/* Strength & Improvement Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Your Strengths</h3>
                </div>
                <div className="space-y-2">
                  {aiInsights.strengthAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-900">Areas to Improve</h3>
                </div>
                <div className="space-y-2">
                  {aiInsights.improvementAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-800">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Coach Tab */}
        {activeTab === 'ai-coach' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
              <div className="text-center">
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI Coding Coach</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get personalized feedback, learning paths, and instant help with your coding journey.
                </p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Start AI Session
                </button>
              </div>
            </div>

            {/* AI Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Learning Path</h3>
                <p className="text-gray-600 text-sm mb-4">
                  AI creates a custom curriculum based on your strengths and goals.
                </p>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View Path →
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Code Review</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get detailed feedback and suggestions for every submission.
                </p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Try Now →
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Peer Matching</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Connect with peers at similar skill levels for collaborative learning.
                </p>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Find Peers →
                </button>
              </div>
            </div>

            {/* Recent AI Insights */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Recent AI Insights</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-gray-900">Code Quality Improvement</p>
                  <p className="text-gray-600 text-sm">Your recent Python solutions show great algorithmic thinking! Consider focusing on code readability and adding comments.</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-900">Learning Progress</p>
                  <p className="text-gray-600 text-sm">You've mastered array manipulation! Ready to tackle more complex data structures like trees and graphs.</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-medium text-gray-900">Optimization Opportunity</p>
                  <p className="text-gray-600 text-sm">Your latest solution works correctly but could be optimized from O(n²) to O(n log n) using a different approach.</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Quick Start */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors text-left">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Play className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">Easy Problem</span>
                  </div>
                  <p className="text-sm text-gray-600">Perfect for warming up</p>
                </button>
                
                <button className="bg-white rounded-lg p-4 border border-gray-200 hover:border-yellow-300 transition-colors text-left">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="font-medium text-gray-900">Recommended</span>
                  </div>
                  <p className="text-sm text-gray-600">AI-picked for you</p>
                </button>
                
                <button className="bg-white rounded-lg p-4 border border-gray-200 hover:border-red-300 transition-colors text-left">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Flame className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="font-medium text-gray-900">Challenge</span>
                  </div>
                  <p className="text-sm text-gray-600">Test your limits</p>
                </button>
              </div>
            </div>

            {/* Problem Categories */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Practice by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Arrays & Strings', count: 45, difficulty: 'Mixed', color: 'blue' },
                  { name: 'Dynamic Programming', count: 32, difficulty: 'Hard', color: 'purple' },
                  { name: 'Graph Algorithms', count: 28, difficulty: 'Medium', color: 'green' },
                  { name: 'Binary Trees', count: 38, difficulty: 'Medium', color: 'yellow' },
                  { name: 'Sorting & Searching', count: 25, difficulty: 'Easy', color: 'indigo' },
                  { name: 'Math & Logic', count: 22, difficulty: 'Mixed', color: 'pink' }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{category.count} problems</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        category.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        category.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {category.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeYogDashboard;