import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'
import Dasboard from '../admin/dashboard/doasboard'
import Manageusers from '../admin/users/manageusers'
import AdminLayout from '../layouts/adminlayout'
import Jobs from '../admin/jobs/jobs'

export const AdminRoute = ({}) => {

    return (
        <Routes>
            <Route
                path='/'
                element= {<Navigate to={'/home'} replace/>}
            />
            <Route
                path='/jobs'
                element= {
                    <AdminLayout statusStart='JOBS'>
                        <Jobs/>
                    </AdminLayout>
                }
            />
            <Route
                path='/users'
                element= {
                    <AdminLayout statusStart='USERS'>
                        <Manageusers/>
                    </AdminLayout>
                }
            />
            <Route
                path='/dashboard'
                element= {
                    <AdminLayout statusStart='DASHBOARD'>
                        <Dasboard/>
                    </AdminLayout>
                }
            />
        </Routes>
    )
}


    


