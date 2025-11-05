#!/bin/bash
set -e

echo "Starting Frontend Development Environment..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start both applications
echo "Starting A1 (Mobile) and A2 (Web) applications..."
npm run dev-all
