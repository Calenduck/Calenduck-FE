import React ,{useEffect,useState}from 'react';
import axios from "axios";
import { response } from 'express';
import { useSelector, useDispatch } from "react-redux";
import { getApi } from '../redux/actions';
import { RootState } from '../redux/reducer';
import LoginModal from './loginModal';

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

    return(
        <div className="users">
       
          <div >Test </div>
          <button onClick={showLoginModal}>login</button>
         
          <LoginModal open={modalLoginOpen} close={closeLoginModal}/>
         
          
      </div>
    )
}
