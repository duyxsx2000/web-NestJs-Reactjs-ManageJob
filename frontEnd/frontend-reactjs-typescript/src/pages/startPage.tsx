import React, { useEffect, useState } from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import './page.css'
import InputSignUp from '../component/inputs/inputSignUp'
import { useDispatch } from 'react-redux';
import { createNewAdminforCompany, setTempData } from '../auth/authSlice';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AcctionType, CreateAdminAccount } from '../types';
import { FaBeer, FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleLoginButton from '../component/button/googleLogin';
import Password from 'antd/es/input/Password';
import { actionCreateNewAccountForUser } from '../services/actions/createNewData';


type CreateType = {
  email: string,
  phone: string,
  name: string,
  password: string
};

type JoinType = {
  code: string,
  email: string,
  phone:string,
  name: string,
  password: string
};



export default function StartPage() {
  const [oppenCreateForm, setCreateForm] = useState<boolean>(false);
  const [oppenJoinForm, setJoinForm] = useState<boolean>(false);
  const [status, setStatus] = useState(false);
  const [send, setSend] = useState(false);
  const [eyePass, setEysPass] = useState(false)
  const [dataCreate, setDataCreate] = useState<CreateType>({
    email: '',
    name: '',
    phone:'',
    password:''
  });
  const [dataJoin, setDataJoin] = useState<JoinType>({
    code: '',
    email: '',
    phone:'',
    name: '',
    password: ''
  });

  const dispatch = useDispatch()

  const styleInput = `outline-green-500 mt-2 rounded-[5px] border-gray-300 border-2 ${!status ? '' : 'border-red-500'} w-full p-2`;

  useEffect(() => {
    if (
      dataCreate.email != '' &&
      dataCreate.password != '' &&
      dataCreate.name != '' 
    ) { setSend(true)};

    if (
      dataJoin.code != '' &&
      dataJoin.email != '' &&
      dataJoin.password != '' &&
      dataJoin.code != '' 
    ) {setSend(true)};

  },[dataCreate, dataJoin]);

  const createNewAdmin = (createAdminAccount: CreateAdminAccount) => {
    const action: AsyncThunkAction<any, CreateAdminAccount, AsyncThunkConfig> | AcctionType  = createNewAdminforCompany(createAdminAccount)
    dispatch(action)
  };


  
  const handeleJoin = () => {
    const actionCreateAccount = actionCreateNewAccountForUser({
      name: dataJoin.name,
      password: dataJoin.password,
      email:dataJoin.email,
      idGroup: 'g13rt5h',    //test  ------------------------------------------------------
      role: 'User',
      type:'test'
    });
  
    dispatch(actionCreateAccount);
  }

  const handleChangeForm = (name: string) => {  
    if (name === 'create') {
      setJoinForm(false);
      setTimeout(() => {
        setCreateForm(true);
      },500);
      return
    };

    if (name === 'join') {
      setCreateForm(false);
      setTimeout(() => {
        setJoinForm(true);
      },500)
      return
    };
  };

  const handleOnclick = (action: 'create' | 'join') => {
    if(!send) return;
    dispatch(setTempData({
      email:dataCreate.email,
      Password: dataCreate.password
    }))
 

    if(action === 'create') {
      for (const key in dataCreate) {
        if (dataCreate[key as keyof CreateType] === '') {
          setStatus(true)
          return 
        }; 
      };
      createNewAdmin(dataCreate)
      return  
    };

    if(action === 'join') {
      for (const key in dataJoin) {
        if (dataJoin[key as keyof JoinType] === '') {
          setStatus(true)
          return 
        };
      };

      return  
    };
  };

  const handleOnChangeCreate = (e: any) => {
    const {value, name} = e.target;

    setDataCreate({
      ...dataCreate,
      [name]: value
    });
  };

  const handleOnChangeJoin = (e: any) => {
    const {value, name} = e.target;

    setDataJoin({
      ...dataJoin,
      [name]: value
    });
  };



  const createForm = () => {
    return (
      <div className=''>
        <div className='text-center bg-green-500  rounded-t-[5px] h-[50px] flex items-center justify-center'>
          <p className='  font-semibold text-[20px] text-white'>Create Form</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Name</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeCreate(e)}}
                value={dataCreate.name}
                name='name'
                placeholder='Name'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Eamil</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeCreate(e)}}
                value={dataCreate.email}
                name='email'
                placeholder='Email'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Phone</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeCreate(e)}}
                value={dataCreate.phone}
                name='phone'
                placeholder='phone'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <table>Password</table>
            <div className={`outline-green-500 flex justify-between items-center   ${!status ? '' : 'border-red-500'} w-full `} > 
              <input 
                className=' outline-green-500 h-full w-[95%] border-2 border-gray-300 p-2 rounded-[5px]'
                type={!eyePass ? 'password' : 'text'}
                onChange={(e) => {handleOnChangeCreate(e)}}
                value={dataCreate.password}
                name='password'
                placeholder='Password'
              >
              </input>
              {!eyePass ? <FaEyeSlash onClick={()=> setEysPass(true)}/> :
                <FaEye onClick={()=>setEysPass(false)}/>}

            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <button 
              type='button'
              onClick={() => handleOnclick('create')}
              className={`group p-2 w-full  ${!send ? 'bg-gray-500 text-gray-200' : 'bg-green-500 text-white'} h-[50px] text-[20px] font-semibold text-center  mt-4 rounded-[5px]`}>
              <span className='group-hover:scale-[1.5]'>Create</span>
            </button>
          </div>
          <div className='text-[30px] space-x-3 mt-4 h-full '>
            <GoogleLoginButton/>
          </div>

        </div>
      </div>
    )
  };

  const joinForm = () => { 
    return (
      <form className=''>
        <div className='text-center bg-green-500  rounded-t-[5px] h-[50px] flex items-center justify-center'>
          <p className='  font-semibold text-[20px] text-white'>Join Form</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Referral code</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeJoin(e)}}
                value={dataJoin.code}
                name='code'
                placeholder='Referral code'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Name</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeJoin(e)}}
                value={dataJoin.name}
                name='name'
                placeholder='Name'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Phone</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeJoin(e)}}
                value={dataJoin.phone}
                name='phone'
                placeholder='phone'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <div>
              <table>Email</table>
              <input 
                className={styleInput} 
                type='text'
                onChange={(e) => {handleOnChangeJoin(e)}}
                value={dataJoin.email}
                name='email'
                placeholder='Email'
              >
              </input>
            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <table>Password</table>
            <div className={`outline-green-500 flex justify-between items-center   ${!status ? '' : 'border-red-500'} w-full `} > 
              <input 
                className=' outline-green-500 h-full w-[95%] border-2 border-gray-300 p-2 rounded-[5px]'
                type={!eyePass ? 'password' : 'text'}
                onChange={(e) => {handleOnChangeJoin(e)}}
                value={dataJoin.password}
                name='password'
                placeholder='Password'
              >
              </input>
              {!eyePass ? <FaEyeSlash onClick={()=> setEysPass(true)}/> :
                <FaEye onClick={()=>setEysPass(false)}/>}

            </div>
          </div>
          <div className='mt-2 w-3/4'>
            <button type='button' onClick={()=> handeleJoin()} className='group p-2 w-full bg-green-500 h-[50px] text-[20px] font-semibold text-center text-white mt-4 rounded-[5px]'>
              <span className='group-hover:scale-[1.5]'>Join</span>
            </button>
          </div>
          <div className='text-[30px] space-x-3 mt-4 '>
            <GoogleLoginButton/>
          </div>

        </div>
      </form>
    )
  }
  return (
    <>
      <div className=' relative transition-all flex justify-between'>
        <div>
          <div className=''>
            <p className='text-[50px] text-white font-bold'>Hello, Bear</p>
            <p className='text-[20px] text-white'>Where you can easily manage projects and personnel</p>
          </div>
          <div className='flex mt-24  space-x-8'>
            <button 
              onClick={() => handleChangeForm('create')}
              type='button'
              className='p-2 rounded-full text-[20px] text-white font-semibold bg-green-600 w-[200px] hover:border-2 hover:bg-transparent hover:border-green-600'>
              Create
            </button>
            <button
              type='button'
              onClick={() =>  handleChangeForm('join')}
              className='p-2 rounded-full text-[20px] text-white border-2 font-semibold border-white  w-[200px] hover:border-green-600 hover:text-green-600'>
              Join
            </button>
          </div>
        </div>
        {}
        <div className={`transition-all fixed bg-white w-[500px] rounded-[5px] h-[600px] top-[80px] shadow-lg shadow-black  ${!oppenCreateForm ? '-right-full' : 'right-[200px] '} `}>
          {createForm()}
        </div>
        <div className={`transition-all fixed bg-white w-[500px] rounded-[5px] h-[600px] top-[80px] shadow-lg shadow-black  ${!oppenJoinForm ? '-right-full' : 'right-[200px] '} `}>
          {joinForm()}
        </div>
      </div>

    </>
  )
}
