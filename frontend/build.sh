#!/bin/bash
# Simple build script for Vercel deployment
echo "Starting build process..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the project
echo "Building project..."
npx vite build

echo "Build completed successfully!"