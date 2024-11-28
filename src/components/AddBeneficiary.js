import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBeneficiary } from "../redux/beneficiarySlice";
import { useNavigate } from "react-router-dom";

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
          navigate('/');
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
                Adress:
                <input {...register("address", { required: true })} />
                {errors.address && <span>Address is required</span>}
            </label>
            <label>
                Country:
                <select {...register("country", { required: true })}>
                    <option value="" defaultValue>
                        Select Country
                    </option>
                    <option value="India">India</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Sweden">Sweden</option>
                </select>
                {errors.country && <span>Country is required</span>}
            </label>
            <label>
                Pincode:
                <input {...register("pincode", { required: true })} />
                {errors.pincode && <span>Pincode is required</span>}
            </label>
            <button type="submit">Add Beneficiary</button>
        </form>
    );
};
