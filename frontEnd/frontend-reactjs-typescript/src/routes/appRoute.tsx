import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'
import PostJob from '../admin/jobs/postJob'
import AdminPage from '../admin/adminPage'
import DefaultLayout from '../layouts/defaultLayout'
import Dasboard from '../admin/dashboard/doasboard'

type Props = {
    loading: "none" | "done" | "loading",
    userAuth: UserAuth | null,
    status: string
}

export const AppRoute = ({
    loading, 
    userAuth
}: Props) => {
    console.log(loading);
    
  
    return (
        <Routes>
            <Route 
                path='/' 
                element= {
                    loading === "done" ?
                    <Navigate to={'/home'} replace/> :
                    <Navigate to={'/login'} replace/>         
                }
            />
            <Route
                path='/login'
                element= {
                    loading != "done" ?
                    <Login/> :
                    <Navigate to={'/home'} replace/>
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
                path='/admin'
                element= {
                    loading === "none" ?
                    <Navigate to={'/login'} replace/> : (
                        <DefaultLayout>
                            <AdminPage>
                                <Dasboard/>
                            </AdminPage>
                        </DefaultLayout> 
                    )
                        
                }
            />
            <Route
                path='/admin/*'
                element= {
                    loading === "none" ?
                    <Navigate to={'/login'} replace/> : (
                        <DefaultLayout>
                            <AdminPage>
                                <></>
                            </AdminPage>
                        </DefaultLayout> 
                    )
                        
                }
            />
            
        </Routes>
    )
}


    

