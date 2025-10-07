import { NextRequest, NextResponse } from 'next/server';

// Piston API endpoint
const PISTON_API = 'https://emkc.org/api/v2/piston';

export async function POST(request: NextRequest) {
  try {
    const { language, code, stdin = '', args = [] } = await request.json();

    // Language mappings from our IDs to Piston's language IDs
    const languageMap: Record<string, { language: string; version: string }> = {
      python: { language: 'python', version: '3.10.0' },
      javascript: { language: 'javascript', version: '18.15.0' },
      typescript: { language: 'typescript', version: '5.0.3' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'c++', version: '10.2.0' },
      go: { language: 'go', version: '1.16.2' },
      rust: { language: 'rust', version: '1.68.2' },
      csharp: { language: 'csharp', version: '6.12.0' },
    };

    const pistonLang = languageMap[language];
    
    if (!pistonLang) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // Execute code using Piston API
    const response = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: pistonLang.language,
        version: pistonLang.version,
        files: [
          {
            name: 'main',
            content: code,
          },
        ],
        stdin,
        args,
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Format the response
    return NextResponse.json({
      success: true,
      output: result.run.output || result.run.stdout || '',
      stderr: result.run.stderr || '',
      exitCode: result.run.code,
      executionTime: result.run.signal ? 'timeout' : 'N/A', // Piston doesn't provide execution time
      memory: 'N/A', // Piston doesn't provide memory usage
    });
  } catch (error) {
    console.error('Code execution error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to execute code',
        output: '',
        stderr: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch available runtimes from Piston
    const response = await fetch(`${PISTON_API}/runtimes`);
    const runtimes = await response.json();
    
    return NextResponse.json({
      success: true,
      runtimes: runtimes.map((runtime: any) => ({
        language: runtime.language,
        version: runtime.version,
        aliases: runtime.aliases,
      })),
    });
  } catch (error) {
    console.error('Failed to fetch runtimes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch available runtimes' },
      { status: 500 }
    );
  }
}
