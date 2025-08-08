# PingPong

A real-time chat room application built with React (Vite), Tailwind CSS, Jotai for state management, and a WebSocket backend. Users can join different rooms, set their name, and chat live with others.

## Features
- Multiple chat rooms
- Name prompt when joining or switching rooms
- Real-time messaging via WebSocket
- Responsive UI styled with Tailwind CSS
- Environment-based backend configuration

## Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/dotbillu/PingPong
cd PingPong
```

### 2. Setup Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_WS_URL=ws://localhost:8000
```
Replace the value with your backend WebSocket URL if different.

### 3. Install Dependencies
#### Client
```bash
cd client
npm install
```
#### Backend
(Setup your backend as required. Make sure it runs on the URL specified in `.env`.)

### 4. Run the Project
#### Start Backend
Follow your backend setup instructions (e.g., `npm start`, `python server.py`, etc.)

#### Start Client
```bash
cd client
npm run dev
```
The client will be available at [http://localhost:5173](http://localhost:5173) by default.

## Usage
- Click "Rooms ▾" to select or change a chat room.
- Enter your name in the popup to join the room.
- Start chatting!

## Development
- All backend URLs are managed via the `.env` file for easy switching between environments.
- UI is styled with Tailwind CSS for rapid customization.
- State management uses Jotai for simplicity and performance.

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes before submitting a PR.

## License
MIT
