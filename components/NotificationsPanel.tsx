'use client';
import React, { useState } from 'react';
import { Bell, X, CheckCircle2, Trophy, MessageSquare, Award, Code, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/lib/utils';

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You earned the "Week Warrior" badge for maintaining a 7-day streak',
      link: '/profile/alexkumar',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      icon: Award,
      color: 'yellow',
    },
    {
      id: '2',
      type: 'contest',
      title: 'Contest Starting Soon',
      message: 'Weekly Contest 385 starts in 2 hours',
      link: '/contests',
      isRead: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      icon: Trophy,
      color: 'blue',
    },
    {
      id: '3',
      type: 'comment',
      title: 'New Comment',
      message: 'Sarah Chen replied to your discussion about Dynamic Programming',
      link: '/community',
      isRead: false,
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      icon: MessageSquare,
      color: 'green',
    },
    {
      id: '4',
      type: 'submission',
      title: 'Submission Accepted',
      message: 'Your solution for "Two Sum" was accepted!',
      link: '/problems/1',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      icon: Code,
      color: 'purple',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-12 w-96 max-h-[600px] surface elevate rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
                          !notification.isRead && 'bg-blue-50/50 dark:bg-blue-900/10'
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            'w-10 h-10 rounded-lg grid place-items-center flex-shrink-0',
                            notification.color === 'yellow' ? 'bg-yellow-500/10' :
                            notification.color === 'blue' ? 'bg-blue-500/10' :
                            notification.color === 'green' ? 'bg-green-500/10' :
                            'bg-purple-500/10'
                          )}>
                            <Icon className={cn(
                              'w-5 h-5',
                              notification.color === 'yellow' ? 'text-yellow-600' :
                              notification.color === 'blue' ? 'text-blue-600' :
                              notification.color === 'green' ? 'text-green-600' :
                              'text-purple-600'
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {getTimeAgo(notification.createdAt)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-xs text-gray-500 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
