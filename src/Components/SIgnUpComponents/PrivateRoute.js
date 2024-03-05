import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { auth } from '../../FireBaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader';

function PrivateRoute() {
 
    const [user,loading,error] = useAuthState(auth);  
    
    if(loading){
        return <Loader/>
    }else if(!user || error){
        return <Navigate to="/"/>
    }else{
        return <Outlet/>
    }
    
}

export default PrivateRoute;