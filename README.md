# Spotify Mood Evaluator UI

A React/TypeScript web application that analyzes Spotify playlists to determine their overall mood based on audio features. The app provides insights into playlist composition and highlights songs that share similar characteristics.

## Overview

The Playlist Mood Evaluator connects to your Spotify account, fetches your playlists, and analyzes them using Spotify's Audio Features API. It calculates an overall mood for the playlist and identifies the top contributing tracks based on six key audio feature categories:

- **Danceability** - Suitability for dancing based on tempo, rhythm, and beat
- **Energy** - Intensity and activity level of tracks
- **Speechiness** - Presence of spoken words
- **Acousticness** - Confidence that the track is acoustic
- **Instrumentalness** - Likelihood of no vocal content
- **Valence** - Musical positiveness (happy vs. sad)

## Features

- Spotify OAuth 2.0 authentication
- Playlist selection and analysis
- Interactive mood display with visual indicators
- Detailed track breakdown in sortable data grid
- Responsive design with beautiful synthwave-themed UI
- Scroll-based navigation between mood summary and track details

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: TanStack Query (React Query) v5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Error Handling**: React Error Boundary
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Spotify Developer account with API credentials

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/spotify-mood-evaluator-ui.git
cd spotify-mood-evaluator-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Backend API

This frontend connects to a backend API. By default:

- **Development**: `http://127.0.0.1:8000`
- **Production**: `https://api.playlistmoodevaluator.com`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── api/                    # API hooks and Axios configuration
├── assets/                 # Images and wallpapers
├── auth/                   # Authentication logic and OAuth callback
├── common/                 # Reusable components and utilities
├── views/                  # Page components
│   ├── about/             # About page
│   ├── error/             # Error pages
│   ├── home/              # Playlist selection
│   ├── login/             # Login page
│   └── mood/              # Mood display and track grid
├── App.tsx                # Main app component with routing
├── ThemeWrapper.tsx       # MUI theme configuration
└── index.tsx             # App entry point
```

## Application Flow

1. **Login** - User authenticates with Spotify OAuth
2. **Home** - User selects a playlist from their Spotify library
3. **Mood Display** - App analyzes playlist and displays:
   - Overall mood classification
   - Top audio feature categories
   - Top contributing tracks with detailed metrics
4. **About** - Information about the application and developer

## License

This project is private and not licensed for public use.

## Author

Developed by Troy Prebenda

## Acknowledgments

- Spotify Web API for audio features data
- Material-UI for the component library
- Create React App for the initial setup
