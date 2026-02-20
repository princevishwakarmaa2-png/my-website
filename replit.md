# Tic-Tac-Toe Game

## Overview

A simple browser-based Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript. The game supports two modes: single-player (vs a bot) and two-player (local multiplayer). The entire application is client-side with no backend or database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend-Only Architecture
This is a purely static frontend application with no server, framework, or build tools. Everything runs directly in the browser.

- **`index.html`** — The main (and only) HTML page. Contains the game board (3x3 grid of divs), mode selection buttons (1 Player vs 2 Player), status display, reset button, and back-to-menu button.
- **`script.js`** — All game logic including board state management, turn handling, win condition checking, bot AI for single-player mode, and DOM manipulation. The game state is stored in a simple array of 9 elements.
- **`style.css`** — Styling with a dark theme using a red/black/blue gradient background. The board uses CSS Grid for layout.

### Key Design Decisions

1. **No framework or build system** — The project uses plain HTML/CSS/JS files served directly. This keeps things simple with zero dependencies. If extending, maintain this simplicity unless a framework becomes necessary.

2. **Game state management** — State is managed through module-level variables (`board` array, `currentPlayer`, `gameActive`, `gameMode`). There's no state management library.

3. **Bot implementation** — The single-player bot makes moves with a 500ms delay (via `setTimeout`) to simulate thinking. The bot plays as 'O' and the human plays as 'X'.

4. **Mode selection** — The UI toggles between a mode selection screen and the game board using `display: none/block/flex` rather than routing or page navigation.

### Important Notes

- The `script.js` and `style.css` files appear to be **truncated/incomplete**. The `makeMove` function in `script.js` is cut off mid-definition, and `style.css` ends mid-rule for `.cell`. These files need to be completed for the game to function properly.
- Missing functionality that likely needs implementation: win/draw detection logic, bot move strategy, game reset logic, proper cell styling completion, and result display.

## External Dependencies

**None.** This project has zero external dependencies — no npm packages, no CDNs, no APIs, no databases, no backend services. Everything is self-contained in three static files.

To run the project, simply serve the HTML file. On Replit, this can be done with a simple static file server or by opening `index.html` directly.