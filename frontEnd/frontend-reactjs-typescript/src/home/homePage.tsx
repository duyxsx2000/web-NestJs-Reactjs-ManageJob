import React, { useState } from 'react'
import JobCard from '../component/jobCard'
import {
  UserOutlined, 
  DownOutlined,
  HddOutlined,
  UpOutlined,
  SearchOutlined
} from '@ant-design/icons';

const color = {
  pink: 'pink-500',
  yellow: 'yellow-500',
  green: 'green-500'
};

export default function HomePage() {
  const a =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const b = [1,2,3,4,5]
  const [dataJobs, setDataJobs] = useState(2)
  const [statusNav, setStatusNav] = useState<string>('All Jobs')
  const [display, setDisplay] = useState<string>('listJobs')
  const [statusJobCard, setStatusJobCard] = useState<number | undefined>()

  const cl1 = () => {
    console.log('1');
  }
  const cl2 = () => {
    console.log('2');
  }

  const handleOnclickDisplay = (name: string) => {
    setDisplay(name)
  };

  const handleOnclickGetData = (name: string) => {
    setStatusNav(name)
    setDataJobs(1)
  }

  return (

    <div className='homeMain z-30 top-0 flex  '>
      <div className='w-[70%] h-[100vh] bg-[rgb(233, 227, 227)] flex justify-center items-center'>
        <div className=' relative w-[95%] h-full  '>
          <div className='fixed z-[100] w-[66%] mt-4 navConten '>
            <div  
              className={` w-1/5 p-[5px] text-center${statusNav !== 'All Jobs' ? '' : ' bg-[#4fd751] rounded-l-[5px] text-white font-medium  '}`}
              onClick={() => handleOnclickGetData('All Jobs')} 
            >
              <div >All Jobs</div>
            </div>

            <div 
              className={`w-1/5 p-[5px] text-center ${statusNav !== 'Encourage' ? '' : ' bg-[#4fd751]  text-white font-medium  '}`}
              onClick={() => handleOnclickGetData('Encourage')} 
            >
              <div >Encourage</div>
            </div>

            <div 
              className={`w-1/5 p-[5px] text-center ${statusNav !== 'Urgent' ? '' : ' bg-[#4fd751]  text-white font-medium  '}`}
              onClick={() => handleOnclickGetData('Urgent')} 
            >
              <div >Urgent</div>
            </div>
            <div className='flex justify-center items-center w-[35%] ml-9'>
              <input 
                placeholder='search' 
                className='w-[80%] outline-none border-x border-gray-300 p-1'>
              </input>
              <span className='justify-center items-center   w-1/5 flex'>
               <SearchOutlined className='font-bold xxx' />
              </span>
            </div>
          </div>


          <div className=' relative mt-[70px] z-30 w-full h-[90%] flex flex-wrap overflow-auto '>
            {a.map((item, index) => {
              const numbercolor = Math.floor(Math.random() *3) + 1
              return (
                <div key={index} className='w-[20%] h-[250px]'>
                  <JobCard
                    key={index}
                    status='home' 
                    onClick1={cl1} 
                    onClick2={cl2} 
                    color={numbercolor}
                    jobs={{}}
                  />
                </div>
              )
            })}
          </div>
          <div className='bottom absolute bg-white  bottom-0 w-full h-[50px] z-[100] text-center'> 1...124 </div>
        </div>
      </div>

      <div className='aside fixed right-0  h-[93vh] z-[50]  w-[30%] px-5'>
        <div className='flex space-x-5 items-center py-3 border-b border-gray-300'>
          <div className='w-24 h-24 rounded-full bg-slate-600 flex justify-center items-center'>avata</div>
          <div className=' font-bold'>
            <p>Đỗ Khương Duy</p>
            <p>Intern Web Devenloper</p>
          </div>
        </div>
        <div className='flex space-x-3'>
          <div className='flex items-center mt-2 border-b border-gray-300'>
            <UserOutlined /> 
            <p className='mx-3'>Profile</p>
            {display === 'profile' ? 
              <UpOutlined onClick={() =>handleOnclickDisplay('')}/> :
              <DownOutlined onClick={() =>handleOnclickDisplay('profile')}/>  
            } 
          </div>
          <div className='flex items-center mt-2  border-b border-gray-300'>
            <HddOutlined /> 
            <p className='mx-3'>List Jobs</p>
            {display === 'listJobs' ? 
              <UpOutlined onClick={() =>handleOnclickDisplay('')}/> :
              <DownOutlined onClick={() =>handleOnclickDisplay('listJobs')}/>
            }  
          </div>
          <div className='flex items-center mt-2  border-b border-gray-300'>
            <HddOutlined /> 
            <p className='mx-3'>Update late</p>
            {display === 'listJobs' ? 
              <UpOutlined onClick={() =>handleOnclickDisplay('')}/> :
              <DownOutlined onClick={() =>handleOnclickDisplay('')}/>
            }  
          </div>
        </div>

        {display === 'listJobs' && (
          <div className=' overflow-auto h-[420px] mt-3 flex flex-wrap w-[420px] '>
            {b.map((job) => (
              <div className='w-[200px] h-[250px] mt-2'>
                <JobCard
                  key={1} 
                  status=''
                  onClick1={cl1} 
                  onClick2={cl2} 
                  color={1} 
                  jobs={{}}
                />
                </div>
            ))}
          </div>
        )}
        
        {display === 'profile' && (
          <div className=' mt-5'>
            <div className='flex '>
              <div className='w-[30%] space-y-2'>
                <p>Họ và Tên:</p>
                <p>Tuổi</p>
                <p>Số điện thoại</p>
                <p>Email</p>
                <p>Githup</p>
              </div>
              <div className='w-[70%] space-y-2'>
                <p>Đỗ Khương Duy</p>
                <p>24</p>
                <p>0393465147</p>
                <p>duy123@gmail.com</p>
                <p>duy123@githup.com</p>
              </div>
            </div>
            <p className='mt-3 font-semibold text-red-600'>Đã tham gia công ty vào ngày 12/13/2020</p>
            <p className='mt-3 font-semibold text-green-600'>Chức vụ hiện tại Intern web developer</p>
          </div>
        )}
      
        

      </div>
    </div>
  )
}
