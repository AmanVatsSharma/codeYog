"use client";
import React, { useState } from 'react';
import { Trophy, Target, Clock, Code, Brain, TrendingUp, Award, ChevronRight, Star, Medal, Flame, Users, BarChart3, Play, BookOpen, Zap } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const colorVariants = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
} as const;

const CodeYogDashboard = () => {
  const [user] = useState({
    name: 'Alex Kumar',
    level: 12,
    xp: 2450,
    xpToNext: 550,
    currentStreak: 7,
    longestStreak: 23,
    totalProblems: 156,
    solvedProblems: 89,
    rank: 'Gold',
    avatar: '/api/placeholder/80/80',
  });

  const [progress] = useState({
    languageProgress: [
      { language: 'Python', solved: 34, total: 50, level: 'Intermediate', xp: 680 },
      { language: 'JavaScript', solved: 28, total: 45, level: 'Intermediate', xp: 560 },
      { language: 'Java', solved: 15, total: 30, level: 'Beginner', xp: 300 },
      { language: 'C++', solved: 12, total: 31, level: 'Beginner', xp: 240 },
    ],
    conceptMastery: [
      { concept: 'Arrays & Strings', mastery: 85, problems: 25, needsReview: false },
      { concept: 'Dynamic Programming', mastery: 65, problems: 15, needsReview: true },
      { concept: 'Graph Algorithms', mastery: 40, problems: 8, needsReview: false },
      { concept: 'Binary Trees', mastery: 70, problems: 18, needsReview: false },
      { concept: 'Sorting & Searching', mastery: 90, problems: 23, needsReview: false },
    ],
    recentAchievements: [
      { title: 'Week Warrior', description: '7-day coding streak!', date: 'Today' },
      { title: 'Python Pro', description: 'Solved 30+ Python problems', date: '2 days ago' },
      { title: 'Speed Demon', description: 'Solved problem in under 5 minutes', date: '3 days ago' },
    ],
  });

  const [aiInsights] = useState({
    todaysRecommendation: {
      problem: 'Two Sum Variations',
      reason: 'Perfect for strengthening your hash table skills',
      difficulty: 'Medium',
      estimatedTime: '25 min',
    },
    weeklyFocus: 'Dynamic Programming',
    strengthAreas: ['Array Manipulation', 'String Processing'],
    improvementAreas: ['Graph Traversal', 'Recursion Optimization'],
    nextMilestone: 'Solve 10 more DP problems to reach Advanced level',
  });

  const [activeTab, setActiveTab] = useState('overview');

  const MasteryBar = ({ concept, mastery, problems, needsReview }: any) => (
    <Card>
      <CardHeader className="mb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{concept}</CardTitle>
            <CardDescription>{problems} problems solved</CardDescription>
          </div>
          {needsReview && (
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">Review</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={mastery} />
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600">{mastery}% mastered</span>
          <span className={
            mastery >= 80 ? 'text-green-600 font-medium' : mastery >= 60 ? 'text-yellow-600 font-medium' : 'text-red-600 font-medium'
          }>
            {mastery >= 80 ? 'Advanced' : mastery >= 60 ? 'Intermediate' : 'Beginner'}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const LanguageCard = ({ language, solved, total, level, xp }: any) => (
    <Card className="hover:border-blue-300 transition-colors">
      <CardContent>
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
        <Progress value={(solved / total) * 100} />
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-600">{xp} XP</span>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Practice →</button>
        </div>
      </CardContent>
    </Card>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }: any) => (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className={`w-12 h-12 ${colorVariants[color as keyof typeof colorVariants].bg} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colorVariants[color as keyof typeof colorVariants].text}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <Tabs
          tabs={[
            { id: 'overview', label: (<span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Overview</span>) },
            { id: 'practice', label: (<span className="flex items-center gap-2"><Play className="w-4 h-4" /> Practice</span>) },
            { id: 'progress', label: (<span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Progress</span>) },
            { id: 'ai-coach', label: (<span className="flex items-center gap-2"><Brain className="w-4 h-4" /> AI Coach</span>) },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={Trophy} title="Problems Solved" value={user.solvedProblems} subtitle={`of ${user.totalProblems} attempted`} color="yellow" />
              <StatCard icon={Flame} title="Current Streak" value={`${user.currentStreak} days`} subtitle={`Best: ${user.longestStreak} days`} color="orange" />
              <StatCard icon={Star} title="Experience Points" value={user.xp} subtitle={`${user.xpToNext} to next level`} color="purple" />
              <StatCard icon={Medal} title="Current Rank" value={user.rank} subtitle={`Level ${user.level}`} color="green" />
            </div>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <CardTitle>AI Recommendations</CardTitle>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All →</button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-base">Today's Challenge</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-semibold text-blue-600">{aiInsights.todaysRecommendation.problem}</p>
                      <p className="text-sm text-gray-600">{aiInsights.todaysRecommendation.reason}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">{aiInsights.todaysRecommendation.difficulty}</span>
                        <span className="text-gray-500">~{aiInsights.todaysRecommendation.estimatedTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-base">Next Milestone</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{aiInsights.nextMilestone}</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-600 font-medium">Focus: {aiInsights.weeklyFocus}</span>
                        <Target className="w-4 h-4 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Language Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {progress.languageProgress.map((lang: any) => (
                  <LanguageCard key={lang.language} {...lang} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {progress.recentAchievements.map((achievement: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Concept Mastery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {progress.conceptMastery.map((concept: any, index: number) => (
                  <MasteryBar key={index} {...concept} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <CardTitle>Your Strengths</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {aiInsights.strengthAreas.map((area: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800">{area}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <CardTitle>Areas to Improve</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {aiInsights.improvementAreas.map((area: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-800">{area}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'ai-coach' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <CardContent>
                <div className="text-center">
                  <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI Coding Coach</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Get personalized feedback, learning paths, and instant help with your coding journey.</p>
                  <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Start AI Session</button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:border-purple-300">
                <CardContent>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personalized Learning Path</h3>
                  <p className="text-gray-600 text-sm mb-4">AI creates a custom curriculum based on your strengths and goals.</p>
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">View Path →</button>
                </CardContent>
              </Card>

              <Card className="hover:border-blue-300">
                <CardContent>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Code Review</h3>
                  <p className="text-gray-600 text-sm mb-4">Get detailed feedback and suggestions for every submission.</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Try Now →</button>
                </CardContent>
              </Card>

              <Card className="hover:border-green-300">
                <CardContent>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Peer Matching</h3>
                  <p className="text-gray-600 text-sm mb-4">Connect with peers at similar skill levels for collaborative learning.</p>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">Find Peers →</button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Quick Start</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Practice by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Arrays & Strings', count: 45, difficulty: 'Mixed' },
                  { name: 'Dynamic Programming', count: 32, difficulty: 'Hard' },
                  { name: 'Graph Algorithms', count: 28, difficulty: 'Medium' },
                  { name: 'Binary Trees', count: 38, difficulty: 'Medium' },
                  { name: 'Sorting & Searching', count: 25, difficulty: 'Easy' },
                  { name: 'Math & Logic', count: 22, difficulty: 'Mixed' },
                ].map((category, index) => (
                  <Card key={index} className="cursor-pointer hover:border-gray-300 transition-colors">
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{category.count} problems</span>
                        <span className={
                          category.difficulty === 'Easy' ? 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' :
                          category.difficulty === 'Medium' ? 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' :
                          category.difficulty === 'Hard' ? 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700' :
                          'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
                        }>
                          {category.difficulty}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default CodeYogDashboard;