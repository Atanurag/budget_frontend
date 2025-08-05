// File: src/components/CollectionList.jsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useCollection from '../hooks/useCollection';

export default function CollectionList() {
  const { collection, reorderCollection } = useCollection();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderCollection(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="collection">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
            {collection.map((pokemon, index) => (
              <Draggable key={pokemon.id} draggableId={pokemon.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="border p-4 rounded shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-12 h-12" />
                      <div>
                        <h2 className="capitalize font-bold">{pokemon.name}</h2>
                        <p className="text-xs">{pokemon.types.map(t => t.type.name).join(', ')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
