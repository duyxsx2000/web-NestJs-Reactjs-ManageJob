import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DropCompunent from '../component/DragAndDrop/dropcomponent';

const initialItems = ['Item 1', 'Item 2', 'Item 3'];
const initialItems1 = ['Item a', 'Item b', 'Item c'];

const App = () => {
  const [items1, setItems1] = useState<string[]>(initialItems);
  const [items2, setItems2] = useState<string[]>(initialItems1);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Nếu không có điểm đến hoặc nếu điểm đến giống điểm xuất phát, không làm gì cả
    // if (!destination || destination.index === source.index) {
    //   console.log(destination.index);
    //   console.log(source.index);
      
      
    //   console.log('error');
      
    //   return;
    // }
    if (!destination) {
      return;
    }
  
    // Kiểm tra xem phần tử có được di chuyển giữa các Droppable không
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    console.log('done');
    
    const sourceItems = source.droppableId === 'droppable1' ? items1 : items2;
    const destinationItems = destination.droppableId === 'droppable1' ? items1 : items2;

    // Sao chép mảng các mục
    const newSourceItems = [...sourceItems];
    const newDestinationItems = [...destinationItems];

    // Lấy phần tử đã kéo
    const draggedItem = newSourceItems[source.index];

    // Xóa phần tử đã kéo khỏi mảng nguồn
    newSourceItems.splice(source.index, 1);
    // Chèn phần tử đã kéo vào vị trí mới trong mảng đích
    newDestinationItems.splice(destination.index, 0, draggedItem);

    // Cập nhật state với mảng mới
    if (source.droppableId === 'droppable1') {
      setItems1(newSourceItems);
      setItems2(newDestinationItems);
    } else {
      setItems1(newDestinationItems);
      setItems2(newSourceItems);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }} className='w-full h-full bg-red-800'>
        {/* <DropCompunent droppableId="droppable1" items={items1}/>
        <DropCompunent droppableId="droppable2" items={items2}/> */}
      </div>
    </DragDropContext>
  );
};

export default App;
