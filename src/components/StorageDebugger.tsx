import { useEffect } from 'react';

export const StorageDebugger = () => {
  useEffect(() => {
    const logStorage = () => {
      console.log('--- Current Storage ---');
      console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
      console.log('userId:', localStorage.getItem('userId'));
      console.log('userName:', localStorage.getItem('userName'));
    };

    // Log initial state
    logStorage();

    // Add storage event listener
    const handleStorageChange = () => {
      console.log('--- Storage Changed ---');
      logStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return null; // This component doesn't render anything
};