import {createSlice} from "@reduxjs/toolkit";

export const characterSlice = createSlice({
    name:"character",
    initialState:{
        name:"",
        value:{}
    },
    reducers:{
        updateCharacter: (state,action) => {
            state.value = action.payload
        },
        updateCharacterGold:(state,action) => {
            state.value.gold = action.payload
        },
        updateCharacterHp:(state,action) => {
            state.value.health = action.payload
        }



    }
})

//export methods to update state
export const {updateCharacter,updateCharacterGold,updateCharacterHp} = characterSlice.actions

export default characterSlice.reducer