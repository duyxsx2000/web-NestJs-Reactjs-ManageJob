import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useLocation, Route, Routes, useParams } from 'react-router-dom';
import PersonalInformation from '../component/profile/personalInformation';
import Action from '../component/profile/action';
import Task from '../component/profile/task';

const ProfilePage = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const location = useLocation();
  const [action, setAction] = useState('personalInformation')
  const {key} = useParams();
  
  useEffect(() => {
    if(key) {
      setAction(key);  
    };
  },[key]);

  if (!profile) return <></>;

  return (
    <div className="">
      <div className='h-[200px] flex justify-center'>
        <div className='w-3/4 border-b-2 mt-[40px] flex flex-col justify-between'>
          <div className='flex space-x-3'>
            <div className='w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center'>
              <UserOutlined style={{ fontSize: '30px' }} />
            </div>
            <div>
              <p className='font-medium text-[25px]'>{profile.name}</p>
              <p>{profile.email}</p>
            </div>
          </div>
          <div className='mb-1 font-semibold text-gray-700 flex space-x-5'>
            <Link
              className={location.pathname === '/profile/personalInformation' ? 'text-blue-700' : ''}
              to={'/profile/personalInformation'}
            >
              <p>Personal information</p>
            </Link>
            <Link
              className={location.pathname === '/profile/action' ? 'text-blue-700' : ''}
              to={'/profile/action'}
            >
              <p>Action</p>
            </Link>
            <Link
              className={location.pathname === '/profile/task' ? 'text-blue-700' : ''}
              to={'/profile/task'}
            >
              <p>Task</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className="content-container w-3\4">
          {action === 'personalInformation' && <PersonalInformation/>}
          {action === 'action' && <Action/>}
          {action === 'task' && <Task/>}
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
