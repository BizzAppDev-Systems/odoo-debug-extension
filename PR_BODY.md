## Summary
This PR adds keyboard shortcut functionality to toggle Odoo debug modes.

## Changes
- Added `commands` permission to manifest.json with default shortcut `Ctrl+.` (Cmd+.` on Mac)
- Added `toggleDebugMode()` function to background.js for keyboard shortcut handling
- Refactored popup.js to use same toggle logic as background.js
- Maintained same visual feedback in popup (switching notification with spinner)

## Features
- Default shortcut: Ctrl+. (Cmd+.` on Mac)
- Same behavior as clicking extension icon
- Cycles debug mode: No debug → Normal debug → Debug assets → No debug
- Shows "Switching to..." notification with visual feedback
- Silently ignores shortcut press on non-Odoo tabs

## Testing
- Load extension in Chrome via chrome://extensions
- Press Ctrl+. (or Cmd+.` on Mac) to toggle debug mode
- Verify URL updates with correct debug parameter
- Verify icon updates to reflect current mode
- Verify popup shows same notification as before
