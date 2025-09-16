'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Send, 
  RotateCcw, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Clock,
  Zap,
  Code,
  Terminal,
  FileText,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  Maximize2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CodeEditorProps {
  problem?: {
    id: number
    title: string
    difficulty: string
    description: string
    examples: Array<{
      input: string
      output: string
      explanation?: string
    }>
    constraints: string[]
    testCases: Array<{
      input: string
      expectedOutput: string
    }>
  }
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problem }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python')
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [output, setOutput] = useState('')
  const [testResults, setTestResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('problem')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const languages = [
    { id: 'python', name: 'Python 3', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'csharp', name: 'C#', icon: '🔷' },
    { id: 'go', name: 'Go', icon: '🐹' }
  ]

  const defaultCode = {
    python: `def solution(nums, target):
    # Your code here
    pass`,
    javascript: `function solution(nums, target) {
    // Your code here
}`,
    java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
    cpp: `class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
    csharp: `public class Solution {
    public int[] Solution(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
    go: `func solution(nums []int, target int) []int {
    // Your code here
    return []int{}
}`
  }

  useEffect(() => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode] || '')
  }, [selectedLanguage])

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('')
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Running test cases...
✓ Test case 1 passed
✓ Test case 2 passed
✓ Test case 3 passed

All test cases passed! 🎉`)
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate submission
    setTimeout(() => {
      setTestResults([
        { id: 1, status: 'passed', time: '45ms', memory: '2.1MB' },
        { id: 2, status: 'passed', time: '52ms', memory: '2.3MB' },
        { id: 3, status: 'passed', time: '38ms', memory: '2.0MB' },
        { id: 4, status: 'passed', time: '41ms', memory: '2.2MB' },
        { id: 5, status: 'passed', time: '49ms', memory: '2.1MB' }
      ])
      setIsSubmitting(false)
    }, 3000)
  }

  const handleReset = () => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode] || '')
    setOutput('')
    setTestResults([])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Problem Panel */}
      <div className={`${isFullscreen ? 'w-1/2' : 'w-1/3'} bg-white border-r border-gray-200 flex flex-col`}>
        {/* Problem Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">
                {problem?.title || 'Two Sum'}
              </h1>
              <Badge variant={getDifficultyColor(problem?.difficulty || 'easy')}>
                {problem?.difficulty || 'Easy'}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Problem
            </Button>
            <Button variant="ghost" size="sm">
              <Terminal className="w-4 h-4 mr-2" />
              Console
            </Button>
          </div>
        </div>

        {/* Problem Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {problem?.description || `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Examples</h3>
              <div className="space-y-4">
                {(problem?.examples || [
                  {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                  },
                  {
                    input: "nums = [3,2,4], target = 6",
                    output: "[1,2]",
                    explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
                  }
                ]).map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Input: </span>
                        <code className="text-sm bg-white px-2 py-1 rounded border">
                          {example.input}
                        </code>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Output: </span>
                        <code className="text-sm bg-white px-2 py-1 rounded border">
                          {example.output}
                        </code>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Explanation: </span>
                          <span className="text-sm text-gray-700">{example.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Constraints</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {(problem?.constraints || [
                  "2 <= nums.length <= 10⁴",
                  "-10⁹ <= nums[i] <= 10⁹",
                  "-10⁹ <= target <= 10⁹",
                  "Only one valid answer exists."
                ]).map((constraint, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className={`${isFullscreen ? 'w-1/2' : 'w-2/3'} flex flex-col`}>
        {/* Editor Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.icon} {lang.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant="gradient" 
                onClick={handleRun}
                disabled={isRunning}
                className="min-w-[100px]"
              >
                {isRunning ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </>
                )}
              </Button>
              <Button 
                variant="premium" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-900 text-white">
            <div className="h-full p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
                placeholder="Write your code here..."
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Output</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {output && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
                  </div>
                </div>
              )}

              {testResults.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Test Results</h4>
                  {testResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {result.status === 'passed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="text-sm font-medium">Test Case {result.id}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.time} • {result.memory}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!output && testResults.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Terminal className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Run your code to see output</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor