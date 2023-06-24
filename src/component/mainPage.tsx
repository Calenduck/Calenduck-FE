import React, { useEffect, useState } from "react";
import axios from "axios";
import { response } from "express";
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
	const dispatch = useDispatch();
	const totalListState: any = useSelector(
		(state: RootState) => state.getTotalCheckReducer,
	);
	let totalListStatePromise: any = [];

	const [totalList, setTotalList] = useState(["1", "2", "3"]);
	//var totalList = ['1','2','3'];
	useEffect(() => {
		dispatch(getTotalCheck());
	}, []);
	useEffect(() => {
		async function fetchTotal() {
			if ((await totalListState) != undefined) {
				totalListStatePromise = await totalListState;
				if (totalListStatePromise.type == "GET_TOTAL_CHECK_SUCCESS") {
					console.log(totalListStatePromise.payload.data.data);
					setTotalList(totalListStatePromise.payload.data.data);
				}
			}
		}
		fetchTotal();
	}, [totalListState]);

	const [modalLoginOpen, setModalLoginOpen] = useState(false);
	const [modalDetailOpen, setModalDetailOpen] = useState(false);

	const showLoginModal = () => {
		setModalLoginOpen(!modalLoginOpen);
	};
	const showDetailModal = () => {
		setModalDetailOpen(!modalLoginOpen);
	};
	const closeLoginModal = () => {
		setModalLoginOpen(false);
	};
	const closeDetailModal = () => {
		setModalDetailOpen(false);
	};

	const setDetailInfoState = (key: any) => {
		// const selectedObj: InfoObj = {
		// 	poster : key.poster,
		// 	prfnm : key.prfnm,
		// 	prfcast : key.prfcast,
		// 	genrenm : key.genrenm,
		// 	fcltynm:key.fcltynm,
		// 	dtguidance : key.dtguidance,
		// 	stdate : key.stdate,
		// 	eddate: key.eddate,
		// 	pcseguidance:key.pcseguidance,
		// 	mt20id:key.mt20id
		// };
		const selectedObj: InfoObj = {
			poster : key.poster,
			prfnm : key.prfnm,
			prfcast : key.prfcast,
			// genrenm : key.genrenm,
			// fcltynm:key.fcltynm,
			// dtguidance : key.dtguidance,
			// stdate : key.stdate,
			// eddate: key.eddate,
			// pcseguidance:key.pcseguidance,
			mt20id:key.mt20id
		};
		console.log(key)
		dispatch(setDetailInfo(selectedObj));
	};

	const infoListMap = totalList.map((key: any) => (
		<div
			key={key}
			className="item_style"
			onClick={() => {
				showDetailModal();
				setDetailInfoState(key);
			}}
		>
			{key.prfnm}
			<img src={key.poster} className="img"></img>
		</div>
	));

	return (
		<div>
			<div>Test </div>
			<button onClick={showLoginModal}>login</button>

			<div className="center_aligin">
				<LoginModal open={modalLoginOpen} close={closeLoginModal} />
				<DetailModal open={modalDetailOpen} close={closeDetailModal} id={"1"} />
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "100ch" },
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
					<TextField id="standard-search" type="search" variant="standard" />
				</Box>
				<div className="spacer"></div>
				<div className="title_sub center-align">장르1 </div>

				<div className="flex">{infoListMap}</div>
				<div className="title_sub center-align">장르2</div>
				<div className="flex">{infoListMap}</div>
			</div>
		</div>
	);
};
