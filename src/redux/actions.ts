import { ActionType } from "./types"

const getApi=()=>{
    return{
        type:ActionType.GET_API,
    }
}

type ActionObject=
|ReturnType<typeof getApi>

export {getApi}
export type{ActionObject}