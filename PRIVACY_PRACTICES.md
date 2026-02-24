# Privacy Practices

## activeTab Permission

**Justification:** The `activeTab` permission is required to detect the current Odoo debug mode from the URL and update it when the user presses the keyboard shortcut (Ctrl+.) or clicks the extension icon.

**Data Usage:** The extension only accesses the URL of the currently active tab. No user data is stored, transmitted, or shared. The URL is processed locally to:
1. Detect current debug mode (`debug=1` or `debug=assets`)
2. Update the debug mode parameter when toggling

**Compliance:** This extension complies with Chrome Web Store Developer Program Policies. No personal data is collected or stored.
