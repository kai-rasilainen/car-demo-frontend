# A1 - Car User Mobile App

React Native mobile application for car users to view their car's temperature and location data.

## Features

- Enter license plate to fetch car data from B1 server
- View outdoor and indoor temperatures
- View GPS location
- View car owner and service information
- Auto-refresh data every 30 seconds
- Manual refresh option

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

4. Use Expo Go app to scan QR code or run on simulator:
```bash
npm run ios    # for iOS simulator
npm run android # for Android emulator
npm run web    # for web browser
```

## API Dependencies

- Requires B1 web server running on localhost:3001
- Endpoint: GET /api/car/{licensePlate}

## Test License Plates

- ABC-123
- XYZ-789
- DEF-456