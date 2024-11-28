import { configureStore } from "@reduxjs/toolkit";
import beneficiaryReducer from './beneficiarySlice';

export const store = configureStore({
    reducer: {
        beneficiaries: beneficiaryReducer,
    }
})