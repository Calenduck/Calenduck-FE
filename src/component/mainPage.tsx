import React ,{useEffect,useState}from 'react';
import axios from "axios";
import { response } from 'express';
import { useSelector, useDispatch } from "react-redux";
import { getApi } from '../redux/actions';
import { RootState } from '../redux/reducer';
import LoginModal from './loginModal';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "../css/index.css";

export default () => {
    const dispatch = useDispatch()
    //const listState=useSelector((state:RootState)=>state.getApiReducer)
    useEffect(()=>{
        //dispatch(getApi())
    
    },[]);
    const [modalLoginOpen, setModalLoginOpen] = useState(false);

    const showLoginModal=()=>{
      
      setModalLoginOpen(!modalLoginOpen);
    }
    const closeLoginModal=()=>{
      
      setModalLoginOpen(false);
    }

    const tmpList=["1","2","3"]
    const infoListMap=tmpList.map((key)=>
      (<div key={key} className='item_style'>
        {key}
        </div>
        )
    )

    return(
        <div >
       
          <div >Test </div>
          <button onClick={showLoginModal}>login</button>
         
         <div className="center_aligin">
          <LoginModal open={modalLoginOpen} close={closeLoginModal}/>
          <Box
          component="form"
          sx={{
              '& .MuiTextField-root': { m: 1, width: '100ch' },
          }}
          noValidate
          autoComplete="off"
          >
          
          <FormControl sx={{ m: 1, minWidth: 20 }}>
              {/* <NativeSelect
                  defaultValue={"none"}
                  inputProps={{
                      name: 'category',
                      id: 'uncontrolled-native',
                  }}
              >
                  <option value={"none"}>통합검색</option>
                  <option value={"title"}>제목</option>
                  <option value={"publisher"}>출판사</option>
                  <option value={"chapter"}>단원</option>
              </NativeSelect> */}
            </FormControl>
            <SearchIcon />
              <TextField
                  id="standard-search"
                    type="search"
                    variant="standard"
              />
            </Box>
            <div className='spacer'
            ></div>
            <div className='title_sub center-align'>
              장르
            </div>
            <div className='flex'>
              {infoListMap}
            </div>
            <div className='title_sub center-align'>
              장르
            </div>
            <div className='flex'>
              {infoListMap}
            </div>
         </div>
          
      </div>
    )
}
