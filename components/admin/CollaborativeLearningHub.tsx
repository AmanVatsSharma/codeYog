import React, { useState, useEffect } from 'react';
import { 
  Users, MessageCircle, Video, Share2, Trophy, Star, Clock,
  Code, Brain, Target, Heart, Eye, ThumbsUp, MessageSquare,
  UserPlus, Search, Filter, Calendar, MapPin, Award, Zap,
  Play, Pause, Volume2, VolumeX, Settings, MoreHorizontal,
  Send, Paperclip, Smile, ChevronDown, CheckCircle2, AlertCircle
} from 'lucide-react';

const CollaborativeLearningHub = () => {
  const [activeTab, setActiveTab] = useState('study-groups');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [liveSession, setLiveSession] = useState(null);

  const [studyGroups, setStudyGroups] = useState([
    {
      id: 1,
      name: "Dynamic Programming Masters",
      description: "Advanced DP techniques and problem-solving strategies",
      members: 24,
      maxMembers: 30,
      difficulty: "Advanced",
      topics: ["Dynamic Programming", "Optimization", "Memoization"],
      nextSession: "Today 7:00 PM",
      isLive: false,
      language: "Multi-language",
      memberAvatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"],
      progress: 65,
      created: "2 weeks ago",
      category: "Algorithms"
    },
    {
      id: 2,
      name: "JavaScript Ninjas",
      description: "Master modern JavaScript and web algorithms",
      members: 18,
      maxMembers: 25,
      difficulty: "Intermediate",
      topics: ["JavaScript", "Web APIs", "Async Programming"],
      nextSession: "Tomorrow 6:30 PM",
      isLive: true,
      language: "JavaScript",
      memberAvatars: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"],
      progress: 40,
      created: "1 week ago",
      category: "Languages"
    },
    {
      id: 3,
      name: "FAANG Interview Prep",
      description: "Crack top tech company interviews together",
      members: 45,
      maxMembers: 50,
      difficulty: "Expert",
      topics: ["System Design", "Coding Interviews", "Behavioral"],
      nextSession: "Wed 8:00 PM",
      isLive: false,
      language: "Multi-language",
      memberAvatars: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"],
      progress: 80,
      created: "1 month ago",
      category: "Interview Prep"
    }
  ]);

  const [peerSessions, setPeerSessions] = useState([
    {
      id: 1,
      title: "Binary Tree Traversal Deep Dive",
      host: "Sarah Chen",
      hostAvatar: "/api/placeholder/40/40",
      participants: 12,
      duration: "45 min",
      scheduledTime: "Today 7:00 PM",
      status: "upcoming",
      topics: ["Binary Trees", "DFS", "BFS"],
      difficulty: "Medium",
      type: "Problem Solving"
    },
    {
      id: 2,
      title: "Live Coding: Graph Algorithms",
      host: "Alex Kumar",
      hostAvatar: "/api/placeholder/40/40",
      participants: 8,
      duration: "60 min",
      scheduledTime: "Now",
      status: "live",
      topics: ["Graphs", "Dijkstra", "DFS/BFS"],
      difficulty: "Hard",
      type: "Live Coding"
    },
    {
      id: 3,
      title: "Code Review Session",
      host: "Mike Johnson",
      hostAvatar: "/api/placeholder/40/40",
      participants: 6,
      duration: "30 min",
      scheduledTime: "Tomorrow 6:00 PM",
      status: "upcoming",
      topics: ["Code Quality", "Best Practices"],
      difficulty: "All Levels",
      type: "Code Review"
    }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    {
      rank: 1,
      name: "Alex Kumar",
      avatar: "/api/placeholder/40/40",
      points: 2850,
      problemsSolved: 89,
      helpfulAnswers: 34,
      badges: ["Helper", "Problem Solver", "Mentor"]
    },
    {
      rank: 2,
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      points: 2640,
      problemsSolved: 76,
      helpfulAnswers: 28,
      badges: ["Consistent", "JavaScript Pro"]
    },
    {
      rank: 3,
      name: "Mike Johnson",
      avatar: "/api/placeholder/40/40",
      points: 2435,
      problemsSolved: 71,
      helpfulAnswers: 41,
      badges: ["Mentor", "Code Reviewer"]
    }
  ]);

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Best approach for solving Two Sum variations?",
      author: "Emma Wilson",
      authorAvatar: "/api/placeholder/32/32",
      replies: 12,
      likes: 24,
      views: 156,
      timeAgo: "2 hours ago",
      tags: ["Arrays", "Hash Table", "Two Pointers"],
      isAnswered: true,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Dynamic Programming vs Recursion with Memoization",
      author: "David Kim",
      authorAvatar: "/api/placeholder/32/32",
      replies: 8,
      likes: 18,
      views: 89,
      timeAgo: "4 hours ago",
      tags: ["Dynamic Programming", "Recursion"],
      isAnswered: false,
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "How to optimize space complexity in tree problems?",
      author: "Lisa Zhang",
      authorAvatar: "/api/placeholder/32/32",
      replies: 15,
      likes: 31,
      views: 203,
      timeAgo: "6 hours ago",
      tags: ["Trees", "Space Optimization", "Morris Traversal"],
      isAnswered: true,
      difficulty: "Hard"
    }
  ]);

  type StudyGroup = {
    id: number;
    name: string;
    description: string;
    members: number;
    maxMembers: number;
    difficulty: string;
    topics: string[];
    nextSession: string;
    isLive: boolean;
    language: string;
    memberAvatars: string[];
    progress: number;
    created: string;
    category: string;
  };

  const StudyGroupCard: React.FC<{ group: StudyGroup }> = ({ group }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
            {group.isLive && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                LIVE
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{group.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {group.topics.slice(0, 3).map((topic, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            group.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
            group.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
            group.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {group.difficulty}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{group.members}/{group.maxMembers} members</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{group.nextSession}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {group.memberAvatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="Member"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
          {group.members > group.memberAvatars.length && (
            <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600 font-medium">+{group.members - group.memberAvatars.length}</span>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500">{group.created}</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Group Progress</span>
          <span className="font-medium text-gray-900">{group.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${group.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{group.category}</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {group.isLive ? 'Join Live Session' : 'Join Group'}
        </button>
      </div>
    </div>
  );

  type PeerSession = {
    id: number;
    title: string;
    host: string;
    hostAvatar: string;
    participants: number;
    duration: string;
    scheduledTime: string;
    status: 'live' | 'upcoming' | string;
    topics: string[];
    difficulty: string;
    type: string;
  };

  const PeerSessionCard: React.FC<{ session: PeerSession }> = ({ session }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{session.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <img src={session.hostAvatar} alt="Host" className="w-5 h-5 rounded-full" />
            <span className="text-sm text-gray-600">by {session.host}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            session.status === 'live' ? 'bg-red-100 text-red-700' :
            session.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {session.status === 'live' ? 'LIVE' : session.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>{session.type}</span>
          <span>{session.duration}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {session.topics.map((t, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );

  type LeaderboardEntry = {
    rank: number;
    name: string;
    avatar: string;
    points: number;
    problemsSolved: number;
    helpfulAnswers: number;
    badges: string[];
  };

  const LeaderboardCard: React.FC<{ entry: LeaderboardEntry }> = ({ entry }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-2xl font-bold text-gray-900">{entry.rank}</span>
        <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-semibold text-gray-900">{entry.name}</h4>
          <p className="text-sm text-gray-600">Points: {entry.points}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {entry.badges.map((badge, index) => (
          <span key={index} className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">{badge}</span>
        ))}
      </div>
    </div>
  );

  type Discussion = {
    id: number;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    likes: number;
    views: number;
    timeAgo: string;
    tags: string[];
    isAnswered: boolean;
    difficulty: string;
  };

  const DiscussionCard: React.FC<{ discussion: Discussion }> = ({ discussion }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center space-x-2 mb-3">
        <img src={discussion.authorAvatar} alt={discussion.author} className="w-5 h-5 rounded-full" />
        <span className="text-sm text-gray-600">{discussion.author}</span>
        <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
      </div>
      <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {discussion.tags.map((tag, index) => (
          <span key={index} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{tag}</span>
        ))}
      </div>
      <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
        <Users className="w-4 h-4" />
        <span>{discussion.replies} replies</span>
        <ThumbsUp className="w-4 h-4" />
        <span>{discussion.likes} likes</span>
        <Eye className="w-4 h-4" />
        <span>{discussion.views} views</span>
      </div>
      <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
        <span className={`px-2 py-0.5 rounded-full ${
          discussion.isAnswered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {discussion.isAnswered ? 'Answered' : 'Unanswered'}
        </span>
        <span className={`px-2 py-0.5 rounded-full ${
          discussion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
          discussion.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {discussion.difficulty}
        </span>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Collaborative Learning Hub</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'study-groups' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('study-groups')}
        >
          Study Groups
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'peer-sessions' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('peer-sessions')}
        >
          Peer Sessions
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'leaderboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'discussions' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </button>
      </div>

      {activeTab === 'study-groups' && (
        <div className="grid gap-6">
          {studyGroups.map(group => (
            <StudyGroupCard key={group.id} group={group} />
          ))}
        </div>
      )}

      {activeTab === 'peer-sessions' && (
        <div className="grid gap-6">
          {peerSessions.map(session => (
            <PeerSessionCard key={session.id} session={session} />
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="grid gap-6">
          {leaderboard.map(entry => (
            <LeaderboardCard key={entry.rank} entry={entry} />
          ))}
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="grid gap-6">
          {discussions.map(discussion => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollaborativeLearningHub;