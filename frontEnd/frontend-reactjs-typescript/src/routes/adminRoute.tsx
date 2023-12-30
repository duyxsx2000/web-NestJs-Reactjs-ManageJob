import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/login'
import { UserAuth } from '../types'
import HomePage from '../home/homePage'
import PostJob from '../admin/jobs/postJob'

import Dasboard from '../admin/dashboard/doasboard'
import Manageusers from '../admin/users/manageusers'

export const AdminRoute = ({}) => {

    return (
        <Routes>
            <Route
                path='/jobs'
                element= {<PostJob/>}
            />
            <Route
                path='/users'
                element= {<Manageusers/>}
            />
            <Route
                path='/dashboard'
                element= {<Dasboard/>}
            />
        </Routes>
    )
}


    


