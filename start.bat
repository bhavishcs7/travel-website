@echo off
echo Starting Content Hunter Backend...
start cmd /k "cd backend && npm run dev"

echo Starting Content Hunter Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting up! The website will open in your browser shortly.
