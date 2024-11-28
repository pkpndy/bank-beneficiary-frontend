import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteBeneficiary,
    editBeneficiary,
    fetchBeneficiaries,
} from "../redux/beneficiarySlice";
import "./styles.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import 'boxicons';

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
        setValue("accountNumber", beneficiary.accountNumber);
        setValue("accountType", beneficiary.accountType);
        setValue("bankName", beneficiary.bankName);
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
                                            {...register("accountNumber", {
                                                required: true,
                                            })}
                                        />
                                        <select
                                            {...register("accountType", {
                                                required: true,
                                            })}>
                                            <option value="" defaultValue>
                                                Select Account Type
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
                                        <input
                                            {...register("bankName", {
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
                                        {b.fullName} - {b.accountNumber} -{" "}
                                        {b.accountType} - {b.bankName}
                                    </span>
                                    <box-icon
                                            name="edit"
                                            color="green"
                                        onClick={() =>
                                            onEditClick(b)
                                        }></box-icon>
                                    <box-icon
                                            name="trash"
                                            color="blue"
                                        onClick={() =>
                                            onDeleteClick(b._id)
                                        }></box-icon>
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
