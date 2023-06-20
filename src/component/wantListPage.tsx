import React, { useEffect, useState } from "react";
import Calendar from "./canlendar";
import { useNavigate } from "react-router-dom";


const wantListPage =()=>{

    return(
        <div>
            <Calendar/>
        </div>
    )
}
export default wantListPage;