// File: src/components/PokemonList.jsx
import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useCollection from '../hooks/useCollection';

const fetchPokemonPage = async ({ pageParam = 0 }) => {
  const limit = 6;
  const offset = pageParam * limit;
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const results = await Promise.all(
    res.data.results.map(p => axios.get(p.url).then(r => r.data))
  );
  return { data: results, nextPage: pageParam + 1 };
};

export default function PokemonList() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemonPage,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const loadMoreRef = useRef();
  useIntersectionObserver(loadMoreRef, fetchNextPage);

  const { addToCollection } = useCollection();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.pages.map(page =>
        page.data.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onAdd={() => addToCollection(pokemon)}
          />
        ))
      )}
      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
