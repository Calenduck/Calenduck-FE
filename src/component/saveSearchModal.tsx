import React, { useEffect, useState } from "react";
import "../css/modal.css";
import "../css/index.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer";
import { InfoObj } from "../redux/types";
import { postWantAdd } from "../redux/actions";

const SaveSearchModal = (props: any) => {
	const { open, close, year,month,day,searchState } = props;
	const dispatch = useDispatch();
    const navigate = useNavigate();
	const saveWantList = () => {
		//console.log(year)
		dispatch(postWantAdd(detailInfoState.mt20id!, year, month, day));
        navigate("/wantList");
		//location.reload()
	};

	const initInfoObj: InfoObj = {
		poster: "",
		prfnm: "",
		prfcast: "",
		mt20id: "",
	};
	const [detailInfoState, setDetailInfoState] = useState(initInfoObj);
	useEffect(() => {
		console.log(searchState)
        if (searchState != null) {
			setDetailInfoState(searchState);
		}
	}, [searchState]);

	return (
		<div>
			<Modal isOpen={open}  ariaHideApp={false} appElement={document.getElementById('root') as HTMLElement}>
				<button className="to_right" onClick={close}>
					X
				</button>
				<div className="grid grid-cols-2">
					<div className="row col-span-1 ">
						<div className="grid grid-cols-4">
							<div className="col-span-1"> 공연정보</div>
							<div className="col-span-2">{detailInfoState.prfnm}</div>
						</div>
						<div className="grid grid-cols-4">
							<div className="col-span-1"> 장소</div>
							<div className="col-span-2">{detailInfoState.prfnm}</div>
						</div>
						<div className="grid grid-cols-4">
							<div> 설명</div>
							<div>
								<input className="w-[300px] border h-[300px]"></input>
							</div>
						</div>
						<div className="grid grid-cols-4">
							<div> 알림</div>
							<div>
								<select className="border">
									<option>3일전</option>
									<option>1일전</option>
								</select>
							</div>
						</div>
						<button className="border">알림추가</button>
					</div>

					<div className="row col-span-1 flip-card">
						<div className="flip-card-inner">
							<div className="flip-card-front">
								<img src={detailInfoState.poster} className="img w-[500px]" />
							</div>
							<div className="flip-card-back">
								<div>{detailInfoState.prfnm}</div>
								<div>{detailInfoState.prfcast}</div>
								<div>{detailInfoState.genrenm}</div>
								<div>{detailInfoState.fcltynm}</div>
								<div>{detailInfoState.prfpdfrom}</div>
							</div>
						</div>
						<div>공연 상세정보는 포스터를 클릭해주세요!</div>
					</div>
					<div>공연 상세정보는 포스터를 클릭해주세요!</div>
					{/* <div>{detailInfoState.prfcast}</div> */}
				</div>

				<button
					className="to_right"
					onClick={() => {
						close;
						saveWantList();
					}}
				>
					저장
				</button>
			</Modal>
		</div>
	);
};
export default SaveSearchModal;
