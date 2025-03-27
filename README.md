
# The Abel Experience™

A mythologized, terminal-style personal site documenting greentexts, alter egos, and personal archives. Built as a mobile-first full-stack web application with long-term support for personal tools, private journaling, and rich self-expression.

## Tech Stack

| Layer     | Tool / Framework              |
|-----------|-------------------------------|
| Frontend  | React + TailwindCSS           |
| Backend   | Node.js + Express             |
| Database  | PostgreSQL + Sequelize ORM    |
| Hosting   | Local for now (Render planned)|
| Styling   | Terminal aesthetic, ASCII text|

## Features (Completed So Far)

- React + Tailwind frontend with mobile-first layout
- Express API server with PostgreSQL connection
- Sequelize setup with:
  - `Greentext` model (title, content, volume, date)
  - `BlessingItem` model (for “Life is X, Y and Z, but at least I have…” section)
  - Many-to-many join: `GreentextBlessings`
- GET and POST API routes for:
  - Fetching all greentexts (with blessings)
  - Creating greentexts and associated blessings
- Connected frontend and backend (confirmed with real-time fetch)
- Terminal-inspired UI components in progress

## Project Structure

```
abel-experience/
├── client/          # React frontend
│   ├── src/
│   │   ├── App.js   # Greentext display
│   │   └── index.js
│   └── tailwind.config.js
│
├── server/          # Express backend
│   ├── index.js     # API entry point
│   ├── config/      # DB config
│   ├── models/      # Sequelize models
│   └── api/         # Greentext & Blessings API routes
│
└── README.md
```

## API Routes

### GET /api/greentexts

Returns all greentexts with their “at least I have” blessing items.

### POST /api/greentexts

Creates a new greentext entry with optional blessings.

Example request body:
```json
{
  "title": "Tortilla Machine Broke",
  "content": "> be me\n> 5am\n> machine broke again",
  "volume": "Volume I",
  "date": "2025-03-25",
  "blessings": ["Wendy", "La Gatilla", "The Strokes"]
}
```

### GET /api/blessings

Returns all existing blessing items in the database.

## Next Features

- Terminal Console (triggered by ~ key)
- Alter Ego Archives
- Greentext generator with glossary and blessing picker
- Hidden admin login
- Glossary system and linked references
- Favorites and filterable catalogue
- Personal dashboard (gym log, media checklist, journal)

## Getting Started

### Backend (Express)

```bash
cd server
npm install
node index.js
```

### Frontend (React)

```bash
cd client
npm install
npm start
```

Ensure PostgreSQL is running and your .env is configured:

```
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=abel_experience
DB_HOST=localhost
```

## Project Philosophy

This project is more than a website. It is a dynamic archive of reflection, myth, suffering, humor, and evolving identity. Each component represents a voice of Abel—personal, symbolic, or exaggerated—blending storytelling with technology.
