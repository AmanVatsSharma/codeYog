'use client';
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { 
  Play, Send, Lightbulb, Brain, CheckCircle2, 
  XCircle, Clock, Zap, RefreshCw, Download, Share, Settings, ChevronDown,
  AlertCircle, TrendingUp, Award, Target, BookOpen, Code2,
  Maximize2, Minimize2, Copy, Check, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/lib/utils';

const MonacoCodeEditor: React.FC = () => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(`def two_sum(nums, target):
    # Write your solution here
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`);
  
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [copied, setCopied] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'tests' | 'ai' | 'console'>('tests');
  
  type TestResult = { 
    id: number; 
    input: string; 
    expected: string; 
    status: 'passed' | 'failed' | 'pending' | string; 
    actualOutput?: string; 
    executionTime?: number;
    memory?: number;
  };
  
  type Analysis = {
    score: number;
    grade: string;
    codeQuality: { readability: number; efficiency: number; maintainability: number; bestPractices: number };
    algorithmAnalysis: { approach: string; timeComplexity: string; spaceComplexity: string; isOptimal: boolean };
    strengths: string[];
    weaknesses: string[];
    suggestions: { type: string; title: string; description: string; priority: 'low' | 'medium' | 'high' | string; codeExample?: string }[];
    overallSummary: string;
    conceptsUsed: string[];
    conceptsToLearn: string[];
    similarProblems: string[];
  };

  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<Analysis | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const languages = [
    { id: 'python', name: 'Python', version: '3.11', monacoId: 'python' },
    { id: 'javascript', name: 'JavaScript', version: 'Node 20', monacoId: 'javascript' },
    { id: 'typescript', name: 'TypeScript', version: '5.0', monacoId: 'typescript' },
    { id: 'java', name: 'Java', version: '17', monacoId: 'java' },
    { id: 'cpp', name: 'C++', version: '20', monacoId: 'cpp' },
    { id: 'go', name: 'Go', version: '1.21', monacoId: 'go' },
    { id: 'rust', name: 'Rust', version: '1.75', monacoId: 'rust' },
    { id: 'csharp', name: 'C#', version: '.NET 8', monacoId: 'csharp' },
  ];

  const testCases: TestResult[] = [
    { id: 1, input: "[2,7,11,15], target=9", expected: "[0,1]", status: 'pending' },
    { id: 2, input: "[3,2,4], target=6", expected: "[1,2]", status: 'pending' },
    { id: 3, input: "[3,3], target=6", expected: "[0,1]", status: 'pending' },
    { id: 4, input: "[1,5,3,7,9], target=12", expected: "[2,4]", status: 'pending' },
  ];

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveResultTab('tests');
    setConsoleOutput(['Running test cases...', '']);
    
    // Simulate API call to code execution service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = testCases.map(test => ({
      ...test,
      status: Math.random() > 0.2 ? 'passed' : 'failed',
      actualOutput: Math.random() > 0.2 ? test.expected : '[0,2]',
      executionTime: Math.floor(Math.random() * 50) + 10,
      memory: Math.floor(Math.random() * 10) + 5
    })) as TestResult[];
    
    setTestResults(results);
    const passedCount = results.filter(r => r.status === 'passed').length;
    setConsoleOutput([
      `Executed ${results.length} test cases`,
      `Passed: ${passedCount}/${results.length}`,
      `Failed: ${results.length - passedCount}/${results.length}`,
      '',
      'All test cases completed!'
    ]);
    setIsRunning(false);
    
    // Generate AI analysis after execution
    if (passedCount >= results.length * 0.7) {
      setTimeout(() => generateAIAnalysis(results), 500);
    }
  };

  const generateAIAnalysis = (results: TestResult[]) => {
    const passedTests = results.filter(r => r.status === 'passed').length;
    const totalTests = results.length;
    const score = Math.floor((passedTests / totalTests) * 100);
    
    const analysis: Analysis = {
      score: score,
      grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : 'C',
      codeQuality: {
        readability: Math.floor(Math.random() * 30) + 70,
        efficiency: Math.floor(Math.random() * 40) + 60,
        maintainability: Math.floor(Math.random() * 25) + 75,
        bestPractices: Math.floor(Math.random() * 35) + 65
      },
      algorithmAnalysis: {
        approach: "Hash Table (One-Pass)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        isOptimal: score >= 80
      },
      strengths: [
        "Efficient use of hash table for O(1) lookup time",
        "Clean and readable code structure with descriptive variables",
        "Proper handling of edge cases and input validation",
        "Good use of enumerate for index tracking"
      ],
      weaknesses: score < 80 ? [
        "Could add input validation for null/empty arrays",
        "Consider adding type hints for better code documentation",
        "Variable names could be more descriptive in some places"
      ] : [],
      suggestions: [
        {
          type: "optimization",
          title: "Add Type Hints",
          description: "Adding type hints improves code readability and helps catch type-related bugs early",
          priority: "medium",
          codeExample: "def two_sum(nums: List[int], target: int) -> List[int]:"
        },
        {
          type: "best-practice",
          title: "Input Validation",
          description: "Add validation for edge cases to make your code more robust",
          priority: "high",
          codeExample: "if not nums or len(nums) < 2:\n    return []"
        },
        {
          type: "documentation",
          title: "Add Docstring",
          description: "Include a docstring explaining the function's purpose, parameters, and return value",
          priority: "low",
          codeExample: '"""Find two numbers that add up to target.\\n\\nArgs:\\n    nums: List of integers\\n    target: Target sum\\n\\nReturns:\\n    List of two indices"""'
        }
      ],
      overallSummary: score >= 80 ? 
        "Excellent solution! Your hash table approach is optimal with O(n) time complexity. The code is clean, efficient, and handles the basic cases well. Consider adding type hints and input validation to make it production-ready. This demonstrates strong understanding of hash table applications." :
        "Good effort! Your approach is on the right track. The hash table strategy is correct, but there are opportunities for improvement in edge case handling and code documentation. Focus on defensive programming practices and consider the full range of possible inputs.",
      conceptsUsed: ["Hash Tables", "Array Iteration", "Dictionary/Map Operations", "Two-Pass vs One-Pass Algorithms"],
      conceptsToLearn: score < 80 ? ["Type Hinting in Python", "Input Validation Patterns", "Defensive Programming"] : ["Advanced Hash Table Techniques", "Space-Time Tradeoffs"],
      similarProblems: ["Three Sum", "Two Sum II - Input Array Sorted", "4Sum", "Two Sum Less Than K", "Subarray Sum Equals K"]
    };
    
    setAiAnalysis(analysis);
    setActiveResultTab('ai');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await handleRunCode();
    setIsSubmitting(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(`def two_sum(nums, target):
    # Write your solution here
    pass`);
    setTestResults([]);
    setAiAnalysis(null);
    setConsoleOutput([]);
  };

  const QualityBar: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = "blue" }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-900 dark:text-gray-100">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            color === 'blue' ? 'bg-blue-500' :
            color === 'green' ? 'bg-green-500' :
            color === 'purple' ? 'bg-purple-500' :
            'bg-yellow-500'
          }`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className={cn('flex flex-col h-full', isFullscreen && 'fixed inset-0 z-50 bg-background')}>
      {/* Editor Header */}
      <div className="surface border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none surface border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name} {lang.version}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Font Size Controls */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setFontSize(Math.max(10, fontSize - 2))}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                title="Decrease font size"
              >
                <span className="text-sm font-medium">A-</span>
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">{fontSize}</span>
              <button 
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                title="Increase font size"
              >
                <span className="text-sm font-medium">A+</span>
              </button>
            </div>

            {/* Editor Actions */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={handleCopyCode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleReset}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Reset code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Download code"
              >
                <Download className="w-4 h-4" />
              </button>
              <button 
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Share code"
              >
                <Share className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              variant="secondary"
              leftIcon={isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              leftIcon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Monaco Editor */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={languages.find(l => l.id === selectedLanguage)?.monacoId || 'python'}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: true },
              fontSize: fontSize,
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>

        {/* Results Panel */}
        <div className="h-80 surface border-t border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Results Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-4">
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveResultTab('tests')}
                className={cn('flex items-center space-x-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors', 
                  activeResultTab === 'tests' 
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Test Results</span>
                {testResults.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">
                    {testResults.filter(r => r.status === 'passed').length}/{testResults.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveResultTab('ai')}
                className={cn('flex items-center space-x-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeResultTab === 'ai' 
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <Brain className="w-4 h-4" />
                <span>AI Analysis</span>
                {aiAnalysis && (
                  <span className={cn('ml-1 px-2 py-0.5 rounded-full text-xs',
                    aiAnalysis.score >= 90 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    aiAnalysis.score >= 70 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  )}>
                    {aiAnalysis.grade}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveResultTab('console')}
                className={cn('flex items-center space-x-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeResultTab === 'console' 
                    ? 'border-gray-600 text-gray-900 dark:text-gray-100' 
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <Code2 className="w-4 h-4" />
                <span>Console</span>
              </button>
            </div>
          </div>

          {/* Results Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeResultTab === 'tests' && (
              <div className="space-y-3">
                {testResults.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Play className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Run your code to see test results</p>
                  </div>
                ) : (
                  testResults.map((result) => (
                    <div key={result.id} className={cn('rounded-lg border p-4 transition-all',
                      result.status === 'passed' 
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                    )}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {result.status === 'passed' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                          <span className="font-semibold text-gray-900 dark:text-gray-100">Test Case {result.id}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{result.executionTime}ms</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>{result.memory}MB</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-mono space-y-1">
                        <div className="text-gray-700 dark:text-gray-300">
                          <span className="text-gray-500 dark:text-gray-500">Input:</span> {result.input}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                          <span className="text-gray-500 dark:text-gray-500">Expected:</span> {result.expected}
                        </div>
                        {result.status === 'failed' && result.actualOutput && (
                          <div className="text-red-600 dark:text-red-400">
                            <span className="text-gray-500 dark:text-gray-500">Got:</span> {result.actualOutput}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeResultTab === 'ai' && (
              <div className="space-y-4">
                {!aiAnalysis ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Submit your code to get AI-powered analysis</p>
                    <p className="text-sm mt-2">Get detailed feedback on code quality, efficiency, and best practices</p>
                  </div>
                ) : (
                  <>
                    {/* Score and Grade */}
                    <div className="surface rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Code Analysis</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Powered by advanced analysis</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{aiAnalysis.score}%</div>
                          <div className={cn('text-lg font-semibold',
                            aiAnalysis.grade.startsWith('A') ? 'text-green-600 dark:text-green-400' :
                            aiAnalysis.grade.startsWith('B') ? 'text-blue-600 dark:text-blue-400' :
                            'text-orange-600 dark:text-orange-400'
                          )}>
                            Grade {aiAnalysis.grade}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overall Summary */}
                    <div className="surface rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Summary</span>
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{aiAnalysis.overallSummary}</p>
                    </div>

                    {/* Algorithm Analysis */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="surface rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-3">Algorithm</h5>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{aiAnalysis.algorithmAnalysis.approach}</p>
                        <div className="space-y-1 text-xs">
                          <div className="text-gray-600 dark:text-gray-400">
                            Time: <span className="font-mono text-gray-900 dark:text-gray-100">{aiAnalysis.algorithmAnalysis.timeComplexity}</span>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            Space: <span className="font-mono text-gray-900 dark:text-gray-100">{aiAnalysis.algorithmAnalysis.spaceComplexity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="surface rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-3">Optimization</h5>
                        <div className="flex items-center space-x-2">
                          {aiAnalysis.algorithmAnalysis.isOptimal ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Optimal solution!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-5 h-5 text-yellow-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Can be optimized</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Code Quality Metrics */}
                    <div className="surface rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Code Quality</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-x-6">
                        <QualityBar label="Readability" value={aiAnalysis.codeQuality.readability} color="green" />
                        <QualityBar label="Efficiency" value={aiAnalysis.codeQuality.efficiency} color="blue" />
                        <QualityBar label="Maintainability" value={aiAnalysis.codeQuality.maintainability} color="purple" />
                        <QualityBar label="Best Practices" value={aiAnalysis.codeQuality.bestPractices} color="yellow" />
                      </div>
                    </div>

                    {/* Strengths and Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Strengths */}
                      <div className="surface rounded-lg p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                        <h4 className="font-medium text-green-900 dark:text-green-300 mb-3 flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Strengths</span>
                        </h4>
                        <ul className="space-y-2">
                          {aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="text-green-800 dark:text-green-300 text-sm flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Areas for Improvement */}
                      {aiAnalysis.weaknesses.length > 0 && (
                        <div className="surface rounded-lg p-4 border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
                          <h4 className="font-medium text-orange-900 dark:text-orange-300 mb-3 flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>Areas to Improve</span>
                          </h4>
                          <ul className="space-y-2">
                            {aiAnalysis.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-orange-800 dark:text-orange-300 text-sm flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* AI Suggestions */}
                    {aiAnalysis.suggestions.length > 0 && (
                      <div className="surface rounded-lg p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                        <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-3 flex items-center space-x-2">
                          <Lightbulb className="w-4 h-4" />
                          <span>AI Suggestions</span>
                        </h4>
                        <div className="space-y-3">
                          {aiAnalysis.suggestions.map((suggestion, index) => (
                            <div key={index} className="surface rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{suggestion.title}</h5>
                                <span className={cn('text-xs px-2 py-1 rounded-full',
                                  suggestion.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                                  suggestion.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                                  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                )}>
                                  {suggestion.priority}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{suggestion.description}</p>
                              {suggestion.codeExample && (
                                <div className="mt-2 bg-gray-900 dark:bg-gray-950 rounded p-3 text-green-400 font-mono text-xs overflow-x-auto">
                                  {suggestion.codeExample}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Insights */}
                    <div className="surface rounded-lg p-4 border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
                      <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-3 flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Learning Insights</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-purple-900 dark:text-purple-300 text-sm mb-2">Concepts Used</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiAnalysis.conceptsUsed.map((concept, index) => (
                              <span key={index} className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-purple-900 dark:text-purple-300 text-sm mb-2">Next to Learn</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiAnalysis.conceptsToLearn.map((concept, index) => (
                              <span key={index} className="surface text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-200 dark:border-purple-700">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-purple-900 dark:text-purple-300 text-sm mb-2">Similar Problems</h5>
                        <div className="flex flex-wrap gap-2">
                          {aiAnalysis.similarProblems.map((problem, index) => (
                            <button
                              key={index}
                              className="surface hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-200 dark:border-purple-700 transition-colors"
                            >
                              {problem}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Achievement */}
                    {aiAnalysis.score >= 80 && (
                      <div className="surface rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-yellow-900 dark:text-yellow-300">Achievement Unlocked!</h4>
                            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                              {aiAnalysis.score >= 95 ? 'Perfect Solution Master - Flawless execution!' :
                               aiAnalysis.score >= 90 ? 'Excellent Problem Solver - Outstanding work!' :
                               'Good Solution Writer - Keep up the great work!'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeResultTab === 'console' && (
              <div className="font-mono text-sm space-y-1">
                {consoleOutput.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Code2 className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Console output will appear here</p>
                  </div>
                ) : (
                  consoleOutput.map((line, index) => (
                    <div key={index} className="text-gray-700 dark:text-gray-300">
                      {line || '\u00A0'}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonacoCodeEditor;
