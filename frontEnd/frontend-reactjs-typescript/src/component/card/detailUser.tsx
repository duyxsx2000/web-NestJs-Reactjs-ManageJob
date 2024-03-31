// import React from "react";
// import { User } from "../../types";
// import { 
//     PhoneOutlined,
//     UserOutlined,
//     MailOutlined,
//     MenuOutlined ,
//     DeleteOutlined,
//     EditOutlined,
//     FacebookOutlined,
//     DollarOutlined,
//     CloseOutlined

// } from '@ant-design/icons';
// import CountButton from "../button/buttonCount";
// type Props = {
//     user: User | null,
//     onClick: () => void
// };

// const DetailUser = ({user, onClick}: Props) => {
//     const color = user?.level === 'Leade' ? 'red' : user?.level === 'Senior' ? 'yeelow' : user?.level === 'Junior' ? 'blue' : 'green'
//     return (
//         <div className="w-[500px] h-[700px] rounded-lg bg-gray-200 relative ">
//             <div className=" absolute right-1 -top-1 text-white"><CloseOutlined onClick={onClick} /></div>
//             <div className={`px-4 pb-1 rounded-t-lg bg-gradient-to-br from-${color}-500 to-${color}-300 text-white`}>
//                 <p className="font-semibold text-[20px] mb-2 space-x-2 ">
//                     <span>{user?.name}</span>
//                     <span>{`#${user?.id}`}</span>
//                 </p>
//                 <p>{user?.position}</p>
//                 <div className="flex items-center">
//                     <DollarOutlined />
//                     <p className="ml-2">{user?.wage}</p>
//                 </div>
//                 <div className="flex items-center">
//                     <PhoneOutlined/>
//                     <p className="ml-2">{user?.phone}</p>
//                 </div>
//                 <div className="flex items-center mb-2">
//                     <MailOutlined/>
//                     <p className="ml-2">{user?.email}</p>
//                 </div>
//             </div>
//             <div className="flex justify-center mt-3 py-2 px-3">
//                 <div className="w-1/3 text-center p-1 ">
//                     <div className="bg-white h-[100px] rounded-lg">
//                         <p>Jobs Completed</p>
//                         <p className="mt-2 text-[30px]">12</p>
//                     </div>
//                 </div>
//                 <div className="w-1/3 text-center p-1">
//                     <div className="bg-white h-[100px] rounded-lg">
//                         <p>Jobs Completed</p>
//                         <p className="mt-2 text-[30px]">12</p>
//                     </div>
//                 </div>
//                 <div className="w-1/3 text-center p-1">
//                     <div className="bg-white h-[100px] rounded-lg">
//                         <p>Jobs Error</p>
//                         <p className="mt-2 text-[30px]">12</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-center mt-3 py-2 px-3">
//                 <CountButton name="Workdays Attended" count={12}/>
//                 <CountButton name="Leave Days Taken" count={12}/>
//                 <CountButton name="Remaining Leave" count={12}/>
//             </div>
            
import React from 'react'

export default function detailUser() {
  return (
    <div>
      
    </div>
  )
}

            
//         </div>
//     )
// };

// export default DetailUser