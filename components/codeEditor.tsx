'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const MonacoCodeEditor = dynamic(() => import('@/components/MonacoCodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading editor...</p>
      </div>
    </div>
  ),
});

const AICodeEditor = () => {
  return <MonacoCodeEditor />;
};

export default AICodeEditor;