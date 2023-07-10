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
import { addDays, addHours, format, setHours } from "date-fns";
import "../css/index.css";
import logo from "../assets/logo.png";

export default () => {
	const dispatch = useDispatch();
	const totalListState: any = useSelector(
		(state: RootState) => state.getTotalCheckReducer,
	);
	const getLoginJwt = useSelector((state: RootState) => state.getLoginReducer);
	let totalListStatePromise: any = [];
	const today = new Date();
	const [totalList, setTotalList] = useState(["1", "2", "3"]);
	const [checkJwt, setCheckJwt] = useState(false);
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
					const dataList: Array<any> = totalListStatePromise.payload.data.data;
					const tArr = [];
					for (let i = 0; i < dataList.length; i++) {
						const tmpSplit = dataList[i].stdate.split(".");
						const y = tmpSplit[0];
						const m = tmpSplit[1];
						const d = tmpSplit[2];
						const newDay = new Date();
						const wbDay = addDays(newDay, -7);
						newDay.setFullYear(parseInt(y));
						newDay.setMonth(parseInt(m));
						newDay.setDate(parseInt(d));
						dataList[i].stdate = newDay;
						if (newDay >= wbDay && newDay < today && tArr.length < 4) {
							tArr.push(dataList[i]);
						}
					}
					setTotalList(tArr);
					// dataList.sort((a: any, b: any) => {
					// 	return b.stdate - a.stdate;
					// });
					// console.log(dataList);
				}
			}
		}
		fetchTotal();
	}, [totalListState]);
	useEffect(() => {
		const getJwt = localStorage.getItem("jwt");
		if (getJwt) {
			setCheckJwt(true);
		}
		//
	}, []);
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
	const onClickLogout = () => {
		localStorage.removeItem("jwt");
		location.reload();
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
			poster: key.poster,
			prfnm: key.prfnm,
			prfcast: key.prfcast,
			genrenm : key.genrenm,
			fcltynm:key.fcltynm,
			dtguidance : key.dtguidance,
			prfpdfrom: key.prfpdfrom,
			prfpdto: key.prfpdto,
			pcseguidance:key.pcseguidance,
			mt20id: key.mt20id,
		};
		console.log(key);
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
		><img src={key.poster} className="img "></img>
			{key.prfnm}
			
		</div>
	));

	return (
		<div>
			<div className="center_aligin">
				<LoginModal open={modalLoginOpen} close={closeLoginModal} />
				<DetailModal open={modalDetailOpen} close={closeDetailModal} id={"1"} />
				<div className="grid grid-cols-8">
					{checkJwt ? (
						<div className="col-start-7">
							<div>마이페이지</div>
							<div onClick={() => onClickLogout()}>로그아웃</div>
						</div>
					) : (
						<button onClick={showLoginModal} className="col-start-7">
							login
						</button>
					)}
				</div>
				<div className=" grid-cols-8">
					<img src={logo} className="col-span-2 w-[200px] p-5" />
					<div className="-mt-20 col-span-4 ">
						<Box
							component="form"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "60ch" },
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
					</div>
				</div>

				<div className="spacer"></div>
				<div className="title_sub center-align bg-yellow-300">장르1 </div>

				<div className="flex">{infoListMap}</div>
				{/* <div className="title_sub center-align">장르2</div>
				<div className="flex">{infoListMap}</div> */}
			</div>
		</div>
	);
};
