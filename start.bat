@echo off
echo Starting Content Hunter Backend...
start cmd /k "npm run server"

echo Starting Content Hunter Frontend...
start cmd /k "npm run dev"

echo Both servers are starting up! The website will open in your browser shortly.
