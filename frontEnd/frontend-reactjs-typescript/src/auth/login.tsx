import React, { useState } from 'react'
import './login.css'
import { GoogleOutlined, FacebookOutlined, HomeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { fetchtokenByUser } from './authSlice';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'

type TypeForm = {
    password: string,
    email: string
};

type ResToken = {
    access_token: string,
};


export default function Login() {
    
    const dispatch = useDispatch();

    const [dataForm, setDataForm] = useState<TypeForm>({
        password:'',
        email:''
    });
    const [status, setStatus] = useState<boolean>(true);

    const postDataLogin = async () => {
        try {
            const action: AsyncThunkAction<ResToken, TypeForm, AsyncThunkConfig> | any = fetchtokenByUser(dataForm);
            dispatch(action);
        } catch (error) {
        }
    };
   
    const handleClickButton = () =>{

        if(!dataForm || !dataForm.email || !dataForm.password) {
            setStatus(false);
            return
        };
        postDataLogin()     
    };

    const handleOnChange = (e: any) => {
        const {name, value} = e.target;
        setDataForm({
            ...dataForm,
            [name]: value
        });
        setStatus(true) ;   
    };

    return (
        <div className='flex justify-center items-center mt-11'>
            <div className='w-[400px] h-[500px] bg-white rounded-[5px]'>
                <div className='text-center p-2 bg-green-500 text-white font-semibold text-[20px] rounded-t-[5px]'>
                    <p>Sign in now</p>
                </div>
                <div className='px-4 mt-[50px]'>
                    <input
                        className='w-full border-2 p-2 rounded-[5px] border-green-500 outline-none'
                        placeholder='Email'
                        value={dataForm.email}
                        name='email'
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className='px-4 mt-[30px]'>
                    <input
                        className='w-full border-2 p-2 rounded-[5px] border-green-500 outline-none'
                        placeholder='Password'
                        value={dataForm.password}
                        name='password'
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className='px-4 mt-[30px]'>
                    <button
                        className='w-full border-2 p-2 rounded-[5px] bg-green-500 text-white font-semibold'
                        onClick={handleClickButton}
                    >
                        Sign In
                    </button>
                </div>
                <div className='text-[30px] space-x-3 mt-4 text-center'>
                    <HomeOutlined style={{color:'black', cursor:'pointer'}}/>
                    <GoogleOutlined style={{color:'red', cursor:'pointer'}}/>
                    <FacebookOutlined style={{color:'blue', cursor:'pointer'}} />
                </div>
            </div>
        </div>
    )
}
