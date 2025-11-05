# A2 - Rental Service Staff Web App

React web application for rental service staff to monitor and manage car fleet.

## Features

- Search cars by license plate
- Real-time temperature monitoring with charts
- GPS location tracking
- Car owner and service information
- Remote command sending (heating, service mode)
- Temperature history visualization
- Auto-refresh every 30 seconds

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure B1 web server is running on localhost:3001

3. Start the development server:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

## Features

### Dashboard
- Real-time car data display
- Temperature monitoring with color-coded status
- GPS coordinates
- Owner information

### Temperature History
- 24-hour temperature chart
- Indoor vs outdoor temperature comparison

### Remote Commands
- Start heating command
- Service mode activation

## API Dependencies

- Requires B1 web server running on localhost:3001
- Endpoints:
  - GET /api/car/{licensePlate} - Get car data
  - POST /api/car/{licensePlate}/command - Send commands

## Test License Plates

- ABC-123
- XYZ-789
- DEF-456