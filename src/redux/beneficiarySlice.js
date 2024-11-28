import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pathForBeneficiaryOps } from "../apis/RESTApis";
import axios from "axios";


export const fetchBeneficiaries = createAsyncThunk(
    "beneficiaries/fetchAll",
    async () => {
        const response = await axios.get('http://localhost:5000' +pathForBeneficiaryOps.getBeneficiaries);
        return response.data;
    }
);

export const addBeneficiary = createAsyncThunk(
    "beneficiaries/add",
    async (beneficiary) => {
        const response = await axios.post(
            'http://localhost:5000' +pathForBeneficiaryOps.addBeneficiary,
            beneficiary
        );
        return response.data;
    }
);

export const editBeneficiary = createAsyncThunk(
    "beneficiaries/edit",
    async ({ id, data }) => {
        const response = await axios.put(
            'http://localhost:5000' +pathForBeneficiaryOps.editBeneficiary + `/${id}`,
            data
        );
        console.log(response.data);
        return response.data;
    }
);
export const deleteBeneficiary = createAsyncThunk(
    "beneficiaries/delete",
    async (id) => {
        await axios.delete('http://localhost:5000' +pathForBeneficiaryOps.deleteBeneficiary + `/${id}`);
        return id;
    }
);

const beneficiarySlice = createSlice({
    name: "beneficiaries",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchBeneficiaries.fulfilled,
                (state, action) => action.payload
            )
            .addCase(addBeneficiary.fulfilled, (state, action) => [
                ...state,
                action.payload,
            ])
            .addCase(editBeneficiary.fulfilled, (state, action) =>
                state.map((b) =>
                    b._id === action.payload._id ? action.payload : b
                )
            )
            .addCase(deleteBeneficiary.fulfilled, (state, action) =>
                state.filter((b) => b._id !== action.payload)
            );
    },
});

export default beneficiarySlice.reducer;
