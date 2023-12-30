import React, { useEffect } from 'react'
import ModalCreateUser from '../../component/modals/modalCreateUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setModalCreateUser } from '../../redux/slices/statusDisplaySloce'
import UserCard from '../../component/userCard'
import { fetchUserByAdmin } from '../../redux/slices/usersSlice'
import { AcctionType } from '../../types'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import Nodata from '../../component/nodata'

export default function Manageusers() {
  const display = useSelector((state: RootState) => state.display.modalCreateUser);
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading.fetchUsers);
  const dispatch = useDispatch()
  const user = [1,2,3,4,5,6,7,8,9,10,11,]
  const button = [1,2,3,4,5];

  useEffect(() => {
    const action: AsyncThunkAction<ResponseType | null, any, AsyncThunkConfig> | AcctionType = fetchUserByAdmin('fetch'); 
    dispatch(action)
  },[])
  const handleOnclick = () => {

  }
  const handleOnlickTest = () => {

    console.log(users,'test');
    
  }
  return (
    <div className='h-full'>
      <div className='mt-[20px]  flex '>
        <div className='min-h-[100vh] w-3/4 flex flex-col justify-between'>
          <div className='   flex flex-wrap'>
            {loading && (
              user.map((user, index) => {
                return (
                  <div key={index} className='w-1/3 h-[200px] flex justify-center items-start'>
                    <div className='w-[90%] h-[90%] bg-white shadow-lg rounded-md'>
                      <UserCard
                        color='bg-green-500'
                        user={null}
                        onClick={handleOnclick}
                        loading={false}
                      />
                    </div>
                  </div>
                )
              })
            )}

            {users && !loading ? (
              users.map((user, index) => {
                return (
                  <div key={index} className='w-1/3 h-[200px] flex justify-center items-start'>
                    <div className='w-[90%] h-[90%] bg-white shadow-lg rounded-md'>
                      <UserCard
                        color={user.role === 'admin' ? 'bg-red-500' : user.role === 'leader' ? 'bg-yellow-500' : 'bg-green-500'}
                        user={user}
                        onClick={handleOnclick}
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
        
        <div className='w-1/4  fixed top-0 right-0 h-[93vh] z-[10] px-3'>
          <div className='mt-[70px]'>
            <div onClick={() => dispatch(setModalCreateUser(''))} className='w-full cursor-pointer rounded-md h-[50px] text-white mt-4  bg-blue-600 font-bold flex justify-center items-center '>
              Create New User
            </div>
            <div onClick={handleOnlickTest} className='w-full rounded-md h-[50px] text-white mt-4  bg-blue-600 font-bold flex justify-center items-center '>
              test
            </div>
          </div>
        </div>
        {display && <ModalCreateUser />} 
      </div>
    </div>
  )
}
