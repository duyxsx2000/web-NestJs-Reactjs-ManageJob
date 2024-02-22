import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { fetchUserByAdmin, upDateUser } from '../../../redux/slices/usersSlice'
import { AcctionType, User } from '../../../types'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import UserCard from '../../../component/card/userCard'
import ButtonDefault from '../../../component/button/buttonDEfault'
import Nodata from '../../../component/nodata'
import ModalDefault from '../../../component/modals/defaultModal'
import {SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '../../../component/loading'
import { setModalCreateUser } from '../../../redux/slices/statusDisplaySloce'
import ModalCreateUser from '../../../component/modals/modalCreateUser'
import DetailUser from '../../../component/card/detailUser'
type ActionModal = {
  user : User,
  action: "DELETE" | "UPDATE"
}

export default function Manageusers() {
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading.fetchUsers);
  const createUser = useSelector((state: RootState) => state.display.modalCreateUser);
  const [modal, setModal] = useState<ActionModal | null>(null);
  const [detailUser, setDetailUser] = useState<User | null>(null)
  const dispatch = useDispatch();
  const user = [1,2,3,4,5,6,7,8,9,10,11,];
  const [category, setCategory] = useState<string>('All User')
  useEffect(() => {
    const action: AsyncThunkAction<ResponseType | null, any, AsyncThunkConfig> | AcctionType = fetchUserByAdmin('fetch');   
    dispatch(action)
  },[]);

  useEffect(() => {
    setModal(null)
  },[users]);

  const handleOnClickEditJob = (actiocModal: ActionModal) => {
    const action: AsyncThunkAction<ResponseType | null, any, AsyncThunkConfig> | AcctionType = upDateUser(actiocModal); 
    dispatch(action)  
  };

  const modalUpdateUser = (actiocModal: ActionModal) => {
    return (
      <div className='w-full h-full flex space-x-4 p-3'>
        {actiocModal?.user && 
          <div className=' shadow-xl h-[150px] w-[400px]'>
            <UserCard 
              color={actiocModal.user.level === 'Leade' ? 'red' : actiocModal.user.level === 'Senior' ? 'yellow' :  actiocModal.user.level === 'Junior' ? 'blue' : actiocModal.user.level === 'Fresher' ?'green' : ''} 
              user={actiocModal?.user}
              onClick={{
                delete: () => {console.log(1)},
                menu: () => {console.log(2)},
                edit: () => {console.log(3)},
              }}
              loading={true}
            />
          </div>
        }
        <div className='w-1/2'>
          <p className='font-semibold'>
            {
              actiocModal.action === 'DELETE' ? 'Are you sure you want to DELETE the User?' : 
              actiocModal.action === 'UPDATE' ? 'Are you sure you want to mark this User complete?' : ''    
            }
          </p>
          <div className='flex mt-8 justify-center space-x-4'>
            <ButtonDefault 
              onClick={() => handleOnClickEditJob(actiocModal)} 
              color='bg-red-500'
              content={actiocModal.action}
            />
            <ButtonDefault 
              onClick={() => {setModal(null)}} 
              color='bg-blue-500'
              content='CANCEL'
            />
          </div>
        </div> 
      </div>
    )
  };

  return (
    <div className='h-full w-full'>
      {detailUser && <ModalDefault width='' height='' content={<DetailUser onClick={() => setDetailUser(null)} user={detailUser}/>}/>}
      {loading && <Loading/>}
      {createUser && <ModalCreateUser />}
      {modal && (
        <ModalDefault
          width=''
          height=''
          content= {modalUpdateUser(modal)}
        />
      )}
      <div className='fixed z-[70] w-[66%] mt-4 flex rounded-[5px] shadow-lg top-[40px] border border-gray-300  bg-white '>
        <div  
          className={` w-1/5 p-[5px] text-center cursor-pointer ${category !== 'All User' ? '' : ' bg-[#4fd751] rounded-l-[5px] text-white font-medium  '}`}
          onClick={() => setCategory('All User')} 
        >
          <div >All User</div>
        </div>
        <div 
          className={`w-1/5 p-[5px] text-center cursor-pointer ${category !== 'Leader' ? '' : ' bg-[#4fd751]  text-white font-medium  '}`}
          onClick={() => setCategory('Leader')} 
        >
          <div >Leader</div>
        </div>
        <div 
          className={`w-1/5 p-[5px] text-center cursor-pointer ${category !== 'Staff' ? '' : ' bg-[#4fd751] rounded-r-[5px] text-white font-medium  '}`}
          onClick={() => setCategory('Staff')} 
        >
          <div >Staff</div>
        </div>
        <div className='flex group justify-center items-center w-[35%] ml-9'>
          <input 
            placeholder='search' 
            className='w-[80%] outline-none border-x border-gray-300 p-1'>
          </input>
          <span className='justify-center items-center group-hover:text-[25px]   w-1/5 flex'>
          <SearchOutlined className=' font-bold xxx' />
          </span>
        </div>
      </div>

      <div className='  w-full '>
        <div className='flex mt-8'> 
          <div className='w-1/5 h-[100px] flex justify-center items-start'>
            <div className='group w-[90%] h-[100%] text-white  shadow-lg rounded-md flex justify-center items-center bg-gradient-to-r from-green-500 to-green-300 bg-green-200 hover:bg-green-500 hover:shadow-xl'>
              <PlusOutlined 
                style={{fontSize:'50px'}} 
                className='group-hover:scale-[1.5] group-hover:'
                onClick={() =>{dispatch(setModalCreateUser(true))}} 
              />
              <p className='ml-12 font-semibold group-hover:scale-[1.5]'>Add job</p>
            </div>
          </div>
          <div className='w-1/5 h-[100px] flex justify-center items-start'>
            <div className='group w-[90%] h-[100%] text-white  shadow-lg rounded-md flex justify-center items-center bg-gradient-to-r from-red-500 to-red-300 hover:shadow-xl'>
              <p>Leade</p>
              <p className='ml-12 font-semibold ' style={{fontSize:'30px'}}>{users?.filter((user) => user.level === 'Leade').length}</p>
            </div>
          </div>
          <div className='w-1/5 h-[100px] flex justify-center items-start'>
            <div className='group w-[90%] h-[100%] text-white  shadow-lg rounded-md flex justify-center items-center bg-gradient-to-r from-yellow-500 to-yellow-300 hover:shadow-xl'>
              <p>Senior</p>
              <p className='ml-12 font-semibold ' style={{fontSize:'30px'}}>{users?.filter((user) => user.level === 'Senior').length}</p>
            </div>
          </div>
          <div className='w-1/5 h-[100px] flex justify-center items-start'>
            <div className='group w-[90%] h-[100%] text-white  shadow-lg rounded-md flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-300 hover:shadow-xl'>
              <p>Junior</p>
              <p className='ml-12 font-semibold ' style={{fontSize:'30px'}}>{users?.filter((user) => user.level === 'Junior').length}</p>
            </div>
          </div>
          <div className='w-1/5 h-[100px] flex justify-center items-start'>
            <div className='group w-[90%] h-[100%] text-white  shadow-lg rounded-md flex justify-center items-center bg-gradient-to-r from-green-500 to-green-300 hover:shadow-xl'>
              <p>Fresher</p>
              <p className='ml-12 font-semibold ' style={{fontSize:'30px'}}>{users?.filter((user) => user.level === 'Fresher').length}</p>
            </div>
          </div>


        </div>
        <div className='min-h-[100vh] w-full flex flex-col justify-between'>
          <div className=' mt-8  flex flex-wrap overflow-auto'>
            {loading && users && (
              user.map((user, index) => {
                return (
                  <div key={index} className='w-1/4 h-[150px] flex justify-center items-start'>
                    <div className='w-[90%] h-[90%] bg-white shadow-lg rounded-md '>
                      <UserCard
                        color='bg-green-500'
                        user={null}
                        onClick={{
                          delete: () => {},
                          menu: () => {console.log(2)},
                          edit: () => {console.log(3)},
                        }}
                        loading={false}
                      />
                    </div>
                  </div>
                )
              })
            )}

            {users && !loading ? (
              users.map((user, index) => {
                if(user.role === 'admin') return undefined
                return (
                  <div key={index} className='w-1/4 h-[170px] flex justify-center items-start '>
                    <div className='w-[90%] h-[80%] bg-white shadow-lg rounded-md hover:shadow-xl'>
                      <UserCard
                        color={user.level === 'Leade' ? 'red' : user.level === 'Senior' ? 'yellow' :  user.level === 'Junior' ? 'blue' : user.level === 'Fresher' ?'green' : ''}
                        user={user}
                        onClick={{
                          delete: () => {setModal({user: user, action: 'DELETE'})},
                          menu: () => {setDetailUser(user)},
                          edit: () => {},
                        }}
                        loading={true}
                      />
                    </div>
                  </div> 
                )})
              ) : !users && !loading && (
                <div className='w-full h-full'><Nodata/></div>
              )
            }   
          </div>
          <div className='text-center font-bold w-full'>1.2.3...100</div>
        </div>    
      </div>
    </div>
  )
}
