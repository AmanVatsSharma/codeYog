"use client";
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, Medal, Star, TrendingUp, Users, Zap, Target,
  Award, Crown, Flame, Code, Calendar, Filter
} from 'lucide-react';
import { cn } from '@/components/lib/utils';

const LeaderboardPage = () => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<'global' | 'weekly' | 'monthly' | 'contest'>('global');
  const [filterBy, setFilterBy] = useState<'all' | 'country' | 'university'>('all');

  const globalLeaderboard = [
    {
      rank: 1,
      username: 'coding_master',
      name: 'Alex Kumar',
      avatar: '/api/placeholder/48/48',
      country: 'USA',
      university: 'MIT',
      points: 12850,
      problemsSolved: 456,
      contestWins: 34,
      streak: 145,
      badges: ['Legend', 'Contest Master', 'Mentor'],
      level: 45,
    },
    {
      rank: 2,
      username: 'algorithm_ninja',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/48/48',
      country: 'China',
      university: 'Tsinghua',
      points: 11650,
      problemsSolved: 423,
      contestWins: 28,
      streak: 98,
      badges: ['Grandmaster', 'Problem Solver'],
      level: 42,
    },
    {
      rank: 3,
      username: 'data_wizard',
      name: 'Rahul Sharma',
      avatar: '/api/placeholder/48/48',
      country: 'India',
      university: 'IIT Delhi',
      points: 10890,
      problemsSolved: 398,
      contestWins: 25,
      streak: 120,
      badges: ['Master', 'Speed Solver'],
      level: 40,
    },
    {
      rank: 4,
      username: 'code_samurai',
      name: 'Yuki Tanaka',
      avatar: '/api/placeholder/48/48',
      country: 'Japan',
      university: 'Tokyo',
      points: 9870,
      problemsSolved: 367,
      contestWins: 22,
      streak: 87,
      badges: ['Expert', 'Consistent'],
      level: 38,
    },
    {
      rank: 5,
      username: 'tech_guru',
      name: 'Emily Johnson',
      avatar: '/api/placeholder/48/48',
      country: 'UK',
      university: 'Oxford',
      points: 9245,
      problemsSolved: 345,
      contestWins: 19,
      streak: 76,
      badges: ['Advanced', 'Mentor'],
      level: 36,
    },
  ];

  const stats = [
    { label: 'Total Users', value: '100K+', icon: Users, color: 'blue' },
    { label: 'Active Today', value: '12.5K', icon: Zap, color: 'green' },
    { label: 'Contests This Month', value: '24', icon: Trophy, color: 'yellow' },
    { label: 'Problems Solved', value: '2.3M', icon: Code, color: 'purple' },
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
          <Medal className="w-6 h-6 text-white" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
          <Medal className="w-6 h-6 text-white" />
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-lg">
          {rank}
        </div>
      );
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="surface elevate rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Compete with the best developers worldwide
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="surface border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm"
              >
                <option value="all">All Regions</option>
                <option value="country">By Country</option>
                <option value="university">By University</option>
              </select>
              <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                Filters
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="surface rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg grid place-items-center',
                      stat.color === 'blue' ? 'bg-blue-500/10' :
                      stat.color === 'green' ? 'bg-green-500/10' :
                      stat.color === 'yellow' ? 'bg-yellow-500/10' :
                      'bg-purple-500/10'
                    )}>
                      <Icon className={cn(
                        'w-5 h-5',
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'yellow' ? 'text-yellow-600' :
                        'text-purple-600'
                      )} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <div className="flex items-center space-x-3">
          {[
            { id: 'global', label: 'Global', icon: Trophy },
            { id: 'weekly', label: 'Weekly', icon: Calendar },
            { id: 'monthly', label: 'Monthly', icon: TrendingUp },
            { id: 'contest', label: 'Contest', icon: Award },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveLeaderboard(id as any)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all',
                activeLeaderboard === id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'surface text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {globalLeaderboard.slice(0, 3).length > 0 && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-8">
              <div className="flex items-end justify-center space-x-8">
                {/* 2nd Place */}
                {globalLeaderboard[1] && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
                      {globalLeaderboard[1].name.charAt(0)}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center mb-2">
                      <span className="text-white text-2xl font-bold">2</span>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{globalLeaderboard[1].name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">@{globalLeaderboard[1].username}</div>
                      <div className="text-lg font-bold text-blue-600 mt-1">{globalLeaderboard[1].points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {globalLeaderboard[0] && (
                  <div className="flex flex-col items-center -mt-8">
                    <Crown className="w-8 h-8 text-yellow-500 mb-2 animate-bounce" />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold mb-3 border-4 border-yellow-400">
                      {globalLeaderboard[0].name.charAt(0)}
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center mb-2 shadow-lg">
                      <span className="text-white text-3xl font-bold">1</span>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{globalLeaderboard[0].name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">@{globalLeaderboard[0].username}</div>
                      <div className="text-2xl font-bold text-yellow-600 mt-1">{globalLeaderboard[0].points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {globalLeaderboard[2] && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
                      {globalLeaderboard[2].name.charAt(0)}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-2">
                      <span className="text-white text-2xl font-bold">3</span>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{globalLeaderboard[2].name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">@{globalLeaderboard[2].username}</div>
                      <div className="text-lg font-bold text-orange-600 mt-1">{globalLeaderboard[2].points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {globalLeaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer',
                    user.rank <= 3 
                      ? 'surface border border-yellow-200 dark:border-yellow-800 hover:shadow-lg' 
                      : 'surface hover:border-gray-300 dark:hover:border-gray-600 border'
                  )}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Rank Badge */}
                    {getRankBadge(user.rank)}

                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                        {user.level}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="font-semibold text-lg">{user.name}</div>
                        {user.rank <= 10 && (
                          <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                            Top 10
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        @{user.username} • {user.country} • {user.university}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.badges.slice(0, 3).map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Points</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{user.problemsSolved}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Solved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{user.streak}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Streak</div>
                      </div>
                    </div>

                    {/* Action */}
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="ghost">
                Load More Rankings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Your Rank Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Your Rank: #47</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    You're in the top 1% of all users! 🎉
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">2,850</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
                <div className="text-xs text-gray-500 mt-1">520 to next rank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

export default LeaderboardPage;
