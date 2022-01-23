import {createSlice} from "@reduxjs/toolkit";

export const weaponSlice = createSlice({
    name:"weapon",
    initialState:{
        name:"",
        value: []
    },
    reducers:{
        updateWeapon: (state,action) => {
            state.value = action.payload
        },
        removeWeapon:(state,action) => {
            const deleteItem = action.payload
            const result = state.value.filter((x, index) => index !== deleteItem)
            state.value = result


        }

    }
})

//export methods to update state
export const {updateWeapon, removeWeapon} = weaponSlice.actions

export default weaponSlice.reducer