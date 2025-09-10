#!/bin/bash

# Storybook Helper Script
# This script manages the Storybook setup for the React Router 7 project

VITE_CONFIG="vite.config.ts"
VITE_BACKUP="vite.config.ts.bak"

case "$1" in
  "start")
    echo "🚀 Starting Storybook..."
    
    # Check if vite config exists and backup if needed
    if [ -f "$VITE_CONFIG" ] && [ ! -f "$VITE_BACKUP" ]; then
      echo "📦 Backing up vite.config.ts..."
      mv "$VITE_CONFIG" "$VITE_BACKUP"
    fi
    
    echo "▶️  Launching Storybook on http://localhost:6006"
    npm run storybook
    ;;
    
  "stop")
    echo "⏹️  Stopping Storybook..."
    pkill -f storybook
    
    # Restore vite config if backup exists
    if [ -f "$VITE_BACKUP" ] && [ ! -f "$VITE_CONFIG" ]; then
      echo "🔄 Restoring vite.config.ts..."
      mv "$VITE_BACKUP" "$VITE_CONFIG"
    fi
    
    echo "✅ Storybook stopped and vite config restored"
    ;;
    
  "build")
    echo "🏗️  Building Storybook..."
    
    # Backup vite config if needed
    if [ -f "$VITE_CONFIG" ] && [ ! -f "$VITE_BACKUP" ]; then
      echo "📦 Backing up vite.config.ts..."
      mv "$VITE_CONFIG" "$VITE_BACKUP"
    fi
    
    npm run build-storybook
    
    # Restore vite config
    if [ -f "$VITE_BACKUP" ]; then
      echo "🔄 Restoring vite.config.ts..."
      mv "$VITE_BACKUP" "$VITE_CONFIG"
    fi
    
    echo "✅ Storybook built successfully in storybook-static/"
    ;;
    
  "clean")
    echo "🧹 Cleaning up Storybook files..."
    
    # Restore vite config if backup exists
    if [ -f "$VITE_BACKUP" ]; then
      echo "🔄 Restoring vite.config.ts..."
      mv "$VITE_BACKUP" "$VITE_CONFIG"
    fi
    
    # Stop any running storybook processes
    pkill -f storybook 2>/dev/null || true
    
    echo "✅ Cleanup complete"
    ;;
    
  *)
    echo "📚 Storybook Helper Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start   - Start Storybook dev server"
    echo "  stop    - Stop Storybook and restore config"
    echo "  build   - Build static Storybook"
    echo "  clean   - Clean up and restore original config"
    echo ""
    echo "Examples:"
    echo "  $0 start    # Start development server"
    echo "  $0 stop     # Stop server and cleanup"
    echo "  $0 build    # Build for production"
    echo ""
    echo "Storybook will be available at: http://localhost:6006"
    ;;
esac
