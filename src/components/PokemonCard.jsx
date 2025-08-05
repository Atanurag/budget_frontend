import React from 'react';

export default function PokemonCard({ pokemon, onAdd }) {
  const { name, sprites, types, stats } = pokemon;
  return (
    <div className="border p-4 rounded shadow">
      <img src={sprites.front_default} alt={name} className="mx-auto" />
      <h2 className="text-lg font-bold text-center capitalize">{name}</h2>
      <p className="text-sm text-center mb-2">
        {types.map(t => t.type.name).join(', ')}
      </p>
      <ul className="text-xs mb-2">
        {stats.slice(0, 3).map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <button onClick={onAdd} className="w-full bg-blue-500 text-white p-1 rounded">+</button>
    </div>
  );
}