# Car Demo System - Frontend Applications

This repository contains the frontend applications for the car demo system.

## Components

- **A1-car-user-app**: React Native mobile application for car users
- **A2-rental-staff-app**: React web application for rental service staff

## Quick Start

```bash
# Install dependencies for both apps
npm run install-all

# Start development servers
npm run dev-all

# Or start individual apps
cd A1-car-user-app && npm start  # Mobile app (Expo)
cd A2-rental-staff-app && npm start  # Web app
```

## Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI (for mobile app)
- Backend services running (see car-demo-backend repository)

## Service Dependencies

These frontend applications require the backend API server:
- **A1 & A2** → Backend API: `http://localhost:3001`

## Environment Configuration

Copy `.env.example` to `.env` in each app directory and configure:
- API endpoints
- Environment-specific settings

## Testing

```bash
npm run test-all
```

## Build

```bash
npm run build-all
```

## Architecture

- **A1**: React Native (Expo) - Cross-platform mobile app
- **A2**: React (Create React App) - Web application
- Both apps communicate with B1 web server API
- Material UI for consistent styling
- Axios for API communication

## Test Data

Use these license plates for testing:
- ABC-123 (John Doe)
- XYZ-789 (Jane Smith)  
- DEF-456 (Mike Johnson)
