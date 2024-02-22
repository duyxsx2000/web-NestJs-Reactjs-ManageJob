import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'
import { AdminRoute } from './adminRoute'
import DefaultLayout from '../layouts/defaultLayout'
import LeaderPage from '../dashboards/leader/leaderPage'

type Props = {
    loading: "none" | "done" | "loading",
    profile: UserAuth | null,
    status: string,

}

export const AppRoute = ({
    loading, 
    profile
}: Props) => {
    console.log(loading);
    console.log(profile);
    const role = profile?.role
    return (
        <Routes>
            <Route 
                path='/' 
                element= {
                    loading === "done" ? (     
                        <DefaultLayout>
                            <Navigate to={'/home'} replace/>
                        </DefaultLayout>
                    ) :
                    <Navigate to={'/login'} replace/>  
                 }
            />
            <Route
                path='/login'
                element= {
                    loading != "done" ?
                    <Login/> : (
                        <DefaultLayout>
                            <Navigate to={'/home'} replace/>
                        </DefaultLayout>
                    )
                }
            />
            <Route
                path='/home'
                element= {
                    loading === "none" ?
                    <Navigate to={'/login'} replace/> : (
                        <DefaultLayout>
                            <HomePage/>
                        </DefaultLayout>
                    )
   
                }
            />
            <Route
                path='/admin/*'
                element= {
                    loading != "done" ? (
                        <Login/>
                    ) : role != 'admin' ? (
                        <Navigate to={'/'} replace/>
                    ) : (
                        <DefaultLayout>
                             <AdminRoute></AdminRoute>  
                        </DefaultLayout>
                    )
                      
                }
            />
            <Route
                path='/leader'
                element = {
                    loading != "done" ? (
                        <Login/>
                    ) : role != 'leader' ? (
                        <Navigate to={'/'} replace/>
                    ) : (
                        <DefaultLayout>
                             <LeaderPage/>  
                        </DefaultLayout>
                    )    
                }
            />
           
        </Routes>
    )
}


    

