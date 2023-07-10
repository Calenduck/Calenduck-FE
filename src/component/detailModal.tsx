import React, { useEffect, useState } from "react";
import "../css/modal.css";
import "../css/index.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer";
import { InfoObj } from "../redux/types";

const DetailModal = (props: any) => {
	const { open, close, id } = props;
	const navigate = useNavigate();
	const gotoWantList = () => {
		navigate("/wantList");
	};
	const detailInfo: any = useSelector(
		(state: RootState) => state.setDetailInfoReducer,
	);
	const initInfoObj: InfoObj = {
		poster: "",
		prfnm: "",
		prfcast: "",
		genrenm: "",
		fcltynm: "",
		dtguidance: "",
		prfpdfrom: "",
		prfpdto: "",
		pcseguidance: "",
		mt20id: "",
	};
	const [detailInfoState, setDetailInfoState] = useState(initInfoObj);
	useEffect(() => {
		if (detailInfo != null) {
			setDetailInfoState(detailInfo.payload);
		}
	}, [detailInfo]);
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "30%",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
		// overlay: {
		//   background: 'rgba(255, 255, 255, 0)',
		// },
	};
	console.log(detailInfoState);
	return (
		<div className=" rounded-xl">
			<Modal isOpen={open} style={customStyles}>
				<button className="to_right" onClick={close}>
					X
				</button>
				<div className="grid grid-cols-8">
					<img
						src={detailInfoState.poster}
						className="img-detail col-start-1 col-span-3"
					/>
					<div className="col-start-5 col-span-3">
						<div>공연명: {detailInfoState.prfnm}</div>
						<br />
						<div>공연 출연진: {detailInfoState.prfcast}</div>
						<br />
						<div>장르: {detailInfoState.genrenm}</div>
						<br />
						<div>장소: {detailInfoState.fcltynm}</div>
						<br />
						<div>공연 시간: {detailInfoState.dtguidance}</div>
						<br />
						<div>공연 시작일: {detailInfoState.prfpdfrom}</div>
						<br />
						<div>공연 종료일: {detailInfoState.prfpdto}</div>
						<br />
						<div>티켓 가격: {detailInfoState.pcseguidance}</div>
					</div>
				</div>

				<button
					className="to_right  bg-yellow-300 rounded-xl p-3"
					onClick={() => {
						close;
						gotoWantList();
					}}
				>
					내 캘린더 추가
				</button>
			</Modal>
		</div>
	);
};
export default DetailModal;
