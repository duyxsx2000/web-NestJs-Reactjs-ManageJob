import React, { useState } from 'react'
import {
    CloseOutlined,
    UserAddOutlined,
    SearchOutlined,
    CheckOutlined,
    PlusOutlined,
    CopyOutlined,
    GoogleOutlined
  
  } from '@ant-design/icons';
import { Col } from 'antd';
import { color } from 'html2canvas/dist/types/css/types/color';
import { actionCreateNewAccountForUser } from '../../services/actions/createNewData';
import { useDispatch } from 'react-redux';
type Props = {
    idGroup: string
    closeModal: () => void
}
export default function AddUserForm({idGroup, closeModal}: Props) {
    const dispatch = useDispatch()
    const [changeRoles, setChangeRoles] = useState(false)
    const [action, setAction] = useState('')
    const [codeJoinGroup, setCodeJoinGroup] = useState('')
    const [createGoogle, setGoogle] = useState('')
    const [validate, setValidate] = useState(false)
    const [createAccount, setCreateAccount] = useState({
        email: '',
        password:'',
        name: ''
    })
    const [createUser, setCreateUser] = useState({
        email:'',
        idGroup: idGroup
    })

    const [roles, setRoles] = useState([
        'User',
        'Admin'
    ])

    const handleCreateAccount = () => {
        if
        (
            !createAccount.email ||
            !createAccount.name ||
            !createAccount.password || 
            !roles[0] ||
            !idGroup
        ) {
            setValidate(true);
            return
        }

        const actionCreateAccount = actionCreateNewAccountForUser({
            ...createAccount,
            idGroup: idGroup,
            role: roles[0]
        });

        dispatch(actionCreateAccount);

        setCreateAccount({
            email:'',
            name:'',
            password:''
        })

    }

    const handleCreateGoogle = () => {

    }
  return (
    <div className='p-2  border-t border-gray-200 flex'>
        {/* <input  
            value={createUser.email}
            onChange={(e) => {setCreateUser({
                ...createUser,
                email: e.target.value
            })}}
            type='email' 
            placeholder='Email' 
            className='w-[300px] border-2 outline-none border-green-500 rounded-[5px] p-1'
        /> */}
        {action && (
            <div className=' relative'>
                <div onClick={()=> setChangeRoles(true)} className={`font-medium text-center justify-center ml-2 w-[70px] flex items-center border-2 outline-none  rounded-[5px] p-1 cursor-pointer ${roles[0] === 'User' ? 'border-green-500' : 'border-red-500'}`}>
                    {roles[0]}
                </div>
                {changeRoles && (
                    <div 
                        onClick={()=> {
                            const newRoles = [roles[1], roles[0]]
                            setRoles(newRoles)
                            setChangeRoles(false);
                        }} 
                        className=' w-[70px] font-medium p-1 text-center  right-0 rounded-[5px] absolute border-2 bg-white -top-[40px] z-[90] border-gray-300'
                    >
                        <p>{roles[1]}</p>
                    </div>
                )}
            </div>
        )}

        <div className='flex space-x-2 '>
            {codeJoinGroup && action === 'Create code' && (
                <div className='ml-2 group relative mr-2 p-1 flex items-center font-medium rounded-[5px] border-2    border-gray-300'>
                    {codeJoinGroup}
                    <CopyOutlined className='ml-1' />
                    <div className=' absolute w-[200px] z-[90] hidden group-hover:flex justify-center left-[90%] text-[12px] bg-white border border-gray-400 text-center font-normal -bottom-6'>Code to join the group</div>
                </div>
            )}
            {action === 'Create account' && (
                <div className='flex'>
                    <input 
                        value={createAccount.name}
                        onChange={(e) => {
                            setCreateAccount({
                                ...createAccount,
                                name: e.target.value
                            });
                            setValidate(false)
                        }}
                        type='text'
                        placeholder='Name'
                        className={`p-1 ml-2 outline-none flex focus:border-green-500 items-center font-medium rounded-[5px] border-2 ${validate ? 'border-red-800' : ''}   border-gray-300 ${createAccount.name ? 'border-green-500' : ''}`}
                    />
                    <input 
                        value={createAccount.email}
                        onChange={(e) => {
                            setCreateAccount({
                                ...createAccount,
                                email: e.target.value
                            });
                            setValidate(false)
                        }}
                        type='text'
                        placeholder='Email'
                        className={`p-1 ml-2 outline-none flex focus:border-green-500 items-center font-medium rounded-[5px] border-2    border-gray-300 ${createAccount.email ? 'border-green-500' : ''} ${validate ? 'border-red-800' : ''}`}
                    />

                    <input 
                        value={createAccount.password}
                        onChange={(e) => {
                            setCreateAccount({
                                ...createAccount,
                                password: e.target.value
                            });
                            setValidate(false)
                        }}
                        type='text'
                        placeholder='Password'
                        className={`p-1 ml-2 outline-none flex focus:border-green-500 items-center font-medium rounded-[5px] border-2  ${validate ? 'border-red-800' : ''}  border-gray-300 ${createAccount.password ? 'border-green-500' : ''}`}
                    />
                </div>
            )}
            {action === 'Google' && (
                <div>
                    <input
                        value={createGoogle}
                        className={`p-1 ml-2 outline-none flex focus:border-green-500 items-center font-medium rounded-[5px] border-2   border-gray-300 ${createGoogle ? 'border-green-500' : ''}`}
                        placeholder='Gmail'
                        onChange={(e)=> setGoogle(e.target.value)}
                    />
                </div>
            )}
            {(action === 'Create account' || !action) && (
                <button 
                    onClick={() => !action ? setAction('Create account') : handleCreateAccount()}
                    className='  font-medium bg-green-500 p-1 text-center  right-0 rounded-[5px] border-2 text-white -top-[40px] z-[90]  border-gray-300'
                >
                    Create account
                </button>
            )}
            {(action === 'Create code' || !action) && (
                <button
                    onClick={()=> {setCodeJoinGroup('A34tY234'); setAction('Create code')}}
                    className='  font-medium p-1 text-center  right-0 rounded-[5px] border-2 bg-green-500 text-white -top-[40px]  border-gray-300'
                >
                    Create Code
                </button>
            )}
            {(action === 'Google' || !action) && (
                <button
                    onClick={() => !action ? setAction('Google') : handleCreateGoogle()}
                    className='flex items-center  font-medium p-1 text-center  right-0 rounded-[5px] border-2 bg-green-500 text-white -top-[40px]  border-gray-300'
                >
                    <GoogleOutlined style={{color:'red'}} className='mr-1' /> Google
                </button>
            )}
 
            <button 
                onClick={closeModal}
                className='  font-medium p-1 text-center bg-gray-400 text-gray-200 right-0 rounded-[5px] border-2  -top-[40px]  border-gray-300'
            >
                Cancel
            </button>
        </div>

    </div>
  )
}
