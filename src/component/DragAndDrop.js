import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [

 {id:'0', name:'인사말'},
 {id:'1', name: '캘린더'}, 
 {id:'2', name:'식전 영상'},
 {id:'3', name: '갤러리'},
 {id:'4', name: '오시는 길'},
 {id:'5', name: '안내사항'},
 {id:'6', name: '방명록'},
 {id:'7', name: '마음 전하실 곳'}
]

function DragAndDrop() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div>
      <header>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div style={{flex:1, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                          <div>{ name }</div>
                          <div>숨기기</div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default DragAndDrop;
