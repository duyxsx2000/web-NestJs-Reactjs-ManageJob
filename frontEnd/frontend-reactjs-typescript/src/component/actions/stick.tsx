import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  SearchOutlined,
  CheckOutlined,
  CaretDownOutlined

} from '@ant-design/icons';  

type Props = {
    onClick: (id: string, role: string) => void
    id: string
}
const Stick = ({onClick, id}: Props) => {

    const [stick, setStick] = useState(false)
    const [role, setRole] = useState(false)
    const [listRole, setListRole] = useState(['User','Lead'])

    const handleOnClick = () => {
        const roles = [...listRole];
        const temp = roles[0];
        roles[0] = roles[1];
        roles[1] = temp;
        onClick(id,roles[0]);
        console.log(roles[0]);
        
        setListRole(roles);
        setRole(false)
    };
  
    const  handleOnClickStick = (id: string) => {
    stick ? setStick(false) : setStick(true);
    onClick(id,listRole[0])

   }
    return (
        <div className='flex items-center space-x-1'>                          
            {stick && (
                <div className='relative font-semibold  flex items-baseline '>
                    <div className='  w-full'>
                        <p className={`cursor-pointer p-1 ${listRole[0] === 'User' ? 'text-green-500' : 'text-red-500'}`}>{listRole[0]}</p>
                        {role && <p onClick={() => handleOnClick()} className={`cursor-pointer border border-gray-400 absolute z-[100] bg-white w-full p-1 -bottom-full ${listRole[1] === 'User' ? 'text-green-500' : 'text-red-500'}`}>{listRole[1]}</p>}
                    </div>
                    <CaretDownOutlined onClick={() => role ? setRole(false) : setRole(true)} />
                    
                </div>
             )}
            <div 
                onClick={() => {handleOnClickStick(id)}}
                className='w-[17px] h-[17px] border border-gray-500 text-green-500 flex justify-center items-center '
            >
                {stick && <CheckOutlined />}
            </div>
        </div>

    )
};

export default Stick;