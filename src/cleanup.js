/**
 * Cookie and Storage Cleanup Utility
 * This script clears old cookies, localStorage, and sessionStorage entries
 * that might interfere with new URL structure and redirects.
 */

(function() {
  'use strict';
  
  /**
   * Clear all old cookies that might interfere with redirects
   */
  function clearAllOldCookies() {
    // Common old cookie names that might have been used
    const oldCookieNames = [
      'redirect_preference',
      'mobile_redirect', 
      'site_version',
      'user_preference',
      'mobile_version',
      'desktop_version',
      'layout_preference',
      'device_preference',
      'site_redirect',
      'page_redirect',
      'url_preference'
    ];
    
    oldCookieNames.forEach(name => {
      // Clear cookie for current path
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      // Clear cookie for current domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      // Clear cookie for www subdomain if applicable
      if (!window.location.hostname.startsWith('www.')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=www.${window.location.hostname};`;
      }
    });
    
    console.log('Cleared old cookies that might interfere with redirects');
  }
  
  /**
   * Clear old localStorage entries
   */
  function clearOldLocalStorage() {
    const oldStorageKeys = [
      'redirectUrl',
      'siteVersion', 
      'lastVisit',
      'mobileRedirect',
      'desktopRedirect',
      'userAgent',
      'deviceType',
      'layoutPreference',
      'sitePreference',
      'urlPreference',
      'pageVersion'
    ];
    
    oldStorageKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('Cleared old localStorage entries');
  }
  
  /**
   * Clear old sessionStorage entries (except current forceDesktop preference)
   */
  function clearOldSessionStorage() {
    const currentForceDesktop = sessionStorage.getItem('forceDesktop');
    
    const oldStorageKeys = [
      'redirectUrl',
      'siteVersion',
      'lastVisit', 
      'mobileRedirect',
      'desktopRedirect',
      'userAgent',
      'deviceType',
      'layoutPreference',
      'sitePreference',
      'urlPreference',
      'pageVersion'
    ];
    
    oldStorageKeys.forEach(key => {
      sessionStorage.removeItem(key);
    });
    
    // Restore the current forceDesktop preference if it existed
    if (currentForceDesktop) {
      sessionStorage.setItem('forceDesktop', currentForceDesktop);
    }
    
    console.log('Cleared old sessionStorage entries');
  }
  
  /**
   * Normalize and redirect old URLs to new clean format
   */
  function normalizeUrl() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const currentSearch = window.location.search;
    
    let needsRedirect = false;
    let newPath = currentPath;
    
    // Handle .html extension removal
    if (currentPath.endsWith('.html') && !isIndexHtml(currentPath)) {
      newPath = currentPath.replace('.html', '/');
      needsRedirect = true;
    }
    
    // Handle index.html in subdirectories
    if (currentPath.includes('/index.html') && currentPath !== '/index.html') {
      newPath = currentPath.replace('/index.html', '/');
      needsRedirect = true;
    }
    
    // Handle double slashes
    if (currentPath.includes('//')) {
      newPath = currentPath.replace(/\/+/g, '/');
      needsRedirect = true;
    }
    
    // Handle trailing slash consistency (add trailing slash to directories)
    if (!newPath.endsWith('/') && !newPath.includes('.') && newPath !== '/') {
      newPath = newPath + '/';
      needsRedirect = true;
    }
    
    if (needsRedirect) {
      const newUrl = newPath + currentSearch + currentHash;
      console.log(`Redirecting from ${currentPath} to ${newPath}`);
      window.location.replace(newUrl);
      return true;
    }
    
    return false;
  }
  
  /**
   * Check if path is an index.html that should be preserved
   */
  function isIndexHtml(path) {
    // Keep main index.html and mobile index.html as they are
    return path === '/index.html' || path === '/mobile/index.html';
  }
  
  /**
   * Clear browser cache metadata that might cause issues
   */
  function clearCacheMetadata() {
    // Clear any cache-related storage
    const cacheKeys = [
      'cacheVersion',
      'lastCacheUpdate',
      'staticResourcesVersion',
      'pageCache'
    ];
    
    cacheKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }
  
  /**
   * Main cleanup function
   */
  function performCleanup() {
    // First normalize the URL - if this causes a redirect, stop here
    if (normalizeUrl()) {
      return;
    }
    
    // Clear old storage that might interfere
    clearAllOldCookies();
    clearOldLocalStorage();
    clearOldSessionStorage();
    clearCacheMetadata();
    
    console.log('Site cleanup completed successfully');
  }
  
  // Run cleanup when script loads
  performCleanup();
  
  // Export functions for manual use if needed
  window.siteCleanup = {
    clearCookies: clearAllOldCookies,
    clearLocalStorage: clearOldLocalStorage,
    clearSessionStorage: clearOldSessionStorage,
    normalizeUrl: normalizeUrl,
    performFullCleanup: performCleanup
  };
  
})();