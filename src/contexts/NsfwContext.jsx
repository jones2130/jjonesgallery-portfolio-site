import React, { createContext, useContext, useState, useEffect } from 'react';

const NsfwContext = createContext();

export function NsfwProvider({ children }) {
  // Default to true (filtering is enabled, so NSFW is hidden/blurred)
  const [nsfwFilterEnabled, setNsfwFilterEnabled] = useState(() => {
    const saved = localStorage.getItem('nsfwFilterEnabled');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('nsfwFilterEnabled', JSON.stringify(nsfwFilterEnabled));
  }, [nsfwFilterEnabled]);

  const toggleNsfwFilter = () => {
    setNsfwFilterEnabled((prev) => !prev);
  };

  return (
    <NsfwContext.Provider value={{ nsfwFilterEnabled, toggleNsfwFilter }}>
      {children}
    </NsfwContext.Provider>
  );
}

export function useNsfw() {
  const context = useContext(NsfwContext);
  if (context === undefined) {
    throw new Error('useNsfw must be used within a NsfwProvider');
  }
  return context;
}
