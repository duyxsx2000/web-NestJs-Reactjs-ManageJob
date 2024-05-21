import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    PlusOutlined,
    TeamOutlined,
    DashOutlined,
    CloseOutlined,
    DeleteOutlined,
    LogoutOutlined,
    SettingOutlined ,
    UserAddOutlined,
    UserOutlined,
    CaretDownOutlined ,
    MenuOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons';
import { getStringDate } from '../../utils/date';
import { actionUpdateTask } from '../../services/actions/editdataTask';
import { useDispatch } from 'react-redux';
type Props = {
    onClick: () => void,
    idTask: string,
    dates: {
        datePost: Date,
        dateDeadlineStart?: Date,
        dateDeadlineEnd?: Date
    }
}
export default function DateInput({onClick, idTask, dates}: Props) {
    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(null);
    const [aDay, setAday] = useState<Date | null>(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(null);
    const [startDay, setStartDay] = useState(false)
    const [endDay, setEndtDay] = useState(false)
    const dispatch = useDispatch()
    const handleSetDaedine = () => {
        if(!selectedDateStart || !selectedDateEnd) return

        const action = actionUpdateTask({
            change:'date',
            idTask: idTask,
            dates: {
                datePost: dates.datePost,
                dateDeadlineStart: selectedDateStart,
                dateDeadlineEnd: selectedDateEnd
            }
        });

        dispatch(action)
        
    }
  return (
    <div className=' absolute w-[300px] top-[40px] shadow-sm shadow-gray-300 bg-white rounded-[5px] border border-gray-300'>
        <div className=' relative flex justify-center w-full'>
            <div  className='absolute right-0 -top-2'>
                <CloseOutlined onClick={onClick}/>
            </div>
            <DatePicker
                selected={startDay ? selectedDateStart : endDay ? selectedDateEnd : aDay}
                onChange={(date) => {
                    if(startDay) {
                        setSelectedDateStart(date)
                    };
                    if(endDay) {
                        setSelectedDateEnd(date)
                    }
                }}
                dateFormat="yyyy-MM-dd"
                className='w-full'
                minDate={new Date(Date.now())}
                // maxDate={new Date('2023-12-31')}
                inline
            />
        </div>
        <div className='flex justify-center'>
        <div className='p-2'>
            <p className=' font-semibold'>Start day</p>
            <div className='flex space-x-2 mt-1'>
                <input type='checkbox'  onChange={()=> !startDay ? setStartDay(true) : setStartDay(false)}></input>
                <div className={`p-1 border-2 ${startDay ? 'bg-white border-blue-500' : 'bg-gray-300 '}`}>
                    {selectedDateStart ? getStringDate(selectedDateStart) : 'N/T/NNN'}
                </div>
            </div>
        </div>
        <div className='p-2'>
            <p className=' font-semibold'>End day</p>
            <div className='flex space-x-2 mt-1'>
                <input type='checkbox' onChange={()=> !endDay ? setEndtDay(true) : setEndtDay(false)}></input>
                <div className={`p-1 border-2 ${endDay ? 'bg-white border-blue-500' : 'bg-gray-300 '}`}>
                    {selectedDateEnd ? getStringDate(selectedDateEnd) : 'N/T/NNN'}
                </div>
            </div>
        </div>
        </div>
        <div className='flex justify-center mb-2'>
            <button 
                onClick={()=> handleSetDaedine()}
                className='w-3/4 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-[5px]'
            >
                Save
            </button>
        </div>
      
    </div>
  )
}
