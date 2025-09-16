'use client'
import React, { useState, useEffect } from 'react';
import { 
  Play, Square, Send, Lightbulb, Brain, CheckCircle2, 
  XCircle, Clock, Zap, Code, MessageSquare, Star,
  RefreshCw, Download, Share, Settings, ChevronDown,
  AlertCircle, TrendingUp, Award, Target
} from 'lucide-react';

const AICodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(`def two_sum(nums, target):
    # Write your solution here
    pass`);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  type TestResult = { id: number; input: string; expected: string; status: 'passed' | 'failed' | null | string; actualOutput?: string; executionTime?: number };
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
  const [showHints, setShowHints] = useState(false);
  const [currentProblem, setCurrentProblem] = useState({
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹"
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ]
  });

  const [activeTab, setActiveTab] = useState('problem');
  type Submission = { id: number; timestamp: Date; language: string; code: string; score: number; status: string };
  const [submissionHistory, setSubmissionHistory] = useState<Submission[]>([]);

  const languages = [
    { id: 'python', name: 'Python', version: '3.9' },
    { id: 'javascript', name: 'JavaScript', version: 'Node 18' },
    { id: 'java', name: 'Java', version: '17' },
    { id: 'cpp', name: 'C++', version: '17' },
    { id: 'go', name: 'Go', version: '1.19' },
    { id: 'rust', name: 'Rust', version: '1.65' }
  ];

  const testCases = [
    { id: 1, input: "[2,7,11,15], 9", expected: "[0,1]", status: null },
    { id: 2, input: "[3,2,4], 6", expected: "[1,2]", status: null },
    { id: 3, input: "[3,3], 6", expected: "[0,1]", status: null }
  ];

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate API call to code execution service
    setTimeout(() => {
      const results = testCases.map(test => ({
        ...test,
        status: Math.random() > 0.3 ? 'passed' : 'failed',
        actualOutput: Math.random() > 0.3 ? test.expected : '[0,2]',
        executionTime: Math.floor(Math.random() * 100) + 10
      }));
      
      setTestResults(results);
      setOutput('Code executed successfully!');
      setIsRunning(false);
      
      // Generate AI analysis after execution
      generateAIAnalysis(results);
    }, 2000);
  };

  const generateAIAnalysis = (results: TestResult[]) => {
    const passedTests = results.filter(r => r.status === 'passed').length;
    const totalTests = results.length;
    const score = Math.floor((passedTests / totalTests) * 100);
    
    const analysis = {
      score: score,
      grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : 'C',
      codeQuality: {
        readability: Math.floor(Math.random() * 30) + 70,
        efficiency: Math.floor(Math.random() * 40) + 60,
        maintainability: Math.floor(Math.random() * 25) + 75,
        bestPractices: Math.floor(Math.random() * 35) + 65
      },
      algorithmAnalysis: {
        approach: "Hash Table",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        isOptimal: score >= 80
      },
      strengths: [
        "Good use of hash table for O(1) lookup",
        "Clean and readable code structure",
        "Proper handling of edge cases"
      ],
      weaknesses: score < 80 ? [
        "Could add more comprehensive error handling",
        "Variable names could be more descriptive"
      ] : [],
      suggestions: [
        {
          type: "optimization",
          title: "Code Readability",
          description: "Consider adding comments to explain the hash table approach",
          priority: "medium"
        },
        {
          type: "best-practice",
          title: "Input Validation",
          description: "Add validation for empty arrays or invalid inputs",
          priority: "low"
        }
      ],
      overallSummary: score >= 80 ? 
        "Excellent solution! Your hash table approach is optimal with O(n) time complexity. The code is clean and handles the basic cases well. Consider adding input validation for production code." :
        "Good attempt! Your logic is on the right track. Focus on handling edge cases and optimizing the algorithm. The hash table approach would improve efficiency significantly.",
      conceptsUsed: ["Hash Tables", "Array Iteration", "Two Pointers"],
      conceptsToLearn: score < 80 ? ["Hash Table Optimization", "Edge Case Handling"] : ["Advanced Data Structures"],
      similarProblems: ["Three Sum", "Two Sum II", "4Sum"]
    };
    
    setAiAnalysis(analysis);
  };

  const handleSubmit = async () => {
    await handleRunCode();
    
    // Add to submission history
    const newSubmission = {
      id: submissionHistory.length + 1,
      timestamp: new Date(),
      language: selectedLanguage,
      code: code,
      score: aiAnalysis?.score || 0,
      status: ((aiAnalysis?.score ?? 0) >= 70) ? 'Accepted' : 'Wrong Answer'
    };
    
    setSubmissionHistory([newSubmission, ...submissionHistory]);
  };

  const QualityBar: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = "blue" }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-900">{currentProblem.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              currentProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentProblem.difficulty}
            </span>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-4 mt-4">
            {[
              { id: 'problem', name: 'Problem', icon: Code },
              { id: 'hints', name: 'Hints', icon: Lightbulb },
              { id: 'submissions', name: 'Submissions', icon: Clock }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'problem' && (
            <div className="space-y-6">
              {/* Problem Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{currentProblem.description}</p>
              </div>

              {/* Examples */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Examples</h3>
                {currentProblem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="font-mono text-sm">
                      <div className="mb-2">
                        <span className="text-gray-600">Input:</span> {example.input}
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-600">Output:</span> {example.output}
                      </div>
                      {example.explanation && (
                        <div className="text-gray-600 text-xs mt-2">
                          <span className="font-sans font-medium">Explanation:</span> {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Constraints</h3>
                <ul className="space-y-1">
                  {currentProblem.constraints.map((constraint, index) => (
                    <li key={index} className="text-gray-700 text-sm font-mono">
                      • {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'hints' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Hints</h3>
              </div>
              {currentProblem.hints.map((hint, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">{hint}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Submission History</h3>
              {submissionHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No submissions yet. Submit your first solution!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissionHistory.map((submission) => (
                    <div key={submission.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${
                            submission.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className="font-medium text-gray-900">{submission.status}</span>
                          <span className="text-sm text-gray-500">• {submission.language}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {submission.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Score: {submission.score}% • Grade: {aiAnalysis?.grade || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor and Results */}
      <div className="w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name} {lang.version}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Editor Actions */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 bg-gray-900">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>

        {/* Results Panel */}
        <div className="h-1/2 bg-white border-t border-gray-200 flex flex-col">
          {/* Results Tabs */}
          <div className="border-b border-gray-200 p-2">
            <div className="flex space-x-4">
              <button className="px-3 py-1 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                Test Results
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900">
                AI Analysis
              </button>
            </div>
          </div>

          {/* Results Content */}
          <div className="flex-1 overflow-auto p-4">
            {!testResults.length && !aiAnalysis ? (
              <div className="text-center py-8 text-gray-500">
                <Play className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Run your code to see results here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Test Results */}
                {testResults.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Test Cases</h4>
                    <div className="space-y-2">
                      {testResults.map((result) => (
                        <div key={result.id} className={`p-3 rounded-lg border ${
                          result.status === 'passed' 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {result.status === 'passed' ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className="font-medium text-gray-900">Test Case {result.id}</span>
                            </div>
                            <span className="text-xs text-gray-500">{result.executionTime}ms</span>
                          </div>
                                                      <div className="text-sm font-mono">
                            <div className="text-gray-600 mb-1">Input: {result.input}</div>
                            <div className="text-gray-600 mb-1">Expected: {result.expected}</div>
                            {result.status === 'failed' && (
                              <div className="text-red-600">Actual: {result.actualOutput}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Analysis */}
                {aiAnalysis && (
                  <div className="space-y-4">
                    {/* Score and Grade */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">AI Analysis</h3>
                            <p className="text-sm text-gray-600">Powered by advanced code analysis</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{aiAnalysis.score}%</div>
                          <div className={`text-lg font-semibold ${
                            aiAnalysis.grade.startsWith('A') ? 'text-green-600' :
                            aiAnalysis.grade.startsWith('B') ? 'text-blue-600' :
                            'text-orange-600'
                          }`}>
                            Grade {aiAnalysis.grade}
                          </div>
                        </div>
                      </div>

                      {/* Overall Summary */}
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{aiAnalysis.overallSummary}</p>
                      </div>

                      {/* Algorithm Analysis */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-2">Algorithm</h5>
                          <p className="text-gray-700 text-sm">{aiAnalysis.algorithmAnalysis.approach}</p>
                          <div className="mt-2 space-y-1">
                            <div className="text-xs text-gray-600">
                              Time: {aiAnalysis.algorithmAnalysis.timeComplexity}
                            </div>
                            <div className="text-xs text-gray-600">
                              Space: {aiAnalysis.algorithmAnalysis.spaceComplexity}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-2">Optimization</h5>
                          <div className="flex items-center space-x-2">
                            {aiAnalysis.algorithmAnalysis.isOptimal ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="text-sm text-gray-700">
                              {aiAnalysis.algorithmAnalysis.isOptimal ? 'Optimal' : 'Can be optimized'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Code Quality Metrics */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Code Quality</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <QualityBar 
                            label="Readability" 
                            value={aiAnalysis.codeQuality.readability} 
                            color="green"
                          />
                          <QualityBar 
                            label="Efficiency" 
                            value={aiAnalysis.codeQuality.efficiency} 
                            color="blue"
                          />
                        </div>
                        <div>
                          <QualityBar 
                            label="Maintainability" 
                            value={aiAnalysis.codeQuality.maintainability} 
                            color="purple"
                          />
                          <QualityBar 
                            label="Best Practices" 
                            value={aiAnalysis.codeQuality.bestPractices} 
                            color="yellow"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Strengths and Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Strengths */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-3 flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Strengths</span>
                        </h4>
                        <ul className="space-y-2">
                          {aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="text-green-800 text-sm flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Areas for Improvement */}
                      {aiAnalysis.weaknesses.length > 0 && (
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                          <h4 className="font-medium text-orange-900 mb-3 flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>Areas to Improve</span>
                          </h4>
                          <ul className="space-y-2">
                            {aiAnalysis.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-orange-800 text-sm flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Suggestions */}
                    {aiAnalysis.suggestions.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-3 flex items-center space-x-2">
                          <Lightbulb className="w-4 h-4" />
                          <span>AI Suggestions</span>
                        </h4>
                        <div className="space-y-3">
                          {aiAnalysis.suggestions.map((suggestion, index) => (
                            <div key={index} className="bg-white rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 text-sm">{suggestion.title}</h5>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                                  suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {suggestion.priority}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{suggestion.description}</p>
                              {suggestion.codeExample && (
                                <div className="mt-2 bg-gray-900 rounded p-2 text-green-400 font-mono text-xs">
                                  {suggestion.codeExample}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Insights */}
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-medium text-purple-900 mb-3 flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Learning Insights</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-purple-900 text-sm mb-2">Concepts Used</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiAnalysis.conceptsUsed.map((concept, index) => (
                              <span key={index} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-purple-900 text-sm mb-2">Next to Learn</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiAnalysis.conceptsToLearn.map((concept, index) => (
                              <span key={index} className="bg-white text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-200">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-medium text-purple-900 text-sm mb-2">Similar Problems</h5>
                        <div className="flex flex-wrap gap-2">
                          {aiAnalysis.similarProblems.map((problem, index) => (
                            <button
                              key={index}
                              className="bg-white hover:bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full border border-purple-200 transition-colors"
                            >
                              {problem}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Achievement */}
                    {aiAnalysis.score >= 80 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-yellow-900">Achievement Unlocked!</h4>
                            <p className="text-yellow-800 text-sm">
                              {aiAnalysis.score >= 95 ? 'Perfect Solution Master' :
                               aiAnalysis.score >= 90 ? 'Excellent Problem Solver' :
                               'Good Solution Writer'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICodeEditor;