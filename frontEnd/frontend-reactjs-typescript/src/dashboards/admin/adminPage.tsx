
import React from 'react'

export default function adminPage() {
  return (
    <div>
      
    </div>
  )
}

// import React, { ReactNode, useState, useEffect } from 'react'
// import { AdminRoute } from '../routes/adminRoute';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setModalCreateUser } from '../redux/slices/statusDisplaySloce';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import ModalCreateUser from '../component/modals/modalCreateUser';

// export default function AdminPage() {
//   const display = useSelector((state: RootState) => state.display.modalCreateUser);
//   const [navbar, setNavbar] = useState('JOBS')
//   const dispatch = useDispatch()
//   const handleOnclickChangeNavbar = (key: string) => {
//     setNavbar(key)
//   };


//   useEffect(() => {
//     window.history.pushState(null, '', '/admin/dashboard');
//     return () => {
//       console.log('Component sẽ bị unmount');
//     };
//   }, []);
//   return (
//     <div className='flex min-h-[100vh] '>
//       <div className='navbar w-[50px] h-full fixed left-0  z-10 flex items-start justify-center  '>
//         <div className='w-[40px]  h-4/5 bg-white shadow-2xl border border-blue-200 mt-7 rounded-full flex flex-col items-center justify-between '>
//           <Link 
//             to={'/admin/jobs'}
//             className={`h-1/3 flex items-center justify-center w-full rounded-t-full ${navbar === 'JOBS' ? 'bg-blue-400  text-white' : ''}`}
//             onClick={() =>handleOnclickChangeNavbar('JOBS')}
//           >
//             <div className=' origin-center -rotate-90  mb-6 font-semibold '> JOBS</div>
//           </Link>

//           <Link 
//             to={'/admin/users'}
//             className={`h-1/3 flex items-center justify-center w-full  ${navbar === 'USERS' ? 'bg-blue-400  text-white' : ''}`}
//             onClick={() =>handleOnclickChangeNavbar('USERS')}
//           >
//             <div className=' origin-center -rotate-90  mb-6 font-semibold '>USERS</div>
//           </Link>

//           <Link 
//             to={'/admin/dashboard'}
//             className={`h-1/3 flex items-center justify-center w-full rounded-b-full ${navbar === 'DASHBOARD' ? 'bg-blue-400  text-white' : ''}`}
//             onClick={() =>handleOnclickChangeNavbar('DASHBOARD')}
//           >
//             <div className=' origin-center -rotate-90  mb-6 font-semibold '>DASHBOARD</div>
//           </Link>
//         </div>
//       </div>

     
//       <div className='flex-1 w-full ml-[50px]'>
//         {/* <AdminRoute/> */}
//       </div>

//       <div className='w-1/4  fixed top-0 right-0 h-[93vh] z-[10] px-3'>
//         <div className='mt-[70px]'>
//           <div onClick={() => dispatch(setModalCreateUser(''))} className='w-full cursor-pointer rounded-md h-[50px] text-white mt-4  bg-blue-600 font-bold flex justify-center items-center '>
//             Create New User
//           </div>
//           <div onClick={()=>{}} className='w-full rounded-md h-[50px] text-white mt-4  bg-blue-600 font-bold flex justify-center items-center '>
//             test
//           </div>
//         </div>
//       </div>
//       {display && <ModalCreateUser />}
             
//     </div>
//   )
// }
