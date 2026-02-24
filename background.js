// Odoo Debug Mode Toggle Extension
// Copyright (c) 2026 BizzAppDev Systems
// Created with assistance from opencode (model: QWEN3-coder)
//
// This extension helps manage Odoo debug modes:
// - No debug
// - Normal debug (debug=1)
// - Debug assets (debug=assets)
//
// License: MIT

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Detect initial debug mode from URL
    detectDebugMode(tab.url);
  }
});

// Handle when a new tab is created
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url) {
    detectDebugMode(tab.url);
  }
});

function detectDebugMode(url) {
  let debugMode = 'no-debug'; // default to no debug mode
  
  if (url.includes('?debug=1') || url.includes('&debug=1')) {
    debugMode = 'normal-debug';
  } else if (url.includes('?debug=assets') || url.includes('&debug=assets')) {
    debugMode = 'assets-debug';
  } else if (url.includes('?debug=0') || url.includes('&debug=0')) {
    debugMode = 'no-debug';
  }
  
  // Update the extension icon based on detected mode
  updateIcon(debugMode);
}

function updateIcon(mode) {
  let iconPath = 'icons/icon16.png'; // default icon
  
  switch (mode) {
    case 'no-debug':
      iconPath = 'icons/icon16-disable.png';
      break;
    case 'normal-debug':
      iconPath = 'icons/icon16-debug.png';
      break;
    case 'assets-debug':
      iconPath = 'icons/icon16-assets.png';
      break;
  }
  
  chrome.action.setIcon({
    path: iconPath
  });
}