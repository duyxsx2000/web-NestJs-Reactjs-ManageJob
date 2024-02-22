import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'
// import Statistics from '../dashboards/admin/statistics/statistics'
import Manageusers from '../dashboards/admin/users/manageusers'
import AdminLayout from '../layouts/adminlayout'
import Jobs from '../dashboards/admin/jobs/jobs'
import TestApp from '../test'

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
                        <TestApp></TestApp>
                    </AdminLayout>
                }
            />
        </Routes>
    )
}


    


