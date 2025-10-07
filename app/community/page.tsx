"use client";
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, ThumbsUp, Eye, User, Clock, CheckCircle2, 
  TrendingUp, Star, Award, Users, Search, Filter, Plus,
  Bookmark, Share2, Flag, MoreHorizontal, Code, Heart
} from 'lucide-react';
import { cn } from '@/components/lib/utils';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'questions' | 'articles' | 'following'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const discussions = [
    {
      id: 1,
      type: 'question',
      title: 'How to optimize this Dynamic Programming solution?',
      content: 'I\'m working on the Longest Common Subsequence problem and my solution is timing out on large inputs...',
      author: {
        name: 'Alex Kumar',
        avatar: '/api/placeholder/40/40',
        reputation: 2850,
        badges: ['Gold', 'Helper'],
      },
      tags: ['Dynamic Programming', 'Optimization', 'Time Complexity'],
      stats: {
        views: 1234,
        likes: 45,
        comments: 12,
        bookmarks: 8,
      },
      isAnswered: true,
      timeAgo: '2 hours ago',
      difficulty: 'Hard',
    },
    {
      id: 2,
      type: 'article',
      title: 'Complete Guide to Binary Search Trees',
      content: 'In this comprehensive guide, I\'ll walk you through everything you need to know about BSTs...',
      author: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/40/40',
        reputation: 5420,
        badges: ['Platinum', 'Author', 'Mentor'],
      },
      tags: ['Trees', 'Data Structures', 'Tutorial'],
      stats: {
        views: 5678,
        likes: 234,
        comments: 45,
        bookmarks: 156,
      },
      isAnswered: false,
      timeAgo: '5 hours ago',
      difficulty: 'Medium',
    },
    {
      id: 3,
      type: 'question',
      title: 'Best approach for solving Graph problems?',
      content: 'What are the common patterns I should know for graph algorithm problems?',
      author: {
        name: 'Mike Johnson',
        avatar: '/api/placeholder/40/40',
        reputation: 1240,
        badges: ['Silver'],
      },
      tags: ['Graphs', 'Algorithms', 'Patterns'],
      stats: {
        views: 892,
        likes: 34,
        comments: 18,
        bookmarks: 12,
      },
      isAnswered: true,
      timeAgo: '1 day ago',
      difficulty: 'Medium',
    },
    {
      id: 4,
      type: 'discussion',
      title: 'Weekly Contest 385 - Problem Discussion',
      content: 'Let\'s discuss the problems from this week\'s contest and share our solutions...',
      author: {
        name: 'Emma Wilson',
        avatar: '/api/placeholder/40/40',
        reputation: 3650,
        badges: ['Gold', 'Contest Winner'],
      },
      tags: ['Contest', 'Solutions', 'Discussion'],
      stats: {
        views: 2345,
        likes: 89,
        comments: 67,
        bookmarks: 34,
      },
      isAnswered: false,
      timeAgo: '3 hours ago',
      difficulty: 'All Levels',
    },
  ];

  const topContributors = [
    {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      reputation: 5420,
      contributions: 234,
      badge: 'Platinum',
    },
    {
      name: 'Alex Kumar',
      avatar: '/api/placeholder/40/40',
      reputation: 4850,
      contributions: 198,
      badge: 'Gold',
    },
    {
      name: 'Emma Wilson',
      avatar: '/api/placeholder/40/40',
      reputation: 3650,
      contributions: 156,
      badge: 'Gold',
    },
    {
      name: 'Mike Johnson',
      avatar: '/api/placeholder/40/40',
      reputation: 2890,
      contributions: 142,
      badge: 'Silver',
    },
  ];

  const trendingTags = [
    { name: 'Dynamic Programming', count: 234 },
    { name: 'Graphs', count: 189 },
    { name: 'Arrays', count: 345 },
    { name: 'Binary Search', count: 156 },
    { name: 'Recursion', count: 132 },
    { name: 'Greedy', count: 98 },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question':
        return MessageSquare;
      case 'article':
        return Code;
      case 'discussion':
        return Users;
      default:
        return MessageSquare;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'question':
        return { label: 'Question', variant: 'default' as const };
      case 'article':
        return { label: 'Article', variant: 'success' as const };
      case 'discussion':
        return { label: 'Discussion', variant: 'outline' as const };
      default:
        return { label: type, variant: 'default' as const };
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="surface elevate rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Learn together, grow together
              </p>
            </div>
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              Create Post
            </Button>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 grid place-items-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12.5K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Discussions</div>
                </div>
              </div>
            </div>
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 grid place-items-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">45.2K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
                </div>
              </div>
            </div>
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 grid place-items-center">
                  <ThumbsUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">234K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Helpful Answers</div>
                </div>
              </div>
            </div>
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 grid place-items-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Response Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tabs and Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'questions', label: 'Questions' },
                  { id: 'articles', label: 'Articles' },
                  { id: 'following', label: 'Following' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium transition-all',
                      activeTab === id
                        ? 'bg-blue-600 text-white'
                        : 'surface text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="surface border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((discussion) => {
                const TypeIcon = getTypeIcon(discussion.type);
                const typeBadge = getTypeBadge(discussion.type);

                return (
                  <Card key={discussion.id} className="hover:border-blue-300 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {discussion.author.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                            {discussion.isAnswered && (
                              <Badge variant="default" className="bg-green-600">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Answered
                              </Badge>
                            )}
                            <Badge variant="outline">{discussion.difficulty}</Badge>
                          </div>

                          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                            {discussion.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {discussion.content}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag, index) => (
                              <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{discussion.stats.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{discussion.stats.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{discussion.stats.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Bookmark className="w-4 h-4" />
                                <span>{discussion.stats.bookmarks}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">by</span>
                            <span className="text-sm font-medium">{discussion.author.name}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{discussion.author.reputation}</span>
                            </div>
                            {discussion.author.badges.map((badge, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {contributor.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{contributor.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {contributor.contributions} contributions
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {contributor.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span>Trending Tags</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag, index) => (
                    <button
                      key={index}
                      className="surface hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      <div className="font-medium">{tag.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{tag.count} posts</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-sm">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Be respectful and constructive</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share knowledge and help others</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Provide code examples when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Avoid spam and self-promotion</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default CommunityPage;
