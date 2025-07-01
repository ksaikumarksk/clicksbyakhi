import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
    },
    addData: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload)
    },
     toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.data.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    removeData: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((t)=>t.id !== action.payload)
    },
    // updateData: (state, action: PayloadAction<{ index: number; newData: any }>) => {
    //   const { index, newData } = action.payload
    //   state.data[index] = newData
    // }
  }
})

export const { setData, addData, removeData, toggleTask } = dataSlice.actions

export default dataSlice.reducer