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

document.addEventListener('DOMContentLoaded', function() {
  // Automatically cycle to next mode when popup is opened
  cycleMode();
});

function cycleMode() {
  // Get current mode by examining the URL directly
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      let url = tabs[0].url;
      let currentMode = 'no-debug';
      
      // Determine current mode from URL
      if (url.includes('?debug=1') || url.includes('&debug=1')) {
        currentMode = 'normal-debug';
      } else if (url.includes('?debug=assets') || url.includes('&debug=assets')) {
        currentMode = 'assets-debug';
      } else if (url.includes('?debug=0') || url.includes('&debug=0')) {
        currentMode = 'no-debug';
      }
      
      // Determine next mode in sequence
      let nextMode;
      let nextModeText;
      
      if (currentMode === 'no-debug') {
        nextMode = 'normal-debug';
        nextModeText = 'Normal Debug';
      } else if (currentMode === 'normal-debug') {
        nextMode = 'assets-debug';
        nextModeText = 'Debug Assets';
      } else {
        nextMode = 'no-debug';
        nextModeText = 'No Debug';
      }
      
      // Update next mode text in popup
      document.getElementById('nextMode').textContent = nextModeText;
      
      // Update the current tab with the new debug parameter
      let newUrl;
      let urlWithoutFragment = url;
      let fragment = '';
      
      // Extract fragment if it exists
      if (url.includes('#')) {
        let fragmentIndex = url.indexOf('#');
        urlWithoutFragment = url.substring(0, fragmentIndex);
        fragment = url.substring(fragmentIndex);
      }
      
      if (nextMode === 'no-debug') {
        // Remove debug parameters
        newUrl = urlWithoutFragment.replace(/[?&]debug=(\w*)/g, '');
      } else if (nextMode === 'normal-debug') {
        // Add or update debug=1
        if (urlWithoutFragment.includes('?')) {
          newUrl = urlWithoutFragment.replace(/[?&]debug=(\w*)/g, '');
          if (newUrl.includes('?')) {
            newUrl = newUrl + '&debug=1';
          } else {
            newUrl = newUrl + '?debug=1';
          }
        } else {
          newUrl = urlWithoutFragment + '?debug=1';
        }
      } else if (nextMode === 'assets-debug') {
        // Add or update debug=assets
        if (urlWithoutFragment.includes('?')) {
          newUrl = urlWithoutFragment.replace(/[?&]debug=(\w*)/g, '');
          if (newUrl.includes('?')) {
            newUrl = newUrl + '&debug=assets';
          } else {
            newUrl = newUrl + '?debug=assets';
          }
        } else {
          newUrl = urlWithoutFragment + '?debug=assets';
        }
      }
      
      // Add the fragment back to the URL
      newUrl = newUrl + fragment;
      
      // Navigate to the new URL
      chrome.tabs.update(tabs[0].id, {url: newUrl});
      
      // Update the extension icon
      updateIcon(nextMode);
      
      // Close popup after 2 seconds (2000 milliseconds)
      setTimeout(function() {
        window.close();
      }, 2000);
    }
  });
}

function updateIcon(mode) {
  let iconPath = 'icons/icon16-disable.png'; // default icon
  
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