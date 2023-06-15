import React ,{useEffect,useState}from 'react';
import '../css/modal.css'
import Modal from 'react-modal';

const loginModal=(props:any)=> {
  
    const{open,close}=props


    return (
        <div >
          <Modal isOpen={open} > 
          <button onClick={close}>
            X
          </button>
          <div>
            로그인 모달
          </div>
          
          </Modal>
        </div>
    );
}
export default loginModal;