import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteBeneficiary,
    editBeneficiary,
    fetchBeneficiaries,
} from "../redux/beneficiarySlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const BeneficiaryList = () => {
    const dispatch = useDispatch();
    const beneficiaries = useSelector((state) => state.beneficiaries);
    const [editId, setEditId] = useState(null);

    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        dispatch(fetchBeneficiaries());
    }, [dispatch]);

    const onEditClick = (beneficiary) => {
        setEditId(beneficiary._id);
        setValue("fullName", beneficiary.fullName);
        setValue("address", beneficiary.address);
        setValue("country", beneficiary.country);
        setValue("pincode", beneficiary.pincode);
    };

    const onDeleteClick = (id) => {
        if (
            window.confirm("Are you sure you want to delete this beneficiary?")
        ) {
            dispatch(deleteBeneficiary(id));
            dispatch(fetchBeneficiaries());
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        dispatch(editBeneficiary({ id: editId, data }));
        alert("Beneficiary updated successfully!");
        setEditId(null);
        reset();
    };

    return (
        <div className="container">
            <h2>Beneficiary List</h2>
            {beneficiaries.length > 0 ? (
                <ul>
                    {beneficiaries.map((b) => (
                        <li key={b._id} className="beneficiary-item">
                            {editId === b._id ? (
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="edit-form">
                                    <div className="form-fields">
                                        <input
                                            {...register("fullName", {
                                                required: true,
                                            })}
                                            placeholder="Full Name"
                                            defaultValue={b.fullName}
                                        />
                                        <input
                                            {...register("address", {
                                                required: true,
                                            })}
                                        />
                                        <select
                                            {...register("country", {
                                                required: true,
                                            })}>
                                            <option value="" defaultValue>
                                                Select Country
                                            </option>
                                            <option value="India">India</option>
                                            <option value="Sri Lanka">
                                                Sri Lanka
                                            </option>
                                            <option value="Australia">
                                                Australia
                                            </option>
                                            <option value="Canada">
                                                Canada
                                            </option>
                                            <option value="Sweden">
                                                Sweden
                                            </option>
                                        </select>
                                        <input
                                            {...register("pincode", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    <div className="action-buttons">
                                        <button
                                            type="submit"
                                            className="save-btn">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditId(null)}
                                            className="cancel-btn">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <span>
                                        {b.fullName} - {b.address} - {b.country}{" "}
                                        - {b.pincode}
                                    </span>
                                        <button onClick={() => onEditClick(b)}>Edit</button>
                                        <button onClick={() => onDeleteClick(b._id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No beneficiaries found. Add One</p>
            )}
            <Link to="/add" className="add-link">
                Add Beneficiary
            </Link>
        </div>
    );
};
