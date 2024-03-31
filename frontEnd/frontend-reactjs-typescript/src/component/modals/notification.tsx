import React, { useEffect, useState } from 'react'
import {CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setModalNotification } from '../../redux/slices/statusDisplaySloce';

const ModalNotification =()=> {
    const [display, setDisplay] = useState(false);
    const notification = useSelector((state: RootState) => state.display.modalNotification.title)
    const status = useSelector((state: RootState) => state.display.modalNotification.status)
    const dispatch = useDispatch()
    useEffect(() => {
        const timeOut = setTimeout(() => {
            if(!notification) return
            setDisplay(true)
        }, 100);
        const timeOut1 = setTimeout(() => {
            setDisplay(false)
            dispatch(setModalNotification({notify:'', status: status}))
        }, 1200);

        if(!notification) return
        return () => {
            clearTimeout(timeOut);
            clearTimeout(timeOut1);
        }
    },[notification]);

  return (
    <div className={`z-[100] fixed w-[300px] min-h-[150px] bg-white rounded-xl shadow-xl duration-500 transition-all ease-in-out ${!display ? '-top-[500px]' : 'top-[40px]'} right-1/2 translate-x-1/2`}>
        <p className='text-center font-semibold text-black'>Notification</p>
        {/* <div className='relative'>
            <div className=' absolute right-1 -top-[30px]'><CloseOutlined /></div>
        </div> */}
        {status ? (
            <div className='flex items-center justify-center mt-2'>
                <CheckOutlined className='mr-2' style={{color:'green'}} /> 
                <p>Complete</p>
            </div>
        ) : (
            <div className='flex items-center justify-center mt-2'>
                <CloseOutlined className='mr-2' style={{color:'red'}}/>
                <p>Error</p>
            </div>
        )
        }
        <div className='mt-2 p-2 text-center'>{notification}</div>

    </div>
  )
}

export default ModalNotification
