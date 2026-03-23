#!/bin/bash
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Listing node_modules/.bin:"
ls -la node_modules/.bin/ || echo "No node_modules/.bin directory"
echo "Vite binary permissions:"
ls -la node_modules/.bin/vite || echo "Vite binary not found"
echo "Running build..."
npm run build