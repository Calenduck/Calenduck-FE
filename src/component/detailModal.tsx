import React, { useEffect, useState } from "react";
import "../css/modal.css";
import "../css/index.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const DetailModal = (props: any) => {
	const { open, close, id } = props;
	const navigate = useNavigate();
	const gotoWantList = () => {
		navigate("/wantList");
	};
	return (
		<div>
			<Modal isOpen={open}>
				<button className="to_right" onClick={close}>
					X
				</button>
				<div className="flex">
					<div className="img item_style">img</div>
					<div>공연 정보</div>
				</div>

				<button
					className="to_right"
					onClick={() => {
						close;
						gotoWantList();
					}}
				>
					저장
				</button>
			</Modal>
		</div>
	);
};
export default DetailModal;
