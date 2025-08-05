import React from 'react';
import PokemonList from '../components/PokemonList';

export default function DiscoveryPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Discover Pokemon</h1>
      <PokemonList />
    </div>
  );
}
