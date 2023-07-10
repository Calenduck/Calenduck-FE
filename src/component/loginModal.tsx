import React, { useEffect, useState } from "react";
import "../css/modal.css";
import Modal from "react-modal";
import loginLogo from "../assets/loginLogo.png";
import kakaoLogo from "../assets/kakao.png";

const loginModal = (props: any) => {
	const { open, close } = props;
	const kakao_api_key = process.env.REACT_APP_KAKAO_KEY;
	//const redirect_uri = 'http://localhost:8080/users/kakao/login' //Redirect URI
	const redirect_uri = "http://localhost:3000/auth"; //Redirect URI

	// oauth 요청 URL
	const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
	const handleKakaoLogin = () => {
		window.location.href = kakaoURL;
	};
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
		// overlay: {
		//   background: 'rgba(255, 255, 255, 0)',
		// },
	};
	return (
		<div>
			<Modal isOpen={open} style={customStyles}>
				<div className="grid grid-cols-8">
					{" "}
					<button onClick={close} className="col-start-7">
						X
					</button>
				</div>
				<img src={loginLogo} className="p-10 w-[300px]" />
				<div className="mb-5">SNS 로그인으로 간편하게 이용하세요!</div>
				<div className="grid grid-cols-4">
					<button className="col-start-1">구글 로그인</button>
					<button onClick={handleKakaoLogin} className="col-start-2">
						<img src={kakaoLogo} className="w-[50px]" />
					</button>
				</div>
			</Modal>
		</div>
	);
};
export default loginModal;
