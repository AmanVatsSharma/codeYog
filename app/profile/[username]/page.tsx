"use client";
import React, { useState } from 'react';
import { use } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { 
  User, MapPin, Link as LinkIcon, Github, Linkedin, Twitter,
  Calendar, Award, Trophy, Zap, Target, Code, CheckCircle2,
  TrendingUp, Star, MessageSquare, Bookmark, Settings,
  Mail, Heart, Users
} from 'lucide-react';
import { cn } from '@/components/lib/utils';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in production, fetch from API
  const profile = {
    username: username,
    name: 'Alex Kumar',
    email: 'alex@example.com',
    avatar: '/api/placeholder/120/120',
    bio: 'Software engineer passionate about algorithms and problem-solving. Love competitive programming!',
    location: 'San Francisco, CA',
    website: 'https://alexkumar.dev',
    github: 'alexkumar',
    linkedin: 'alexkumar',
    twitter: 'alexkumar',
    joinedDate: 'November 2023',
    
    // Stats
    level: 12,
    xp: 2850,
    rank: 'Gold',
    reputation: 2850,
    streak: 7,
    longestStreak: 23,
    
    // Problem stats
    totalProblems: 156,
    solvedProblems: 89,
    easySolved: 45,
    mediumSolved: 32,
    hardSolved: 12,
    
    // Activity
    followers: 245,
    following: 128,
    contributions: 456,
  };

  const stats = [
    { label: 'Problems Solved', value: profile.solvedProblems, icon: CheckCircle2, color: 'green' },
    { label: 'Reputation', value: profile.reputation, icon: Star, color: 'yellow' },
    { label: 'Current Streak', value: `${profile.streak} days`, icon: Zap, color: 'orange' },
    { label: 'Rank', value: profile.rank, icon: Trophy, color: 'blue' },
  ];

  const recentSubmissions = [
    {
      id: 1,
      problem: 'Two Sum',
      difficulty: 'Easy',
      status: 'Accepted',
      language: 'Python',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      problem: 'Binary Tree Traversal',
      difficulty: 'Medium',
      status: 'Accepted',
      language: 'JavaScript',
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      problem: 'Word Ladder II',
      difficulty: 'Hard',
      status: 'Wrong Answer',
      language: 'Python',
      timeAgo: '1 day ago',
    },
  ];

  const achievements = [
    {
      id: 1,
      name: 'Week Warrior',
      description: '7-day coding streak',
      icon: Zap,
      color: 'orange',
      unlockedAt: 'Today',
    },
    {
      id: 2,
      name: 'Python Pro',
      description: 'Solved 30+ Python problems',
      icon: Code,
      color: 'blue',
      unlockedAt: '2 days ago',
    },
    {
      id: 3,
      name: 'Speed Demon',
      description: 'Solved problem in under 5 minutes',
      icon: Target,
      color: 'red',
      unlockedAt: '3 days ago',
    },
  ];

  const languages = [
    { name: 'Python', problems: 45, percentage: 50 },
    { name: 'JavaScript', problems: 28, percentage: 31 },
    { name: 'Java', problems: 12, percentage: 13 },
    { name: 'C++', problems: 4, percentage: 6 },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold border-4 border-white dark:border-gray-800">
                  {profile.level}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <Badge variant="default" className="bg-gradient-to-r from-yellow-400 to-orange-400">
                    {profile.rank}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">@{profile.username}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">{profile.bio}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {profile.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-blue-600">
                      <LinkIcon className="w-4 h-4" />
                      <span>{profile.website.replace('https://', '')}</span>
                    </a>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profile.joinedDate}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-3 mb-4">
                  {profile.github && (
                    <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Follow Stats and Actions */}
                <div className="flex items-center space-x-4">
                  <button className="text-sm hover:text-blue-600">
                    <span className="font-semibold">{profile.followers}</span> followers
                  </button>
                  <button className="text-sm hover:text-blue-600">
                    <span className="font-semibold">{profile.following}</span> following
                  </button>
                  <Button
                    variant={isFollowing ? "outline" : "primary"}
                    size="sm"
                    leftIcon={isFollowing ? <CheckCircle2 className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<Mail className="w-4 h-4" />}>
                    Message
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<Settings className="w-4 h-4" />}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      'w-12 h-12 rounded-lg grid place-items-center',
                      stat.color === 'green' ? 'bg-green-500/10' :
                      stat.color === 'yellow' ? 'bg-yellow-500/10' :
                      stat.color === 'orange' ? 'bg-orange-500/10' :
                      'bg-blue-500/10'
                    )}>
                      <Icon className={cn(
                        'w-6 h-6',
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'yellow' ? 'text-yellow-600' :
                        stat.color === 'orange' ? 'text-orange-600' :
                        'text-blue-600'
                      )} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Tabs */}
        <div>
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'submissions', label: 'Submissions' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'activity', label: 'Activity' },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />

          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Problem Solving Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Problem Solving Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Easy ({profile.easySolved}/{Math.floor(profile.totalProblems * 0.4)})</span>
                            <span className="font-medium">{Math.round((profile.easySolved / (profile.totalProblems * 0.4)) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(profile.easySolved / (profile.totalProblems * 0.4)) * 100}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Medium ({profile.mediumSolved}/{Math.floor(profile.totalProblems * 0.4)})</span>
                            <span className="font-medium">{Math.round((profile.mediumSolved / (profile.totalProblems * 0.4)) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(profile.mediumSolved / (profile.totalProblems * 0.4)) * 100}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Hard ({profile.hardSolved}/{Math.floor(profile.totalProblems * 0.2)})</span>
                            <span className="font-medium">{Math.round((profile.hardSolved / (profile.totalProblems * 0.2)) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(profile.hardSolved / (profile.totalProblems * 0.2)) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Submissions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentSubmissions.map((submission) => (
                          <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg surface hover:border-gray-300 dark:hover:border-gray-600 border transition-colors">
                            <div className="flex-1">
                              <div className="font-medium">{submission.problem}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{submission.timeAgo}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={
                                submission.difficulty === 'Easy' ? 'success' :
                                submission.difficulty === 'Medium' ? 'warning' :
                                'destructive'
                              }>
                                {submission.difficulty}
                              </Badge>
                              <Badge variant={submission.status === 'Accepted' ? 'success' : 'destructive'}>
                                {submission.status}
                              </Badge>
                              <span className="text-xs text-gray-500">{submission.language}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Languages */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {languages.map((lang, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{lang.name}</span>
                              <span className="font-medium">{lang.problems}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${lang.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Achievements */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {achievements.slice(0, 3).map((achievement) => {
                          const Icon = achievement.icon;
                          return (
                            <div key={achievement.id} className="flex items-center space-x-3">
                              <div className={cn(
                                'w-10 h-10 rounded-lg grid place-items-center',
                                achievement.color === 'orange' ? 'bg-orange-500/10' :
                                achievement.color === 'blue' ? 'bg-blue-500/10' :
                                'bg-red-500/10'
                              )}>
                                <Icon className={cn(
                                  'w-5 h-5',
                                  achievement.color === 'orange' ? 'text-orange-600' :
                                  achievement.color === 'blue' ? 'text-blue-600' :
                                  'text-red-600'
                                )} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{achievement.name}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{achievement.unlockedAt}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <Card>
                <CardHeader>
                  <CardTitle>All Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Submission history will appear here</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'achievements' && (
              <Card>
                <CardHeader>
                  <CardTitle>All Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={achievement.id} className="surface rounded-lg p-4 border hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                          <div className={cn(
                            'w-12 h-12 rounded-lg grid place-items-center mb-3',
                            achievement.color === 'orange' ? 'bg-orange-500/10' :
                            achievement.color === 'blue' ? 'bg-blue-500/10' :
                            'bg-red-500/10'
                          )}>
                            <Icon className={cn(
                              'w-6 h-6',
                              achievement.color === 'orange' ? 'text-orange-600' :
                              achievement.color === 'blue' ? 'text-blue-600' :
                              'text-red-600'
                            )} />
                          </div>
                          <div className="font-semibold mb-1">{achievement.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</div>
                          <div className="text-xs text-gray-500">Unlocked {achievement.unlockedAt}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'activity' && (
              <Card>
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Activity feed will appear here</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
