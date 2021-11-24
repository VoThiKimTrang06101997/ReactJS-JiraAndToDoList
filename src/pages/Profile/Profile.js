import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Profile(props) {
    if(localStorage.getItem("userLogin")) {
        return (
            <div>
                Profile
            </div>
        ) 
    } else {
        alert("Vui lòng đăng nhập để vào trang này !!");
        return <Redirect to="/login" />
    }
   
}
