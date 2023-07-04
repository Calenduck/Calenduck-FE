import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer";
import { getLoginAction } from "../redux/actions";

import "../css/index.css";

export default () => {
    const dispatch=useDispatch()

    useEffect(()=>{
		const code:string = new URL(window.location.href).searchParams.get("code")!;
		console.log(code);
        dispatch(getLoginAction(code))
	},[])
    return(<div>
        test
    </div>)
}