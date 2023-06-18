import React, { useEffect, useState } from "react";
import "../css/modal.css";
import Modal from "react-modal";

// const kakaoLogin=()=>{

//     const Rest_api_key='REST API KEY' //REST API KEY
//     const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
//     // oauth 요청 URL
//     const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${'b0eb227d20bd3e34f8503571dbf24772'}&redirect_uri=${redirect_uri}&response_type=code`
//     const handleLogin = ()=>{
//         window.location.href = kakaoURL
//     }
//     handleLogin()
//     const code = new URL(window.location.href).searchParams.get("code");
//     console.log(code)
// }

const loginModal = (props: any) => {
	const { open, close } = props;
	const Rest_api_key = "REST API KEY"; //REST API KEY
	//const redirect_uri = 'http://localhost:8080/users/kakao/login' //Redirect URI
	const redirect_uri = "http://localhost:3000/auth"; //Redirect URI

	// oauth 요청 URL
	const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=b0eb227d20bd3e34f8503571dbf24772&redirect_uri=${redirect_uri}&response_type=code`;
	const handleKakaoLogin = () => {
		window.location.href = kakaoURL;
	};
	const code = new URL(window.location.href).searchParams.get("code");
	console.log(code);

	return (
		<div>
			<Modal isOpen={open}>
				<button onClick={close}>X</button>
				<div>로그인 모달</div>
				<button onClick={handleKakaoLogin}>카카오 로그인</button>
				<button>구글 로그인</button>
			</Modal>
		</div>
	);
};
export default loginModal;
