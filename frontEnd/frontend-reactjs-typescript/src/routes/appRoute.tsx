import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../pages/homePage'

import DefaultLayout from '../layouts/defaultLayout'

import StartPage from '../pages/startPage'
import StartLayout from '../layouts/defaultLayoutz'
import RoomPage from '../pages/roomPage'
import ProfilePage from '../pages/profilePage'

type Props = {
    loading: "none" | "done" | "loading" | "signIn",
    profile: UserAuth | null,
    status: string,
};

type RoutesType = {
    path: string,
    element: JSX.Element,
    layout?: string
}
export const AppRoute = ({
    loading, 
    profile
}: Props) => {
    console.log(loading,'loading');
    console.log(profile,'profile');
    const role = profile?.role
    return (
        <Routes>
            <Route 
                path='/' 
                element= {
                    loading === "done" && profile ?  (
                        profile.role === 'admin' ? <Navigate to={'/manage/rooms'} replace/> : <Navigate to={'/profile'} replace/>
                    ) : (
                        <Navigate to={'/start'} replace/>
                    )       
                }
            />
            <Route 
                path='/start' 
                element= {
                    loading === 'none' ? (
                        <StartLayout><StartPage/></StartLayout>
                    ) : loading === 'signIn' ? (
                        <Navigate to={'/signIn'} replace/>
                    ) : loading === 'done' && (
                        profile?.role === 'admin' ? <Navigate to={'/manage/rooms'} replace/> : <Navigate to={'/profile'} replace/>
                    )
                }
            /> 
            <Route
                path='/signIn'
                element= {
                    loading != "done" ?
                    <StartLayout>
                        <Login/>
                    </StartLayout> : (    
                        <Navigate to={'/manage/rooms'} replace/>     
                    )
                }
            />
            <Route
                path='/manage/:key'
                element= {
                    loading === "none" ?
                    <Navigate to={'/signIn'} replace/> : (
                        <DefaultLayout>
                            <HomePage/>
                        </DefaultLayout>
                    )
   
                }
            />

            <Route
                path='/profile/:key'
                element= {
                    loading === "none" ?
                    <Navigate to={'/signIn'} replace/> : (
                        <DefaultLayout>
                            <ProfilePage/>
                        </DefaultLayout>
                    )
   
                }
            />
            <Route
                path='/room/:id'
                element= {
                    loading === "none" ?
                    <Navigate to={'/signIn'} replace/> : (
                        <DefaultLayout>
                            <RoomPage/>
                        </DefaultLayout>
                    )
   
                }
            />
           
        </Routes>
    )
}


    

