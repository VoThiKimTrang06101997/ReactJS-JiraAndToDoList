import React from 'react'
import styleLoading from "./LoadingComponent.module.css";
import imgLoading from "../../../assets/imgLoading/loading.gif";
import { useSelector } from 'react-redux';


export default function LoadingComponent() {
    const {isLoading} = useSelector(state => state.LoadingReducer);
    if(isLoading ) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={imgLoading} alt="" />
            </div>
        )
    }else {
        return ""
    }
   
}
