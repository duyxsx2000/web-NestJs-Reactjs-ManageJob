import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useDispatch } from 'react-redux';
import { fetchDataCountJobs } from '../../redux/slices/dashboardSlice';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AcctionType, CountJob, CountJobs } from '../../types';
type Props = {
  name: string,
  countJob: CountJob[] | null | undefined
}

type DataInput = {
  time: Date,
  type: 'MONTH' | 'DAY' | 'YEAR'| 'ALL'
}
const BarCharByJobs = ({name, countJob}: Props) => {

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selecteddAY, setSelecteddAY] = useState(new Date());
  const [type, setType] = useState(name)
  const dispatch = useDispatch()
  console.log(countJob);
  
  const fetchData = (dataInput: DataInput) => {
    const action: AsyncThunkAction<any, DataInput, AsyncThunkConfig> | AcctionType = fetchDataCountJobs(dataInput)
    dispatch(action)
  }
  
  const handleMonthChange = (date: any) => {
    setSelectedMonth(date);
    fetchData({time: date, type: 'MONTH' })
  };

  const handleDayChange = (date: any) => {
    setSelecteddAY(date);
    fetchData({time: date, type: 'DAY' })
  };
  const handleBarClick = (entry: any) => {
    // Xử lý hành động khi cột được click, ví dụ: console.log thông tin về cột đã được click
    console.log('Bar clicked:', entry);
  };

  

  if(!countJob) return null

  const dateSelecter = (type: 'month' | 'day') => {
    return (
      <DatePicker
        selected={type === 'month' ? selectedMonth : selecteddAY }
        onChange={handleMonthChange}
        dateFormat={type === 'month' ? "MM/yyyy" : type === 'day' ? "DD/MM/yyyy" : ""}
        showMonthYearPicker
        className='outline-none border border-blue-400 w-[80px] flex justify-center hover:cursor-pointer p-1'
      />
    )
  }

  const SelectMonth = () => (
    <DatePicker
      selected={selectedMonth}
      onChange={handleMonthChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      className='outline-none border border-blue-400 max-w-[100px] flex justify-center hover:cursor-pointer p-1'
    />
  );

  const SelectDay = () => (
    <DatePicker
      selected={selecteddAY}
      onChange={handleDayChange}
      dateFormat="dd/MM/yyyy"
      className='outline-none border border-blue-400 max-w-[100px]  flex justify-center hover:cursor-pointer p-1'
    />
  )
  return (
    <div>
      <div className='flex space-x-3 mb-3'>
        <p className=' font-semibold ml-16 p-1'>{`Job statistics chart for the ${type}`}</p>
        <div className='ml-16 flex items-center relative '>
          {type === 'Month' ? <SelectMonth/> : type === 'Day' && <SelectDay/>}
        </div>
      </div>
   
      <BarChart width={500} height={300} data={countJob}>
        <XAxis dataKey="status" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar 
          dataKey="count" 
          fill="#8884d8"   
          activeBar={{ fill: 'pink', stroke: 'blue', strokeWidth: 2, r: 8 }}
          onClick={handleBarClick}
        />
        <Tooltip />
      </BarChart>
    </div>
  );
};

export default BarCharByJobs;
