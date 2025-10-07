"use client";
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, Mail, Lock, Bell, Palette, Globe, Shield, Code,
  Github, Linkedin, Twitter, MapPin, Link as LinkIcon,
  Save, X, Check, AlertCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/components/lib/utils';

const SettingsPage = () => {
  const { show } = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Alex Kumar',
    username: 'alexkumar',
    email: 'alex@example.com',
    bio: 'Software engineer passionate about algorithms',
    location: 'San Francisco, CA',
    website: 'https://alexkumar.dev',
    github: 'alexkumar',
    linkedin: 'alexkumar',
    twitter: 'alexkumar',
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'python',
    fontSize: 14,
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    contestReminders: true,
    communityUpdates: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showSolvedProblems: true,
    showSubmissions: true,
    showAchievements: true,
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
  ];

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    show({
      title: 'Success',
      description: 'Profile updated successfully!',
      variant: 'success',
    });
    setIsSaving(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="surface elevate rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sections.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={cn(
                        'flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors',
                        activeSection === id
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeSection === 'profile' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your public profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <Input
                          value={profileData.username}
                          onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                          placeholder="Username"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Connect your social media accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">GitHub</label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          value={profileData.github}
                          onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                          placeholder="github-username"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn</label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                          placeholder="linkedin-username"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter</label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          value={profileData.twitter}
                          onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                          placeholder="@twitter-handle"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-end space-x-3">
                  <Button variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {activeSection === 'account' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>Update your email address</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button variant="outline">
                      Update Email
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input type="password" placeholder="••••••••" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input type="password" placeholder="••••••••" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input type="password" placeholder="••••••••" className="pl-10" />
                      </div>
                    </div>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSection === 'preferences' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Editor Preferences</CardTitle>
                    <CardDescription>Customize your coding environment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full surface border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2"
                      >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Font Size</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="10"
                          max="24"
                          value={preferences.fontSize}
                          onChange={(e) => setPreferences({ ...preferences, fontSize: parseInt(e.target.value) })}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{preferences.fontSize}px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['light', 'dark', 'system'].map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => setPreferences({ ...preferences, theme: themeOption })}
                            className={cn(
                              'p-4 rounded-lg border-2 transition-all text-center capitalize',
                              preferences.theme === themeOption
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                            )}
                          >
                            {themeOption}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive important updates via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Get browser notifications' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Weekly summary of your activity' },
                      { key: 'contestReminders', label: 'Contest Reminders', description: 'Reminders before contests start' },
                      { key: 'communityUpdates', label: 'Community Updates', description: 'Updates from discussions you follow' },
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg surface">
                        <div className="flex-1">
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
                        </div>
                        <button
                          onClick={() => setPreferences({ 
                            ...preferences, 
                            [key]: !preferences[key as keyof typeof preferences] 
                          })}
                          className={cn(
                            'w-12 h-6 rounded-full transition-colors relative',
                            preferences[key as keyof typeof preferences]
                              ? 'bg-blue-600'
                              : 'bg-gray-300 dark:bg-gray-600'
                          )}
                        >
                          <div className={cn(
                            'absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform',
                            preferences[key as keyof typeof preferences]
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          )} />
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </>
            )}

            {activeSection === 'privacy' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control what others can see</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                        className="w-full surface border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="followers">Followers Only</option>
                        <option value="private">Private - Only me</option>
                      </select>
                    </div>

                    {[
                      { key: 'showEmail', label: 'Show Email', description: 'Display email on your profile' },
                      { key: 'showSolvedProblems', label: 'Show Solved Problems', description: 'Display your solved problems list' },
                      { key: 'showSubmissions', label: 'Show Submissions', description: 'Show your submission history' },
                      { key: 'showAchievements', label: 'Show Achievements', description: 'Display your badges and achievements' },
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg surface">
                        <div className="flex-1">
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
                        </div>
                        <button
                          onClick={() => setPrivacySettings({ 
                            ...privacySettings, 
                            [key]: !privacySettings[key as keyof typeof privacySettings] 
                          })}
                          className={cn(
                            'w-12 h-6 rounded-full transition-colors relative',
                            privacySettings[key as keyof typeof privacySettings]
                              ? 'bg-blue-600'
                              : 'bg-gray-300 dark:bg-gray-600'
                          )}
                        >
                          <div className={cn(
                            'absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform',
                            privacySettings[key as keyof typeof privacySettings]
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          )} />
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default SettingsPage;
