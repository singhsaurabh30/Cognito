
import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null,
    isAuthenticated:false

}

const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn:(state,action)=>{
            state.user=action.payload.user;
            isAuthenticated:true;
        },
        userLoggedOut:(state)=>{
            state.user=null;
            isAuthenticated:false
        }

    }
});

export const {userLoggedIn,userLoggedOut}=authSlice.actions;
export default authSlice.reducer;