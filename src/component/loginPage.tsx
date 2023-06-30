import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer";
import LoginModal from "./loginModal";
import DetailModal from "./detailModal";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { getTotalCheck, setDetailInfo } from "../redux/actions";
import { InfoObj } from "../redux/types";
import "../css/index.css";

export default () => {
    useEffect(()=>{
		const code = new URL(window.location.href).searchParams.get("code");
		console.log(code);
	},[])
    return(<div>
        test
    </div>)
}