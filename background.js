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
    detectDebugMode(tab.url);
  }
});

// Handle when a new tab is created
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url) {
    detectDebugMode(tab.url);
  }
});

// Listen for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-debug-mode') {
    toggleDebugMode();
  }
});

function detectDebugMode(url) {
  let debugMode = 'no-debug';

  if (url.includes('?debug=1') || url.includes('&debug=1')) {
    debugMode = 'normal-debug';
  } else if (url.includes('?debug=assets') || url.includes('&debug=assets')) {
    debugMode = 'assets-debug';
  } else if (url.includes('?debug=0') || url.includes('&debug=0')) {
    debugMode = 'no-debug';
  }

  updateIcon(debugMode);
}

function updateIcon(mode) {
  let iconPath = 'icons/icon16.png';

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

function toggleDebugMode() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0] || !tabs[0].url) {
      return;
    }

    let url = tabs[0].url;
    let currentMode = 'no-debug';

    if (url.includes('?debug=1') || url.includes('&debug=1')) {
      currentMode = 'normal-debug';
    } else if (url.includes('?debug=assets') || url.includes('&debug=assets')) {
      currentMode = 'assets-debug';
    } else if (url.includes('?debug=0') || url.includes('&debug=0')) {
      currentMode = 'no-debug';
    }

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

    let newUrl;
    let urlWithoutFragment = url;
    let fragment = '';

    if (url.includes('#')) {
      let fragmentIndex = url.indexOf('#');
      urlWithoutFragment = url.substring(0, fragmentIndex);
      fragment = url.substring(fragmentIndex);
    }

    if (nextMode === 'no-debug') {
      newUrl = urlWithoutFragment.replace(/[?&]debug=(\w*)/g, '');
    } else if (nextMode === 'normal-debug') {
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

    newUrl = newUrl + fragment;

    chrome.tabs.update(tabs[0].id, {url: newUrl});
    updateIcon(nextMode);
  });
}
