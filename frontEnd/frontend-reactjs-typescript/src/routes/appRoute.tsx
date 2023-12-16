import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'

type Props = {
    loading: "none" | "done" | "loading",
    userAuth: UserAuth | null,
    status: string
}

export const AppRoute = ({
    loading, 
    userAuth
}: Props) => {
    return (
        <Routes>
            <Route 
                path='/' 
                element= {
                    loading === "none" ?
                    <Navigate to={'/login'} replace/> :
                    <Navigate to={'/home'} replace/>    
                }
            />
            <Route
                path='/login'
                element= {
                    loading === "none" ?
                    <Login/> :
                    <Navigate to={'/home'} replace/>
                }
            />
            <Route
                path='/home'
                element= {
                    loading === "none" ?
                    <Navigate to={'/login'} replace/> :
                    <HomePage/>    
                }
            />

        </Routes>
    )
}


    


