import React from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    children: React.ReactNode
    index: number,
    id: string
}

const DragComponent = ({children, index, id} : Props) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // style={{
                // userSelect: 'none',
                // padding: 16,
                // margin: '0 0 8px 0',
                // backgroundColor: 'white',
                // ...provided.draggableProps.style,
                // }}
            >
                {children}
            </div>
            )}
      </Draggable>
    )
};

export default DragComponent;