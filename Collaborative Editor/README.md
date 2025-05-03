# Collaborative Editor

A real-time collaborative text editor application built with React and WebSocket.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies for both server and client:

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install


## Starting the Application

The application requires both the server and client to be running simultaneously. You'll need two terminal windows.

### Terminal 1 - Start the Server
# From the root directory
node server.js

The server will start on port 5002.

### Terminal 2 - Start the Client
# Navigate to the client directory
cd client

# Start the React development server
npm start

The client will start on http://localhost:3000

## Accessing the Application

Once both servers are running:
- Open your web browser
- Navigate to http://localhost:3000
- The application should load automatically

## Development Notes

- The server runs on port 5002
- The client runs on port 3000
- The development build is not optimized. For production, use `npm run build` in the client directory
- You can view the application on your local network at http://172.20.10.2:3000 (your IP may vary)

## Stopping the Application

To stop the application:
1. Press `Ctrl + C` in each terminal window to stop both servers
2. Close the browser window 