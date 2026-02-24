# Odoo Debug Extension - Agent Guide

## Project Overview
Chrome Extension for toggling Odoo debug modes (No debug, Normal debug `debug=1`, Debug assets `debug=assets`).

## Build/Lint/Test Commands
- No build system required (vanilla Chrome extension)
- No test framework configured
- For debugging: Load extension in Chrome via `chrome://extensions` → Enable Developer Mode → Load unpacked

## Code Style Guidelines

### JavaScript
- Use ES6+ features (arrow functions, template literals, destructuring)
- Function declarations preferred over expressions
- Use single quotes for strings
- Use `const`/`let` instead of `var`
- Avoid global scope pollution
- Line length: max 80 characters
- Indentation: 2 spaces
- Add trailing commas for multi-line objects/arrays

### Naming Conventions
- Functions: camelCase (`detectDebugMode`, `updateIcon`)
- Variables: camelCase (`debugMode`, `iconPath`, `nextMode`)
- CSS classes: kebab-case (`next-mode`, `spinner`)
- Constants: UPPER_SNAKE_CASE (if defined)

### Imports/Modules
- Chrome extension APIs: use `chrome.*` globals (`chrome.tabs`, `chrome.action`)
- No ES6 imports/exports used (browser extension with manifest V3)

### Error Handling
- Chrome APIs use callback pattern: always check for errors
- URL parsing: use string methods (`includes`, `indexOf`, `replace`)
- No try-catch blocks currently used

### HTML/CSS
- Inline styles in popup.html (minimal, for popup UI only)
- Use semantic HTML elements
- CSS: inline styles preferred for popup

### Comments
- Add block comments for file header and function descriptions
- Document parameters and return values for complex functions
- Comment code logic, not what's obvious

## Chrome Extension Specifics
- Manifest V3 (service worker, action API)
- Permissions: `activeTab` only
- Icons: 16px, 48px, 128px in `/icons` directory
- Popup auto-closes after 2 seconds

## Git Workflow
- Branch: `main` or `master` (both exist)
- Commit message should describe the change clearly
