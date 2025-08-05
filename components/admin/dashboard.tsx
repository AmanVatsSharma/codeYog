import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, BarChart3, Settings, Plus, Edit3, Trash2,
  Eye, Search, Filter, Download, Upload, AlertTriangle,
  TrendingUp, Clock, CheckCircle2, XCircle, Brain, Target,
  Globe, Code, Zap, Award, MessageSquare, Bell, Calendar,
  PieChart, Activity, Database, Shield, Cpu, Mail
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 15420,
    activeUsers: 8934,
    totalProblems: 567,
    totalSubmissions: 89234,
    averageRating: 4.7,
    weeklyGrowth: 12.5,
    topLanguages: [
      { name: 'Python', usage: 34.2, color: 'blue' },
      { name: 'JavaScript', usage: 28.7, color: 'yellow' },
      { name: 'Java', usage: 18.9, color: 'red' },
      { name: 'C++', usage: 12.1, color: 'green' },
      { name: 'Go', usage: 6.1, color: 'cyan' }
    ]
  });

  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      tags: ["Hash Table", "Array"],
      submissions: 15420,
      successRate: 89.2,
      averageTime: 12.5,
      status: "Published",
      createdAt: "2024-01-15",
      lastModified: "2024-02-01"
    },
    {
      id: 2,
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      category: "Trees",
      tags: ["Tree", "DFS", "Stack"],
      submissions: 8934,
      successRate: 72.8,
      averageTime: 18.3,
      status: "Published",
      createdAt: "2024-01-10",
      lastModified: "2024-01-28"
    },
    {
      id: 3,
      title: "Word Ladder II",
      difficulty: "Hard",
      category: "Graph",
      tags: ["BFS", "Hash Table", "String", "Backtracking"],
      submissions: 2145,
      successRate: 34.1,
      averageTime: 45.7,
      status: "Draft",
      createdAt: "2024-02-05",
      lastModified: "2024-02-10"
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Kumar",
      email: "alex@example.com",
      level: 12,
      xp: 2850,
      problemsSolved: 89,
      joinDate: "2023-11-15",
      lastActive: "2024-02-12",
      status: "Active",
      subscription: "Pro"
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@example.com",
      level: 8,
      xp: 1640,
      problemsSolved: 56,
      joinDate: "2024-01-03",
      lastActive: "2024-02-11",
      status: "Active",
      subscription: "Free"
    }
  ]);

  const [aiInsights, setAiInsights] = useState({
    problemRecommendations: [
      {
        title: "Create more Dynamic Programming problems",
        reason: "67% of users struggle with DP concepts",
        priority: "High",
        impact: "Improve learning outcomes for 4,500+ users"
      },
      {
        title: "Add visualization for Graph problems",
        reason: "Visual learners show 45% better performance",
        priority: "Medium",
        impact: "Enhance understanding for visual learners"
      }
    ],
    contentGaps: [
      { concept: "Advanced Trees", currentProblems: 12, recommended: 25 },
      { concept: "System Design", currentProblems: 3, recommended: 15 },
      { concept: "Concurrency", currentProblems: 5, recommended: 18 }
    ],
    userInsights: {
      retentionRate: 78.4,
      averageSessionTime: 34.2,
      mostDifficultConcepts: ["Dynamic Programming", "Graph Algorithms", "Recursion"],
      peakUsageHours: "7-9 PM EST"
    }
  });

  const StatCard = ({ icon: Icon, title, value, subtitle, change, color = "blue" }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <div className={`flex items-center mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}% from last week
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ProblemCard = ({ problem }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{problem.title}</h3>
          <p className="text-sm text-gray-600 mt-1">ID: {problem.id} • {problem.category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {problem.difficulty}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            problem.status === 'Published' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {problem.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{problem.submissions.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Submissions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{problem.successRate}%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{problem.averageTime}m</div>
          <div className="text-xs text-gray-600">Avg Time</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {problem.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Modified: {problem.lastModified}</span>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const UserRow = ({ user }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">Level {user.level}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{user.xp.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{user.problemsSolved}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{user.joinDate}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{user.lastActive}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.subscription === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {user.subscription}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">CodeYog Platform Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-600">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'problems', name: 'Problems', icon: BookOpen },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp },
              { id: 'ai-insights', name: 'AI Insights', icon: Brain },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-red-500 text-red-600'
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
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                title="Total Users" 
                value={platformStats.totalUsers.toLocaleString()} 
                subtitle={`${platformStats.activeUsers.toLocaleString()} active`}
                change={12.5}
                color="blue"
              />
              <StatCard 
                icon={BookOpen} 
                title="Problems" 
                value={platformStats.totalProblems} 
                subtitle="Across all categories"
                change={8.3}
                color="green"
              />
              <StatCard 
                icon={Code} 
                title="Submissions" 
                value={platformStats.totalSubmissions.toLocaleString()} 
                subtitle="This month"
                change={15.7}
                color="purple"
              />
              <StatCard 
                icon={Award} 
                title="Platform Rating" 
                value={platformStats.averageRating} 
                subtitle="User satisfaction"
                change={2.1}
                color="yellow"
              />
            </div>

            {/* Charts and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Language Usage */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Language Usage</h3>
                <div className="space-y-3">
                  {platformStats.topLanguages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-${lang.color}-500 rounded-full`}></div>
                        <span className="text-gray-900 font-medium">{lang.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${lang.color}-500 h-2 rounded-full`}
                            style={{ width: `${lang.usage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{lang.usage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">New problem "Maximum Subarray" added</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">147 new user registrations today</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">AI analysis completed for 2,340 submissions</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">System maintenance completed</p>
                      <p className="text-xs text-gray-500">8 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Add Problem</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                  <Upload className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">Bulk Import</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-600 font-medium">AI Analysis</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  <Download className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-600 font-medium">Export Data</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Problems Tab */}
        {activeTab === 'problems' && (
          <div className="space-y-6">
            {/* Problem Management Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Problem Management</h2>
                <p className="text-gray-600">Manage coding problems and test cases</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Problem</span>
                </button>
              </div>
            </div>

            {/* Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <p className="text-gray-600">Manage user accounts and permissions</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problems</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">AI Platform Insights</h2>
                  <p className="text-gray-600">Data-driven recommendations for platform improvement</p>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Content Recommendations</h3>
              <div className="space-y-4">
                {aiInsights.problemRecommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{rec.reason}</p>
                    <p className="text-blue-600 text-sm font-medium">{rec.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Gaps */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3