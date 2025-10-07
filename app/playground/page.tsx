"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, Save, Share2, Download, Settings, RotateCcw, 
  ChevronDown, Code, Terminal, FileText, Zap
} from 'lucide-react';
import { cn } from '@/components/lib/utils';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-900">
      <div className="text-white">Loading editor...</div>
    </div>
  ),
});

const PlaygroundPage = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`# Write your code here
def hello_world():
    print("Hello, CodeYog!")
    
hello_world()`);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { id: 'python', name: 'Python', version: '3.11', template: '# Write your code here\nprint("Hello, World!")' },
    { id: 'javascript', name: 'JavaScript', version: 'Node 20', template: '// Write your code here\nconsole.log("Hello, World!");' },
    { id: 'typescript', name: 'TypeScript', version: '5.0', template: '// Write your code here\nconsole.log("Hello, World!");' },
    { id: 'java', name: 'Java', version: '17', template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
    { id: 'cpp', name: 'C++', version: '20', template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
    { id: 'go', name: 'Go', version: '1.21', template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
    { id: 'rust', name: 'Rust', version: '1.75', template: 'fn main() {\n    println!("Hello, World!");\n}' },
  ];

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          code,
          stdin,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOutput(result.output || result.stdout || 'No output');
        if (result.stderr) {
          setOutput(prev => prev + '\n\nErrors:\n' + result.stderr);
        }
      } else {
        setOutput(`Error: ${result.error || 'Execution failed'}\n${result.stderr || ''}`);
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message || 'Failed to execute code'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    const lang = languages.find(l => l.id === newLang);
    if (lang) {
      setLanguage(newLang);
      setCode(lang.template);
    }
  };

  const handleReset = () => {
    const lang = languages.find(l => l.id === language);
    if (lang) {
      setCode(lang.template);
      setStdin('');
      setOutput('');
    }
  };

  const handleDownload = () => {
    const lang = languages.find(l => l.id === language);
    const extension = {
      python: 'py',
      javascript: 'js',
      typescript: 'ts',
      java: 'java',
      cpp: 'cpp',
      go: 'go',
      rust: 'rs',
    }[language] || 'txt';
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell withSidebar={false}>
      <div className="space-y-4">
        {/* Header */}
        <div className="surface elevate rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Code Playground</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test and run code in any language instantly
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                Save
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={handleDownload}>
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-280px)]">
          {/* Code Editor */}
          <div className="lg:col-span-2 surface rounded-xl overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Code className="w-4 h-4" />
                <span className="font-medium">Editor</span>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="surface border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name} {lang.version}
                    </option>
                  ))}
                </select>
                <Button variant="ghost" size="sm" leftIcon={<RotateCcw className="w-4 h-4" />} onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  size="sm"
                  leftIcon={<Play className="w-4 h-4" />}
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
              <Editor
                height="100%"
                language={languages.find(l => l.id === language)?.id || 'python'}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>

          {/* Input/Output Panel */}
          <div className="space-y-4">
            {/* Input */}
            <Card className="h-1/2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Input (stdin)</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setStdin('')}>
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)]">
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  className="w-full h-full p-3 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none rounded-lg"
                  placeholder="Enter input here (one value per line)..."
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Output */}
            <Card className="h-1/2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Output</span>
                  </CardTitle>
                  {isRunning && (
                    <div className="flex items-center space-x-2 text-xs text-blue-600">
                      <Zap className="w-3 h-3 animate-pulse" />
                      <span>Executing...</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)]">
                <div className="w-full h-full p-3 bg-gray-900 text-green-400 font-mono text-sm overflow-auto rounded-lg whitespace-pre-wrap">
                  {output || 'Output will appear here...'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 grid place-items-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">8+ Languages</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Full language support</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 grid place-items-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Instant Execution</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fast code execution</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 grid place-items-center">
                  <Share2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Share & Save</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Share your code</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default PlaygroundPage;
