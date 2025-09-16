"use client";
import React, { useState } from 'react';
import { 
  MapPin, CheckCircle2, Clock, Star, Brain, Trophy, 
  Target, TrendingUp, BookOpen, Code, Zap, Award,
  ChevronRight, Calendar, Users, PlayCircle,
  Lock, Route, Compass
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn, colorToBg, colorToBorder } from '@/components/lib/utils';

type PathId = 'data-structures' | 'algorithms' | 'competitive' | 'system-design';

interface Concept {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked' | string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  estimatedTime: string;
  problems: number;
  solvedProblems: number;
  concepts: string[];
  xpReward: number;
  prerequisites: string[];
  nextConcepts: string[];
}

const LearningPathTracker = () => {
  const [selectedPath, setSelectedPath] = useState<PathId>('data-structures');
  const [userStats, setUserStats] = useState({
    totalXP: 2850,
    level: 12,
    completedConcepts: 15,
    totalConcepts: 45,
    currentStreak: 7,
    estimatedCompletion: '3 months',
    strengthAreas: ['Arrays', 'Strings', 'Hash Tables'],
    focusAreas: ['Dynamic Programming', 'Graph Algorithms']
  });

  const learningPaths: LearningPath[] = [
    {
      id: 'data-structures' as PathId,
      name: 'Data Structures Mastery',
      description: 'Master fundamental and advanced data structures',
      duration: '4-6 months',
      difficulty: 'Intermediate',
      prerequisites: ['Basic Programming'],
      totalConcepts: 12,
      completedConcepts: 7,
      color: 'blue'
    },
    {
      id: 'algorithms' as PathId,
      name: 'Algorithm Design',
      description: 'Learn algorithmic thinking and problem-solving patterns',
      duration: '5-7 months',
      difficulty: 'Advanced',
      prerequisites: ['Data Structures'],
      totalConcepts: 15,
      completedConcepts: 3,
      color: 'purple'
    },
    {
      id: 'competitive' as PathId,
      name: 'Competitive Programming',
      description: 'Prepare for coding competitions and interviews',
      duration: '6-12 months',
      difficulty: 'Expert',
      prerequisites: ['Algorithms', 'Data Structures'],
      totalConcepts: 20,
      completedConcepts: 0,
      color: 'red'
    },
    {
      id: 'system-design' as PathId,
      name: 'System Design',
      description: 'Design scalable distributed systems',
      duration: '3-4 months',
      difficulty: 'Advanced',
      prerequisites: ['Basic Programming', 'Algorithms'],
      totalConcepts: 10,
      completedConcepts: 2,
      color: 'green'
    }
  ];

  const pathConcepts: Record<PathId, Concept[]> = {
    'data-structures': [
      {
        id: 'arrays',
        name: 'Arrays & Strings',
        description: 'Linear data structures and string manipulation',
        status: 'completed',
        difficulty: 'Easy',
        estimatedTime: '2 weeks',
        problems: 25,
        solvedProblems: 25,
        concepts: ['Array Operations', 'Two Pointers', 'Sliding Window', 'String Processing'],
        xpReward: 300,
        prerequisites: [],
        nextConcepts: ['linked-lists']
      },
      {
        id: 'linked-lists',
        name: 'Linked Lists',
        description: 'Dynamic linear data structures',
        status: 'completed',
        difficulty: 'Easy',
        estimatedTime: '2 weeks',
        problems: 20,
        solvedProblems: 18,
        concepts: ['Singly Linked Lists', 'Doubly Linked Lists', 'Circular Lists'],
        xpReward: 250,
        prerequisites: ['arrays'],
        nextConcepts: ['stacks-queues']
      },
      {
        id: 'stacks-queues',
        name: 'Stacks & Queues',
        description: 'LIFO and FIFO data structures',
        status: 'completed',
        difficulty: 'Easy',
        estimatedTime: '1.5 weeks',
        problems: 18,
        solvedProblems: 16,
        concepts: ['Stack Operations', 'Queue Operations', 'Priority Queues', 'Deque'],
        xpReward: 200,
        prerequisites: ['linked-lists'],
        nextConcepts: ['trees']
      },
      {
        id: 'trees',
        name: 'Binary Trees',
        description: 'Hierarchical data structures',
        status: 'in-progress',
        difficulty: 'Medium',
        estimatedTime: '3 weeks',
        problems: 30,
        solvedProblems: 12,
        concepts: ['Binary Tree Traversal', 'BST Operations', 'Tree Construction'],
        xpReward: 400,
        prerequisites: ['stacks-queues'],
        nextConcepts: ['heaps']
      },
      {
        id: 'heaps',
        name: 'Heaps & Priority Queues',
        description: 'Complete binary trees with heap property',
        status: 'locked',
        difficulty: 'Medium',
        estimatedTime: '2 weeks',
        problems: 15,
        solvedProblems: 0,
        concepts: ['Min/Max Heap', 'Heap Operations', 'Heapify', 'Heap Sort'],
        xpReward: 300,
        prerequisites: ['trees'],
        nextConcepts: ['graphs']
      },
      {
        id: 'graphs',
        name: 'Graph Algorithms',
        description: 'Networks and relationships',
        status: 'locked',
        difficulty: 'Hard',
        estimatedTime: '4 weeks',
        problems: 35,
        solvedProblems: 0,
        concepts: ['DFS/BFS', 'Shortest Paths', 'MST', 'Topological Sort'],
        xpReward: 500,
        prerequisites: ['heaps'],
        nextConcepts: ['advanced-structures']
      }
    ],
    algorithms: [],
    competitive: [],
    'system-design': []
  };

  const currentPath = learningPaths.find(path => path.id === selectedPath)!;
  const currentConcepts = pathConcepts[selectedPath] || [];

  const ConceptCard: React.FC<{ concept: Concept }> = ({ concept }) => {
    const getStatusIcon = () => {
      switch (concept.status) {
        case 'completed':
          return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        case 'in-progress':
          return <PlayCircle className="w-5 h-5 text-blue-500" />;
        case 'locked':
          return <Lock className="w-5 h-5 text-gray-400" />;
        default:
          return <Clock className="w-5 h-5 text-gray-400" />;
      }
    };

    const getStatusColor = () => {
      switch (concept.status) {
        case 'completed':
          return 'border-green-200 bg-green-50';
        case 'in-progress':
          return 'border-blue-200 bg-blue-50';
        case 'locked':
          return 'border-gray-200 bg-gray-50';
        default:
          return 'border-gray-200 bg-white';
      }
    };

    const getDifficultyColor = () => {
      switch (concept.difficulty) {
        case 'Easy':
          return 'bg-green-100 text-green-700';
        case 'Medium':
          return 'bg-yellow-100 text-yellow-700';
        case 'Hard':
          return 'bg-red-100 text-red-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    };

    return (
      <div className={`rounded-xl p-6 border-2 transition-all duration-200 ${getStatusColor()} ${
        concept.status !== 'locked' ? 'hover:shadow-lg cursor-pointer' : 'cursor-not-allowed opacity-75'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            {getStatusIcon()}
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{concept.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{concept.description}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {concept.difficulty}
          </span>
        </div>

        {/* Progress Bar */}
        {concept.status !== 'locked' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {concept.solvedProblems}/{concept.problems} problems
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  concept.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${(concept.solvedProblems / concept.problems) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Concept Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{concept.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-600">{concept.xpReward} XP</span>
              </div>
            </div>
            {concept.status !== 'locked' && (
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                {concept.status === 'completed' ? 'Review' : 'Continue'} →
              </button>
            )}
          </div>

          {/* Sub-concepts */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Key Concepts:</p>
            <div className="flex flex-wrap gap-2">
              {concept.concepts.slice(0, 3).map((subConcept, index) => (
                <span key={index} className="bg-white text-gray-700 text-xs px-2 py-1 rounded border">
                  {subConcept}
                </span>
              ))}
              {concept.concepts.length > 3 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{concept.concepts.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  interface LearningPath {
    id: PathId;
    name: string;
    description: string;
    duration: string;
    difficulty: 'Easy' | 'Intermediate' | 'Advanced' | 'Expert' | string;
    prerequisites: string[];
    totalConcepts: number;
    completedConcepts: number;
    color: string;
  }

  const PathProgressCard: React.FC<{ path: LearningPath }> = ({ path }) => {
    const progress = (path.completedConcepts / path.totalConcepts) * 100;
    const isSelected = selectedPath === path.id;
    const selectedBorder = colorToBorder(path.color, 300);
    const selectedBg = colorToBg(path.color, 50);
    const iconBg = colorToBg(path.color, 500);
    
    return (
      <div 
        className={cn('p-4 rounded-xl border-2 cursor-pointer transition-all duration-200', isSelected ? cn(selectedBorder, selectedBg, 'shadow-lg') : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md')}
        onClick={() => setSelectedPath(path.id)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{path.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{path.description}</p>
          </div>
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isSelected ? iconBg : 'bg-gray-200')}>
            <Route className={cn('w-4 h-4', isSelected ? 'text-white' : 'text-gray-600')} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">
              {path.completedConcepts}/{path.totalConcepts} concepts
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={cn('h-2 rounded-full transition-all duration-500', iconBg)} style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={`px-2 py-1 rounded-full ${
              path.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              path.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {path.difficulty}
            </span>
            <span className="text-gray-500">{path.duration}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="mb-2">AI Learning Insights</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white">
                    <CardContent>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Recommended Focus</h3>
                      <p className="text-gray-700 text-sm">Complete Binary Trees to unlock advanced concepts</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Learning Pace</h3>
                      <p className="text-gray-700 text-sm">On track to complete in {userStats.estimatedCompletion}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Next Milestone</h3>
                      <p className="text-gray-700 text-sm">50% completion in 2 weeks</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningPaths.map((path) => (
              <PathProgressCard key={path.id} path={path} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colorToBg(currentPath.color, 500))}>
                    <Route className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentPath.name}</h3>
                    <p className="text-gray-600 text-sm">{currentPath.difficulty}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium text-gray-900">{Math.round((currentPath.completedConcepts / currentPath.totalConcepts) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className={cn('h-3 rounded-full transition-all duration-500', colorToBg(currentPath.color, 500))} style={{ width: `${(currentPath.completedConcepts / currentPath.totalConcepts) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 text-sm">Completed</span>
                      </div>
                      <span className="font-medium text-gray-900">{currentPath.completedConcepts}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600 text-sm">Remaining</span>
                      </div>
                      <span className="font-medium text-gray-900">{currentPath.totalConcepts - currentPath.completedConcepts}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-600 text-sm">Duration</span>
                      </div>
                      <span className="font-medium text-gray-900">{currentPath.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-2">Prerequisites</h4>
                    <div className="space-y-1">
                      {currentPath.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-gray-600 text-sm">{prereq}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className={cn('w-full text-white py-2 px-4 rounded-lg font-medium transition-colors', colorToBg(currentPath.color, 600))}>Continue Learning</button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{currentPath.name} - Concept Roadmap</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Your learning journey</span>
              </div>
            </div>

            <div className="space-y-6">
              {currentConcepts.map((concept, index) => (
                <div key={concept.id} className="relative">
                  {index < currentConcepts.length - 1 && <div className="absolute left-6 top-full w-0.5 h-6 bg-gray-300 z-0"></div>}
                  <Card>
                    <CardContent>
                      <ConceptCard concept={concept} />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">Recent Achievements</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">Array Master</h4>
                    <p className="text-gray-600 text-xs">Completed all array problems</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">Speed Solver</h4>
                    <p className="text-gray-600 text-xs">Solved 5 problems in a row</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">Consistency King</h4>
                    <p className="text-gray-600 text-xs">7-day learning streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Recommendations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800">Complete 3 more tree problems to unlock heaps</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800">Review linked list concepts for better understanding</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800">Practice tree traversal patterns daily</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Your Strengths</h4>
                <div className="space-y-2">
                  {userStats.strengthAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 text-sm">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-green-700 text-xs mt-3">Continue leveraging these skills in advanced problems</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">Focus Areas</h4>
                <div className="space-y-2">
                  {userStats.focusAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-800 text-sm">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-orange-700 text-xs mt-3">Dedicate extra time to these concepts for better mastery</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">This Week's Study Plan</h3>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Customize →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className={cn('p-3 rounded-lg border', index === 1 ? 'border-blue-300 bg-blue-50' : 'border-gray-200')}>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 text-sm mb-1">{day}</div>
                    <div className="text-xs text-gray-600 mb-2">{15 + index}</div>
                    {index === 1 ? (
                      <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Trees Practice</div>
                    ) : index === 3 ? (
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Review Day</div>
                    ) : index === 5 ? (
                      <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Challenge</div>
                    ) : (
                      <div className="text-gray-400 text-xs">Rest</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default LearningPathTracker;