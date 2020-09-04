const initialState={
    requests:[]
}

export const requestReducer = (state=initialState, action:any)=>{
    switch(action.type){
        case 'CREATE_REQUEST':{
            return {
                ...state, 
                requests:[...state.requests, action.payload]

            }
           
        }
        default: return state
    }
}