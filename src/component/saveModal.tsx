import React, { useEffect, useState } from "react";
import "../css/modal.css";
import "../css/index.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer";
import { InfoObj } from "../redux/types";
import { postWantAdd} from "../redux/actions";



const SaveModal = (props: any) => {
	const { open, close, id } = props;
    const dispatch = useDispatch();
	const saveWantList = () => {
		dispatch(postWantAdd("test","2023","06","30"))
	};
	const detailInfo: any = useSelector(
		(state: RootState) => state.setDetailInfoReducer,
	);
	const initInfoObj:InfoObj={
		poster:"",
		prfnm:"",
		prfcast:"",
		mt20id:""
	}
	const [detailInfoState, setDetailInfoState] = useState(initInfoObj);
	useEffect(() => {
		if(detailInfo!=null){
			setDetailInfoState(detailInfo.payload)
            console.log(detailInfo)
		}
		
		
	}, [detailInfo]);
	

	return (
		<div>
			<Modal isOpen={open}>
				<button className="to_right" onClick={close}>
					X
				</button>
				<div className="flex">
					<img src={detailInfoState.poster} className="img"/>
					<div>{detailInfoState.prfnm}</div>
					<div>{detailInfoState.prfcast}</div>
				</div>
                <div>설명<input></input></div>
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
export default SaveModal;
