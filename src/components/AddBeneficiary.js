import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBeneficiary } from "../redux/beneficiarySlice";
import { useNavigate } from "react-router-dom";
import './AddBeneficiary.css';

export const AddBeneficiary = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        try {
            dispatch(addBeneficiary(data));
            alert("Beneficiary added!");
            reset();
            navigate("/");
        } catch (err) {
            alert("Error!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Full Name:
                <input {...register("fullName", { required: true })} />
                {errors.fullName && <span>Full Name is required</span>}
            </label>
            <label>
                AccountNumber:
                <input {...register("accountNumber", { required: true })} />
                {errors.accountNumber && <span>AccountNumber is required</span>}
            </label>
            <label>
                AccountType:
                <select {...register("accountType", { required: true })}>
                    <option value="" defaultValue>
                        Select accountType
                    </option>
                    <option value="Individual Beneficiary Account">
                        Individual Beneficiary Account
                    </option>
                    <option value="Joint Beneficiary Account">
                        Joint Beneficiary Account
                    </option>
                    <option value="Contingent Beneficiary Account">
                        Contingent Beneficiary Account
                    </option>
                    <option value="Revocable Beneficiary Account">
                        Revocable Beneficiary Account
                    </option>
                    <option value="Irrevocable Beneficiary Account">
                        Irrevocable Beneficiary Account
                    </option>
                    <option value="Class Beneficiary Account">
                        Class Beneficiary Account
                    </option>
                </select>
                {errors.accountType && <span>AccountType is required</span>}
            </label>
            <label>
                BankName:
                <input {...register("bankName", { required: true })} />
                {errors.bankName && <span>BankName is required</span>}
            </label>
            <button type="submit">Add Beneficiary</button>
        </form>
    );
};
