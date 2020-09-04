const initialState={
    locations:[]
}

export const locationReducer=(state=initialState, action:any)=>{
    switch (action.type){
        case 'ADD_LOCATION':{
            return{
                ...state,
                locations:[...state.locations, action.payload]
            }
        }
        default: return state
    }
}