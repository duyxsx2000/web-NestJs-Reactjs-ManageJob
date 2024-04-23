import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  SearchOutlined,
  CheckOutlined,
  CaretDownOutlined

} from '@ant-design/icons';  

type Props = {
    onClick: (id: string, role: string, name: string, email: string) => void
    id: string,
    name: string,
    email: string
}
const Stick = ({onClick, id, name, email}: Props) => {

    const [stick, setStick] = useState(false)
    const [role, setRole] = useState(false)
    const [listRole, setListRole] = useState(['Member','Lead','Admin'])

    const handleOnClick = (index: number) => {
        const roles = [...listRole];
        const temp = roles[0];
        roles[0] = roles[index];
        roles[index] = temp;
        onClick(id,roles[0], name, email);

        
        setListRole(roles);
        setRole(false)
    };
  
    const  handleOnClickStick = (id: string) => {
    stick ? setStick(false) : setStick(true);
    onClick(id,listRole[0], name, email)

   }
    return (
        <div className='flex items-center space-x-1'>                          
            {stick && (
                <div className='relative font-semibold  flex items-baseline '>
                    <div className='  w-full'>
                        <p className={`cursor-pointer p-1 ${listRole[0] === 'Member' ? 'text-gray-500' : 'text-red-500'}`}>{listRole[0]}</p>
                        {role && (
                            <div className='absolute z-[100] border-2 w-[80px] border-gray-300  bg-white '>
                                <p onClick={() => handleOnClick(1)} className={`cursor-pointer border-b border-gray-300  p-1 -bottom-full ${listRole[1] === 'Member' ? 'text-green-500' : listRole[1] === 'Lead' ? 'text-yellow-500' : 'text-red-500'}`}>{listRole[1]}</p>
                                <p onClick={() => handleOnClick(2)} className={`cursor-pointer  p-1 -bottom-full ${listRole[2] === 'Member' ? 'text-green-500' : listRole[2] === 'Lead' ? 'text-yellow-500' : 'text-red-500'}`}>{listRole[2]}</p> 
                            </div>        
                        ) 
                        }
                       
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