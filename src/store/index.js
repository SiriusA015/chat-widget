import { configureStore } from '@reduxjs/toolkit'
import stylesReducer from './styles'

export const store = configureStore({
  reducer: {
    styles: stylesReducer,
  },
})