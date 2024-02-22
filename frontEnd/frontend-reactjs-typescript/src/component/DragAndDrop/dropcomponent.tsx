import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DragComponent from "./dragComponent";

type Props = {
    // items: string[],
    droppableId: string,
    children: React.ReactNode
}

const DropCompunent = ({ droppableId, children} : Props) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          // style={{
          //   backgroundColor: 'lightgrey',
          //   padding: 20,
          //   marginRight: 20,
          //   width: 200,
          //   minHeight: 200,
          // }}
          className="w-full h-full"
        >
           {/* {items.map((item: any, index: number) => (
            <DragComponent item={item} index={index}></DragComponent>
          ))} */}
          {provided.placeholder} 
          {children}
        </div>
      )}
    </Droppable>
  )
};

export default DropCompunent;