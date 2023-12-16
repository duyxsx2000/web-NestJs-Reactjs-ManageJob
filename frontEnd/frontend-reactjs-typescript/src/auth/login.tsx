import React, { useState } from 'react'
import {GoogleOutlined, KeyOutlined} from '@ant-design/icons'
import './login.css'
import ButtonSample from '../component/buttonSample'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchtokenByUser } from './authSlice';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'



type TypeForm = {
    password: string,
    email: string
}
type ResToken = {
    access_token: string,
};


export default function Login() {
    const data12= useSelector((state: RootState) => state.auth.profile)
    const dispatch = useDispatch()

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
            console.error('Error during login:', error);
        }
    };
   

    const handleClickButton =()=>{

        if(!dataForm || !dataForm.email || !dataForm.password) {
            setStatus(false);
            return
        }
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
        <div className='main'>
            <h1 >LOGIN FORM </h1>
            <div className='container'>
                <div className='content'>
                    <h2>LOGIN HERE</h2>
                    <form style={{margin:"50px 0 0 0"}}>

                        <div style={{display:'flex', justifyContent:'center', height: '50px', margin: "30px 0 0 0"} }>
                            <div className={`${status ? 'container-input' : 'unContainer-input'}`}>
                                <input
                                    className='inputLogin' 
                                    placeholder='Email'
                                    name='email'
                                    value={dataForm?.email}
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <GoogleOutlined style={{fontSize:'25px', color: 'white'}} />
                            </div>
                        </div>

                        <div style={{display:'flex', justifyContent:'center', height: '50px', margin: "30px 0 0 0"} }>
                            <div className={`${status ? 'container-input' : 'unContainer-input'}`}>
                                <input
                                    className='inputLogin' 
                                    placeholder='Password'
                                    name='password'
                                    value={dataForm?.password}
                                    onChange={(e) => handleOnChange(e)} 
                                />
                                <KeyOutlined style={{fontSize:'25px', color: 'white'}} />  
                            </div>
                        </div>

                        <div className='option' style={{display: 'flex', justifyContent: 'center', margin:'20px 0 0 0'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                                <div style={{display: 'flex', width:'50%', alignItems: 'center'}}>
                                    <div className="custom-checkbox">
                                        <input  type='checkbox'/>
                                    </div>
                                    <p>Remmber Me</p>
                                </div>
                                <p >Forgot password</p>
                            </div>
                        </div>

                        <div style={{display:'flex',justifyContent:'center', margin:'20px 0 0 0'}}>
                            <div style={{width:'200px',height:'50px', display:'flex', justifyContent:'center'}}>
                                <ButtonSample 
                                    loading={false} 
                                    onClick={handleClickButton}
                                    validation={true}
                                >
                                    LOGIN
                                </ButtonSample>
                            </div>
                            
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}
