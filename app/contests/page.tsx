"use client";
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, Clock, Users, Calendar, Target, Award, Zap, Star,
  Play, TrendingUp, Medal, ChevronRight, Filter, Search
} from 'lucide-react';
import { cn } from '@/components/lib/utils';

const ContestsPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'live' | 'past'>('all');

  const contests = [
    {
      id: 1,
      title: 'Weekly Contest 385',
      description: 'Sharpen your coding skills with 4 challenging problems',
      type: 'weekly',
      status: 'upcoming',
      difficulty: 'All Levels',
      startTime: '2024-02-15T14:00:00Z',
      duration: 90,
      participants: 4523,
      prizes: ['$500', '$300', '$200'],
      problems: 4,
    },
    {
      id: 2,
      title: 'Biweekly Contest 125',
      description: 'Test your problem-solving speed',
      type: 'biweekly',
      status: 'live',
      difficulty: 'All Levels',
      startTime: '2024-02-10T08:00:00Z',
      duration: 90,
      participants: 3891,
      prizes: ['$300', '$150', '$100'],
      problems: 4,
    },
    {
      id: 3,
      title: 'Algorithm Masters Championship',
      description: 'Ultimate coding challenge for experts',
      type: 'special',
      status: 'past',
      difficulty: 'Expert',
      startTime: '2024-02-01T10:00:00Z',
      duration: 240,
      participants: 1234,
      prizes: ['$2000', '$1000', '$500'],
      problems: 4,
    },
    {
      id: 4,
      title: 'Sprint Coding Challenge',
      description: 'Fast-paced problem solving marathon',
      type: 'special',
      status: 'upcoming',
      difficulty: 'Intermediate',
      startTime: '2024-02-18T16:00:00Z',
      duration: 120,
      participants: 2156,
      prizes: ['$400', '$200', '$100'],
      problems: 5,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'coding_master', avatar: '/api/placeholder/40/40', score: 2800, problems: 4, time: '1h 45m' },
    { rank: 2, name: 'algorithm_ninja', avatar: '/api/placeholder/40/40', score: 2600, problems: 4, time: '1h 52m' },
    { rank: 3, name: 'data_wizard', avatar: '/api/placeholder/40/40', score: 2400, problems: 4, time: '2h 8m' },
    { rank: 4, name: 'code_samurai', avatar: '/api/placeholder/40/40', score: 2200, problems: 3, time: '1h 38m' },
    { rank: 5, name: 'tech_guru', avatar: '/api/placeholder/40/40', score: 2100, problems: 3, time: '1h 55m' },
  ];

  const formatTimeUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff < 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getStatusColor = (status: string): 'default' | 'success' | 'warning' | 'destructive' | 'outline' => {
    switch (status) {
      case 'live':
        return 'destructive';
      case 'upcoming':
        return 'default';
      case 'past':
        return 'outline';
      default:
        return 'default';
    }
  };

  const filtered = activeFilter === 'all' 
    ? contests 
    : contests.filter(c => c.status === activeFilter);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="surface elevate rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Coding Contests</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Compete with thousands of developers worldwide
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" leftIcon={<Calendar className="w-4 h-4" />}>
                Schedule
              </Button>
              <Button leftIcon={<Trophy className="w-4 h-4" />}>
                Create Contest
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 grid place-items-center">
                  <Trophy className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Contests</div>
                </div>
              </div>
            </div>
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 grid place-items-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12.5K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Participants</div>
                </div>
              </div>
            </div>
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 grid place-items-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">$50K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Prize Pool</div>
                </div>
              </div>
            </div>
            <div className="surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 grid place-items-center">
                  <Star className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Your Wins</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          {[
            { id: 'all', label: 'All Contests', icon: Trophy },
            { id: 'live', label: 'Live Now', icon: Zap },
            { id: 'upcoming', label: 'Upcoming', icon: Clock },
            { id: 'past', label: 'Past', icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id as any)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all',
                activeFilter === id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'surface text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Contest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((contest) => (
            <Card key={contest.id} className="hover:border-blue-300 transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{contest.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contest.description}</p>
                  </div>
                  <Badge variant={getStatusColor(contest.status)}>
                    {contest.status === 'live' && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                    )}
                    {contest.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{contest.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{contest.participants.toLocaleString()} joined</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{contest.problems} problems</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Trophy className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{contest.prizes[0]} prize</span>
                  </div>
                </div>

                {contest.status === 'upcoming' && (
                  <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700 dark:text-blue-300">Starts in</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatTimeUntil(contest.startTime)}
                      </span>
                    </div>
                  </div>
                )}

                {contest.status === 'live' && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 animate-pulse">
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-red-700 dark:text-red-300">Contest is Live!</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {contest.type}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {contest.difficulty}
                    </span>
                  </div>
                  <Button
                    variant={contest.status === 'live' ? 'primary' : 'outline'}
                    size="sm"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    {contest.status === 'live' ? 'Enter Now' :
                     contest.status === 'upcoming' ? 'Register' : 'View Results'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Medal className="w-5 h-5 text-yellow-600" />
              <span>Global Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-lg transition-colors',
                    entry.rank <= 3 ? 'surface border border-yellow-200 dark:border-yellow-800' : 'surface'
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                      entry.rank === 1 ? 'bg-yellow-500 text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}>
                      {entry.rank}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{entry.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {entry.problems} problems • {entry.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{entry.score}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">points</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="ghost" rightIcon={<ChevronRight className="w-4 h-4" />}>
                View Full Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default ContestsPage;
