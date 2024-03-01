
import React from 'react'

export default function listFrame() {
  return (
    <div>
      
    </div>
  )
}





// import React, {useState, useRef, useEffect} from "react";
// import {DashOutlined, PlusOutlined} from '@ant-design/icons'
// import CardFrame from "./cardFrame";
// import { DataTask, TaskList } from "../../types";
// import { useDispatch } from "react-redux";
// import { setChange, setIsDagging } from "../../redux/slices/dataTaskSlice";

// type Props = {
//     name: string,
//     type: 'reserve' | 'default',
//     listCards: DataTask
// }

// const ListFrame = ({name, type,listCards} : Props) => {
//     const dispatch = useDispatch();
//     const [listCard, setListCard] = useState<TaskList[]>(listCards.taskList);
//     const [dragPerson, setDragPerson] = useState<{index: number, name:string}| null>(null);
//     const [draggedOverPerson, setDraggedOverPerson] = useState<{index: number, name:string}| null>(null);
//     useEffect(() => {
//         console.log('component rểnder');    
//     },[])

//     const handleOnDragStartTask =(e: any, index: number, name: string) => {
//         console.log(name,'set 1');      
//         setDragPerson({
//             index : index,
//             name: name
//         });
       
//     };

//     const handleOnDragEnterTask = (e: any, index: number, name: string) => {
//         console.log(name,'set 2');
//         setDraggedOverPerson({
//             index: index,
//             name: name
//         });
       
//     };
//     console.log(dragPerson,'---------------------55555555', draggedOverPerson)
//     const handleSortTask = (e: any, name: string) => {
//         console.log(dragPerson,'........33333====',draggedOverPerson);
        
//         // const listCardClone = [...listCard];
//         // const temp = listCardClone[dragPerson.index];
//         // listCardClone[dragPerson.index] = listCardClone[draggedOverPerson.index];
//         // listCardClone[draggedOverPerson.index] = temp;
//         // setListCard(listCardClone);
        
        
//     };

    

//     const handleOnDragOverTask = (e: any) => {

//       e.preventDefault();

      
//     };

//     if (type === 'reserve') return (
//         <div className="min-w-[270px] rounded-[5px] min-h-[90px] bg-gray-200 p-3 text-t-1"> </div>    
//     );
    
//     return (
//         <div className="min-w-[270px] rounded-[5px] min-h-[90px] bg-bg-f8 p-3 text-t-1">
//             <div className="flex justify-between p-1 ">
//                 <p className="font-[500] ">{name}</p>
//                 <button onClick={() => console.log(dragPerson,'---------------------4444444444', draggedOverPerson)}>log</button>
//                 <span className="flex items-center">
//                     <DashOutlined />
//                 </span>
//             </div>
//             <div >
//                 {listCard.map((card, index) => (
                    // <div 
                        
                    //     key={index}
                    //     draggable
                    //     onDragStart={(e) =>handleOnDragStart(e, index, card.name)}
                    //     onDragEnter={(e) => handleOnDragEnter(e, index, card.name)}
                    //     onDragEnd={(e) => handleSort(e, card.name)}
                    //     onDragOver={(e) => handleOnDragOver(e)}
                    //     >
                    //     <CardFrame name={card.name}/>
                    // </div>
//                 ))}
//                 </div>
//             <div>
//                 <button className="flex font-[500] items-center w-full rounded-[5px] mt-4 p-1 hover:bg-gray-300">
//                     <span className="text-[12px] flex items-center"><PlusOutlined className="mr-2"/></span>
//                     Add card
//                 </button>
//             </div>
//         </div>
//     )
// };

// export default React.memo(ListFrame);