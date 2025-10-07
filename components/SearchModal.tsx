'use client';
import React, { useState, useEffect } from 'react';
import { Search, Code, Users, MessageSquare, X, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/lib/utils';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({ problems: [], users: [], discussions: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'problems' | 'users' | 'discussions'>('all');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults({ problems: [], users: [], discussions: [] });
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${activeTab === 'all' ? '' : activeTab}`);
        const data = await response.json();
        
        if (data.success) {
          setResults(data.results);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, activeTab]);

  const handleResultClick = (link: string) => {
    router.push(link);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  const totalResults = (results.problems?.length || 0) + 
                       (results.users?.length || 0) + 
                       (results.discussions?.length || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl surface elevate rounded-xl shadow-2xl">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems, users, discussions..."
              className="w-full pl-11 pr-10 py-3 bg-transparent border-0 focus:outline-none text-lg"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {query.trim().length >= 2 && (
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            {[
              { id: 'all', label: 'All', count: totalResults },
              { id: 'problems', label: 'Problems', count: results.problems?.length || 0 },
              { id: 'users', label: 'Users', count: results.users?.length || 0 },
              { id: 'discussions', label: 'Discussions', count: results.discussions?.length || 0 },
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                  activeTab === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {label} {count > 0 && `(${count})`}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>Start typing to search...</p>
              <p className="text-sm mt-2">Search across problems, users, and discussions</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Searching...</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Problems */}
              {(activeTab === 'all' || activeTab === 'problems') && results.problems?.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Problems</div>
                  {results.problems.map((problem: any) => (
                    <button
                      key={problem.id}
                      onClick={() => handleResultClick(`/problems/${problem.slug}`)}
                      className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <Code className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{problem.title}</div>
                            <div className="text-xs text-gray-500">{problem.category}</div>
                          </div>
                        </div>
                        <Badge variant={
                          problem.difficulty === 'Easy' ? 'success' :
                          problem.difficulty === 'Medium' ? 'warning' :
                          'destructive'
                        }>
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Users */}
              {(activeTab === 'all' || activeTab === 'users') && results.users?.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Users</div>
                  {results.users.map((user: any) => (
                    <button
                      key={user.id}
                      onClick={() => handleResultClick(`/profile/${user.username}`)}
                      className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">@{user.username} • Level {user.level}</div>
                        </div>
                        <Badge variant="outline">{user.rank}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Discussions */}
              {(activeTab === 'all' || activeTab === 'discussions') && results.discussions?.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Discussions</div>
                  {results.discussions.map((discussion: any) => (
                    <button
                      key={discussion.id}
                      onClick={() => handleResultClick(`/community/${discussion.id}`)}
                      className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{discussion.title}</div>
                          <div className="text-xs text-gray-500">
                            by {discussion.author.username} • {discussion.views} views
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex items-center justify-between">
          <div>
            Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd> to close
          </div>
          {totalResults > 0 && (
            <div>
              {totalResults} {totalResults === 1 ? 'result' : 'results'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
