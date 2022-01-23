import {createSlice} from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
    name:"inventory",
    initialState:{
        name:"",
        value:[]
    },
    reducers:{
        updateInventory: (state,action) => {
            state.value = action.payload
        },
        removeInventory:(state,action) => {
            const deleteItem = action.payload
            const result = state.value.filter((x, index) => index !== deleteItem)
            state.value = result


        }}
})

//export methods to update state
export const {updateInventory, removeInventory} = inventorySlice.actions

export default inventorySlice.reducer