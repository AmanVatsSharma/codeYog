CodeYog – A Coding Tapasya Platform


🧩 Features Breakdown
👨‍💻 For Users:
Signup / Login (NextAuth)

Browse problem sets by category / difficulty

Code editor (Monaco / CodeMirror)

Language select dropdown

“Run” and “Submit” buttons

Get output / errors below

See explanations, hints if needed

🧑‍🏫 For Admin (YOU):
Login to /admin/dashboard

Add new problems (title, description, difficulty, test cases, tags)

Edit existing problems

View submissions, activity

🔐 Backend:
Next.js API Routes / or NestJS (for heavy processing)

Use Dockerized Sandboxing or use JDoodle API / Piston API to run untrusted code

MongoDB/PostgreSQL to store:

Problems

Test cases

Users

Submissions

🛠 Tech Stack
Part	Tech
Frontend	Next.js + Tailwind + shadcn/ui
Code Editor	Monaco Editor / CodeMirror
Backend	Next.js API Routes or NestJS
DB	MongoDB / PostgreSQL
Auth	NextAuth.js (Google, GitHub, Email)
Code Exec	Piston API / Docker sandbox
Hosting	Vercel + Railway (or Render backend)

✅ MVP Plan (Start Simple, Scale Fast)
Phase 1: MVP
 Auth (GitHub or Email)

 User dashboard with list of coding problems

 Admin dashboard to add problems

 Code editor + Run (use Piston API)

 View Output below editor
