"use client";
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, BookOpen, Code, Users, Play, Clock, Star, CheckCircle2,
  Target, TrendingUp, Award, Brain, ChevronRight, Search, Filter,
  Zap, FileText, PlayCircle, Lock, Download
} from 'lucide-react';
import { cn } from '@/components/lib/utils';

const LearnPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'beginner', label: 'Beginner', icon: Target },
    { id: 'intermediate', label: 'Intermediate', icon: TrendingUp },
    { id: 'advanced', label: 'Advanced', icon: Zap },
    { id: 'algorithms', label: 'Algorithms', icon: Brain },
    { id: 'data-structures', label: 'Data Structures', icon: Code },
  ];

  const courses = [
    {
      id: 1,
      title: 'Master Data Structures & Algorithms',
      description: 'Comprehensive guide to DSA with 200+ problems and video explanations',
      instructor: 'Dr. Sarah Chen',
      instructorAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/400/225',
      category: 'algorithms',
      level: 'intermediate',
      rating: 4.9,
      reviews: 8234,
      students: 45621,
      duration: '42 hours',
      lessons: 156,
      price: 'Free',
      tags: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
      progress: 35,
      isEnrolled: true,
      lastUpdated: '2024-02-01',
    },
    {
      id: 2,
      title: 'Python for Competitive Programming',
      description: 'Learn Python idioms and tricks for competitive coding',
      instructor: 'Alex Kumar',
      instructorAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/400/225',
      category: 'beginner',
      level: 'beginner',
      rating: 4.8,
      reviews: 5432,
      students: 32154,
      duration: '24 hours',
      lessons: 85,
      price: '$49.99',
      tags: ['Python', 'Basics', 'Competitive'],
      progress: 0,
      isEnrolled: false,
      lastUpdated: '2024-01-28',
    },
    {
      id: 3,
      title: 'System Design Masterclass',
      description: 'Design scalable distributed systems like a pro',
      instructor: 'Michael Johnson',
      instructorAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/400/225',
      category: 'advanced',
      level: 'advanced',
      rating: 5.0,
      reviews: 3421,
      students: 18976,
      duration: '36 hours',
      lessons: 120,
      price: '$79.99',
      tags: ['System Design', 'Scalability', 'Architecture'],
      progress: 0,
      isEnrolled: false,
      lastUpdated: '2024-02-05',
    },
    {
      id: 4,
      title: 'Graph Algorithms Deep Dive',
      description: 'Master graph theory and algorithms from basics to advanced',
      instructor: 'Dr. Emily Wong',
      instructorAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/400/225',
      category: 'algorithms',
      level: 'intermediate',
      rating: 4.9,
      reviews: 4521,
      students: 28340,
      duration: '28 hours',
      lessons: 96,
      price: 'Free',
      tags: ['Graphs', 'DFS', 'BFS', 'Shortest Path'],
      progress: 60,
      isEnrolled: true,
      lastUpdated: '2024-01-25',
    },
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Binary Search - Complete Guide',
      description: 'Everything you need to know about binary search',
      type: 'video',
      duration: '45 min',
      difficulty: 'Easy',
      views: 12543,
      likes: 1234,
    },
    {
      id: 2,
      title: 'Dynamic Programming Patterns',
      description: 'Common DP patterns explained with examples',
      type: 'article',
      duration: '20 min read',
      difficulty: 'Hard',
      views: 8765,
      likes: 987,
    },
    {
      id: 3,
      title: 'Tree Traversal Techniques',
      description: 'Master all tree traversal methods',
      type: 'video',
      duration: '35 min',
      difficulty: 'Medium',
      views: 9876,
      likes: 876,
    },
  ];

  const stats = [
    { label: 'Courses', value: '50+', icon: BookOpen, color: 'blue' },
    { label: 'Video Hours', value: '500+', icon: Video, color: 'purple' },
    { label: 'Students', value: '100K+', icon: Users, color: 'green' },
    { label: 'Completion Rate', value: '87%', icon: Award, color: 'yellow' },
  ];

  const filtered = activeCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === activeCategory || c.level === activeCategory);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="surface elevate rounded-2xl p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Learn & Master Coding</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                World-class courses and tutorials from industry experts
              </p>
              <div className="flex items-center space-x-3">
                <Button leftIcon={<PlayCircle className="w-4 h-4" />}>
                  Start Learning
                </Button>
                <Button variant="outline" leftIcon={<Target className="w-4 h-4" />}>
                  My Learning Path
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-64 h-48 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Video className="w-24 h-24 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg grid place-items-center',
                    stat.color === 'blue' ? 'bg-blue-500/10' :
                    stat.color === 'purple' ? 'bg-purple-500/10' :
                    stat.color === 'green' ? 'bg-green-500/10' :
                    'bg-yellow-500/10'
                  )}>
                    <stat.icon className={cn(
                      'w-5 h-5',
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      'text-yellow-600'
                    )} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap',
                activeCategory === id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'surface text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((course) => (
              <Card key={course.id} className="hover:border-blue-300 transition-all overflow-hidden">
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-75" />
                  </div>
                  {course.isEnrolled && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="default" className="bg-white text-blue-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Enrolled
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    {course.progress > 0 && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {course.instructor.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{course.instructor}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{course.rating}</span>
                      <span>({course.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-blue-600">{course.price}</div>
                    <Button
                      variant={course.isEnrolled ? 'outline' : 'primary'}
                      size="sm"
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      {course.isEnrolled ? 'Continue' : 'Enroll Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tutorials */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Tutorials</CardTitle>
            <CardDescription>Short, focused lessons on key concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="surface rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 border transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 grid place-items-center flex-shrink-0">
                      {tutorial.type === 'video' ? (
                        <Video className="w-5 h-5 text-blue-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{tutorial.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{tutorial.duration}</span>
                        <Badge variant="outline" className="text-xs">
                          {tutorial.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="ghost" rightIcon={<ChevronRight className="w-4 h-4" />}>
                View All Tutorials
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Path CTA */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Your Personalized Learning Path</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  AI-powered curriculum tailored to your skill level and goals
                </p>
                <Button leftIcon={<Brain className="w-4 h-4" />}>
                  Create My Path
                </Button>
              </div>
              <div className="hidden lg:block">
                <Target className="w-32 h-32 text-purple-600 opacity-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default LearnPage;
