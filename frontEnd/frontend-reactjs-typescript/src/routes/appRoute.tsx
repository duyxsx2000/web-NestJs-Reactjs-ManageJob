import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'
import { AdminRoute } from './adminRoute'

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
                        <HomePage/>
                    )
   
                }
            />
            <Route
                path='/admin/*'
                element= {
                    loading != "done" ?
                    <Login/> :
                    <AdminRoute></AdminRoute>     
                }
            />
           
        </Routes>
    )
}


    

