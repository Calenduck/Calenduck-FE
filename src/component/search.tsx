import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { RootState } from "../redux/reducer";
import SaveModal from "./saveModal";
import SaveSearchModal from "./saveSearchModal";

import "../css/calendar.css";
import { stringify } from "querystring";
import { InfoObj } from "../redux/types";
import { addDays, addHours, format, setHours } from "date-fns";
//const cx = classNames.bind(style);
const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
const Search = () => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	const searchInfo: any = useSelector(
		async (state: RootState) => await state.getSearchReducer,
	);
	// useEffect(() => {
	// 	console.log(searchInfo)
	// }, [searchInfo]);
	const nowDay = new Date();
	const today = {
		year: new Date().getFullYear(), //오늘 연도
		month: new Date().getMonth() + 1, //오늘 월
		date: new Date().getDate(), //오늘 날짜
		day: new Date().getDay(), //오늘 요일
	};
	const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
	const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
	const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
	const [selectedDay, setSelectedDay] = useState(0); //현재 선택된 달
	const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
	const [searchInfoState, setSearchInfoState] = useState<Array<InfoObj>>();
	const [modalSaveOpen, setModalSaveOpen] = useState(false);
	const [showRange, setShowRange] = useState("Month");
	const [allDayOpen, setAllDayOpen] = useState(true);
	const [weekDayOpen, setWeekDayOpen] = useState(false);
	const [searchSelected, setSearchSelected] = useState();
	const [renderWantInfoState, setRenderWantInfoState] = useState<Array<any>>(
		new Array(32),
	);
	let wantListStatePromise: any = [1];

	const closeSaveModal = () => {
		setModalSaveOpen(false);
	};
	const showSaveModal = () => {
		setModalSaveOpen(!modalSaveOpen);
		console.log(modalSaveOpen);
	};
	useEffect(() => {
		async function fetchWant() {
			if ((await searchInfo) != null) {
				wantListStatePromise = await searchInfo;
				if (wantListStatePromise.type == "GET_SEARCH_SUCCESS")
					//console.log(wantListStatePromise.payload.data.data)
					await setSearchInfoState(wantListStatePromise.payload.data.data);
			}
		}

		fetchWant();
	}, [searchInfo]);

	useEffect(() => {
		checkId();
		//console.log(localStorage.getItem("jwt"));
	}, [searchInfoState]);
	useEffect(() => {
		checkId();
	}, [selectedMonth]);
	useEffect(() => {
		checkId();
	}, [showRange]);
	const buttonClicked=(e: any)=> {
		setSearchSelected(e);
		setModalSaveOpen(!modalSaveOpen);
        console.log(modalSaveOpen)
	}
	const checkId = () => {
		console.log(searchInfoState);
		if (searchInfoState) {
			for (let i = 0; i < searchInfoState.length; i++) {
				const ssplit = searchInfoState[i]!.stdate!.split(".")!;

				const syaer = ssplit[0];
				const smonth = ssplit[1];
				const sday = ssplit[2];
				let sDate = new Date();
				sDate.setFullYear(parseInt(syaer));
				sDate.setMonth(parseInt(smonth) - 1);
				sDate.setDate(parseInt(sday));

				const esplit = searchInfoState[i]!.eddate!.split(".")!;

				const eyaer = esplit[0];
				const emonth = esplit[1];
				const eday = esplit[2];
				const eDate = new Date();
				eDate.setFullYear(parseInt(eyaer));
				eDate.setMonth(parseInt(emonth) - 1);
				eDate.setDate(parseInt(eday));

				let element;
				// for(let j=0;j<(eDate.getTime()-sDate.getTime())/(1000*60*60*24);j++) {
				while (sDate <= eDate) {
					// console.log(sDate);
					// console.log(eDate);
					// console.log(
					// 	String(sDate.getDate()) +
					// 		String(sDate.getFullYear()) +
					// 		String(sDate.getMonth() + 1),
					// );
					element = document.getElementById(
						String(sDate.getDate()) +
							String(sDate.getFullYear()) +
							String(sDate.getMonth() + 1),
					);
					if (element) {
						// const name = `<div style='font-size:10px; padding:0px; height:20px'>${searchInfoState[i].prfnm}</div>`;
						const div = document.createElement("div");
						div.innerText = searchInfoState[i].prfnm!;
						div.onclick = () => {
							buttonClicked(searchInfoState[i]);
						};
						div.style.fontSize = "10px";
						div.style.height = "20px";
						div.style.padding = "0px";
						element.appendChild(div);
					}
					sDate = addDays(sDate, 1);
				}
			}
		}
	};

	const prevMonth = useCallback(() => {
		//이전 달 보기 보튼
		if (selectedMonth === 1) {
			setSelectedMonth(12);
			setSelectedYear(selectedYear - 1);
		} else {
			setSelectedMonth(selectedMonth - 1);
		}
	}, [selectedMonth]);

	const nextMonth = useCallback(() => {
		//다음 달 보기 버튼
		if (selectedMonth === 12) {
			setSelectedMonth(1);
			setSelectedYear(selectedYear + 1);
		} else {
			setSelectedMonth(selectedMonth + 1);
		}
	}, [selectedMonth]);

	const monthControl = useCallback(() => {
		//달 선택박스에서 고르기
		const monthArr = [];
		for (let i = 0; i < 12; i++) {
			monthArr.push(
				<option key={i + 1} value={i + 1}>
					{i + 1}월
				</option>,
			);
		}
		return (
			<select onChange={changeSelectMonth} value={selectedMonth}>
				{monthArr}
			</select>
		);
	}, [selectedMonth]);

	const yearControl = useCallback(() => {
		//연도 선택박스에서 고르기
		const yearArr = [];
		const startYear = today.year - 10; //현재 년도부터 10년전 까지만
		const endYear = today.year + 10; //현재 년도부터 10년후 까지만
		for (let i = startYear; i < endYear + 1; i++) {
			yearArr.push(
				<option key={i} value={i}>
					{i}년
				</option>,
			);
		}
		return (
			<select
				// className="yearSelect"
				onChange={changeSelectYear}
				value={selectedYear}
			>
				{yearArr}
			</select>
		);
	}, [selectedYear]);

	const changeSelectMonth = (e: any) => {
		setSelectedMonth(Number(e.target.value));
	};
	const changeSelectYear = (e: any) => {
		setSelectedYear(Number(e.target.value));
	};

	const returnWeek = useCallback(() => {
		//요일 반환 함수
		const weekArr: any = [];
		week.forEach((v) => {
			weekArr.push(
				<div className="day bg-yellow-300 text-center" key={v}>
					{v}
				</div>,
			);
		});
		return weekArr;
	}, []);
	const onClickDate = (e: any) => {
		console.log(e);
	};

	const returnWeekDay = () => {
		const weekdayArr = [];

		console.log(today.day);
		const tmpday: Date = addDays(nowDay, today.day * -1);
		for (let i = 0; i < 7; i++) {
			weekdayArr.push(
				<div
					id={
						String(tmpday.getDate() + i) +
						String(today.year) +
						String(today.month)
					}
					className=" border h-[200px]"
				>
					<div className=" bg-yellow-300">
						{String(tmpday.getDate() + i)}
						{week[i]}
					</div>
				</div>,
			);
		}
		return weekdayArr;
	};
	const returnDayDay = () => {
		return (
			<div
				id={String(today.date) + String(today.year) + String(today.month)}
				className="border w-full h-[400px]"
			>
				<div className=" bg-yellow-300">{String(today.date)}</div>
			</div>
		);
	};
	const calenderHover = (day: number, year: number, month: number) => {
		const btn = document.getElementById(
			String(day) + String(year) + String(month) + "+",
		);
		if (btn) {
			btn.style.visibility = "visible";
		}
	};
	const calenderLeave = (day: number, year: number, month: number) => {
		const btn = document.getElementById(
			String(day) + String(year) + String(month) + "+",
		);
		if (btn) {
			btn.style.visibility = "hidden";
		}
	};
	const returnDay = useCallback(() => {
		//선택된 달의 날짜들 반환 함수
		const dayArr = [];

		for (const nowDay of week) {
			const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
			//console.log(wantListI)
			if (week[day] === nowDay) {
				for (let i = 0; i < dateTotalCount; i++) {
					dayArr.push(
						<div
							key={String(i + 1) + String(selectedYear) + String(selectedMonth)}
							className="weekday border  bg-gray-300"
							id={String(i + 1) + String(selectedYear) + String(selectedMonth)}
							onMouseOver={() => {
								calenderHover(i + 1, selectedYear, selectedMonth);
							}}
							onMouseLeave={() => {
								calenderLeave(i + 1, selectedYear, selectedMonth);
							}}
                            onClick={()=>{setModalSaveOpen(!modalSaveOpen)}}
							//   className={cx(
							//     {
							//       //오늘 날짜일 때 표시할 스타일 클라스네임
							//       today:
							//         today.year === selectedYear &&
							//         today.month === selectedMonth &&
							//         today.date === i + 1,
							//     },
							//     { weekday: true }, //전체 날짜 스타일
							//     {
							//       //전체 일요일 스타일
							//       sunday:
							//         new Date(
							//           selectedYear,
							//           selectedMonth - 1,
							//           i + 1
							//         ).getDay() === 0,
							//     },
							//     {
							//       //전체 토요일 스타일
							//       saturday:
							//         new Date(
							//           selectedYear
							//           selectedMonth - 1,
							//           i + 1
							//         ).getDay() === 6,
							//     }
							//   )}
						>
							<div className="grid grid-cols-8">
								<button
									className="btn-hide border col-start-1 h-[0px] w-[0px] bg-white"
									id={
										String(i + 1) +
										String(selectedYear) +
										String(selectedMonth) +
										"+"
									}
									onClick={() => {
										onClickDate(i + 1);

										setSelectedDay(i + 1);
									}}
								>
									{/* <div className="-mt-5">+</div> */}
								</button>
								<div className="col-start-7 text-xs">{i + 1}</div>
							</div>

							{/* {wantInfoState[wantI] != undefined ? (
								<div>{wantInfoState[wantI].prfnm}</div>
							) : (
								""
							)} */}
						</div>,
					);
					//	}
				}
			} else {
				dayArr.push(<div className="weekday"></div>);
			}
		}

		return dayArr;
	}, [selectedYear, selectedMonth, dateTotalCount]);
	const mwdSelect = (mwd: string) => {
		setShowRange(mwd);
	};
	return (
		<div className="container w-3/6">
			<div className="title">
				<h3>
					{yearControl()}년 {monthControl()}월
				</h3>
				<div className="pagination">
					<button onClick={prevMonth}>◀︎</button>
					<button onClick={nextMonth}>▶︎</button>
				</div>
			</div>
			<div>
				<div className="week">{returnWeek()}</div>
				<div className="date bg-gray-400" ref={ref}>
					{returnDay()}
				</div>
			</div>
			<SaveSearchModal
				open={modalSaveOpen}
				close={closeSaveModal}
				year={selectedYear}
				month={selectedMonth}
				day={selectedDay}
				searchState={searchSelected}
			/>
		</div>
	);
};

export default Search;
