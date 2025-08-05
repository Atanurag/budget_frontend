import React from 'react';
import CollectionList from '../components/CollectionList';

export default function CollectionPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Collection</h1>
      <CollectionList />
    </div>
  );
}