import { useState, useEffect } from 'react';

export default function useCollection() {
  const [collection, setCollection] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('collection');
    if (saved) {
      setCollection(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on collection change
  useEffect(() => {
    localStorage.setItem('collection', JSON.stringify(collection));
  }, [collection]);

  const addToCollection = (pokemon) => {
    setCollection((prev) => [...prev, pokemon]);
  };

  const reorderCollection = (startIndex, endIndex) => {
    const updated = [...collection];
    const [moved] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, moved);
    setCollection(updated);
  };

  return { collection, addToCollection, reorderCollection };
}
