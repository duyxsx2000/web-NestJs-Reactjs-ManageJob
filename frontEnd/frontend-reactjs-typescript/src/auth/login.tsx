import React, { useEffect, useState } from 'react'
import './login.css'
import { GoogleOutlined, FacebookOutlined, HomeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { fetchtokenByUser } from './authSlice';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import GoogleLoginButton from '../component/button/googleLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RootState } from '../redux/store';

type TypeForm = {
    password: string,
    email: string
};

type ResToken = {
    access_token: string,
};


export default function Login() {
    const tempData = useSelector((state: RootState) => state.auth.temporaryData)
    const dispatch = useDispatch();
    const [eyePass,setEysPass] = useState(false)
    const [dataForm, setDataForm] = useState<TypeForm>({
        password:tempData.password,
        email:tempData.email
    });
    console.log(tempData,'tem');
    

    const [status, setStatus] = useState<boolean>(true);

    useEffect(()=> {
        setDataForm(tempData)
    },[tempData]);

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
                        className='w-full border-2 p-2 rounded-[5px] border-gray-300 outline-green-500'
                        placeholder='Email'
                        value={dataForm.email}
                        name='email'
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className='px-4 mt-[30px] w-full flex justify-between items-center'>
                    <input
                        className='w-[95%] border-2 p-2 rounded-[5px] border-gray-300 outline-green-500'
                        placeholder='Password'
                        value={dataForm.password}
                        name='password'
                        type={!eyePass ? 'password' : 'text'}
                        onChange={(e) => handleOnChange(e)}
                    />
                    {!eyePass ? <FaEyeSlash onClick={()=> setEysPass(true)}/> : <FaEye onClick={()=> setEysPass(false)}/>}
                </div>
                <div className='px-4 mt-[30px]'>
                    <button
                        className='w-full border-2 p-2 rounded-[5px] bg-green-300 text-white font-semibold hover:bg-green-500'
                        onClick={handleClickButton}
                    >
                        Sign In
                    </button>
                </div>
                <div className='text-[30px]  mt-4  px-4'>
                    <div className=''>
                        <GoogleLoginButton/>
                    </div>    
                </div>
            </div>
        </div>
    )
}
