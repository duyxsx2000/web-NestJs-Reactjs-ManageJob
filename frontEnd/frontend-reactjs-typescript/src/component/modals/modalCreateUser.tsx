import React, {useEffect, useState} from 'react'
import InputTextDefault from '../form/inputDefault';
import {CloseOutlined, FileImageOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setModalCreateUser,  } from '../../redux/slices/statusDisplaySloce';
import { AcctionType, CreateUser } from '../../types';
import { setLoadingCreateUser, submitCreateUser } from '../../redux/slices/usersSlice';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loading from '../loading';


export default function ModalCreateUser() {
  const loading = useSelector((state: RootState) => state.users.loading.createUser)
  const [status, setStatus] = useState(false);
  const [valid, setValid] = useState<boolean>(false);
  const [fileImage, setFileImage] = useState<any>(null);
  const [createUser, setCreateUser] = useState<CreateUser>({
    email: '',
    name: '',
    position: '',
    role:'user',
    level:'intern',
    password:'',
    image:'123',
    phone:23541254
  });
  const dispatch = useDispatch()
  

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const base64 = await convertToBase64(file);     
      setFileImage(base64);
    } else {
      alert('Vui lòng chọn một tệp hình ảnh.');
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  
  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setStatus(true)
    }, 100);
    return () => clearTimeout(timeOut)
  },[]);

  useEffect(() => {
    const createUserValid = (state: CreateUser) => {
      for( const key in state) {
        if(!state[key]) {
          return false
        }
      };
      return true
    };
    const isValid = createUserValid(createUser);

    if(!isValid){
      return 
    };
    setValid(true)   
  },[createUser])
  
  const handleOnchangeInput = (e: any) => {
    const {name, value} = e.target;
    dispatch(setLoadingCreateUser('none'))
    setCreateUser({
      ...createUser,
      [name]: value
    })
  };

  const handleOnclickPost = () => {
    console.log(createUser);
    
    const acction: AsyncThunkAction<ResponseType | null, CreateUser, AsyncThunkConfig> | AcctionType = submitCreateUser(createUser);
    dispatch(acction)
  }

  return (
    <div className='fixed w-full h-[100vh]  bg-[rgba(112,112,112,0.7)] top-0 left-0 z-[90] flex justify-center items-center'> 
      {loading === 'loading' ? <Loading/> : <></>}  
      <div className={` w-[450px] h-[640px] fixed z-[90] bg-gradient-to-b from-green-400 to-green-300 transition-all ${status ? 'top-[40px]' : '-top-[500px]'}`}>   
        <h1 className='text-white'>FORM CREATE NEW USER</h1>
        <div className=' relative space-y-4 w-full'>
          <div onClick={() => dispatch(setModalCreateUser(''))} className='text-white absolute right-2 -top-[65px]'><CloseOutlined /></div>
          <InputTextDefault 
            borderColor={`${loading === 'error' ? 'border-red-800' : 'border-green-500'}`} 
            placeholder='User name' 
            label='User Name'
            value={createUser.name}
            name='name'
            type='string'
            onChange={handleOnchangeInput}
          />
          <InputTextDefault 
            borderColor={`${loading === 'error' ? 'border-red-800' : 'border-green-500'}`} 
            placeholder='Email' 
            label='Email'
            value={createUser.email}
            name='email'
            type='string'
            onChange={handleOnchangeInput}
          />
          <InputTextDefault 
            borderColor={`${loading === 'error' ? 'border-red-800' : 'border-green-500'}`}  
            placeholder='Number phone' 
            label='Number phone'
            value={createUser.phone}
            name='phone'
            type='number'
            onChange={handleOnchangeInput}
          />
          <InputTextDefault 
            borderColor={`${loading === 'error' ? 'border-red-800' : 'border-green-500'}`} 
            placeholder='Position' 
            label='Position'
            value={createUser.position}
            name='position'
            type='string'
            onChange={handleOnchangeInput}
          />
          <InputTextDefault 
            borderColor={`${loading === 'error' ? 'border-red-800' : 'border-green-500'}`} 
            placeholder='Password' 
            label='Password'
            value={createUser.password}
            name='password'
            type='string'
            onChange={handleOnchangeInput}
          />
          <div className=' flex justify-center'> 
            <div className=' w-3/4 flex justify-between'>
              <select 
                name='level' 
                className=' outline-none w-1/3 border-2 p-2 border-green-500'
                onChange={handleOnchangeInput}
              >
                <option >Level</option>
                <option value='Fresher'>Fresher</option>
                <option value='Junior'>Junior</option>
                <option value='Senior'>Senior</option>
                <option value='Leade'>Leade</option>
              </select>
              <select 
                name='role' 
                className=' outline-none w-1/3 border-2 p-2 border-green-500'
                onChange={handleOnchangeInput}
              >
                <option >Role</option>
                <option value='user'>User</option>
                <option value='leader'>Leade</option>
                <option value='admin'>Admin</option>
              </select>
              <div className="flex items-center">
                <input
                  type="file"
                  id="file-input"
                  className="file-input"
                  onChange={handleImageChange}
                />
                <label htmlFor="file-input" className="flex items-center ">
                  <FileImageOutlined style={{color:'blue', fontSize:'35px'}} />
                </label>
 
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <button 
              onClick={handleOnclickPost}
              className={`w-3/4 ${valid ? 'bg-blue-800 text-white' : 'bg-gray-500 text-gray-300 '} p-2 text-center font-semibold hover:shadow-xl`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
