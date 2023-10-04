/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import { pick } from "lodash";

const initialState = {
    openModals: {}
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.openModals[action.payload.id] = action.payload.data || {};
        },
        closeModal: (state, action) => {
            state.openModals = pick(state.openModals, function (modal) {
                return (modal.id !== action.payload.id);
            })
        }
    }
})

const modalsReducer = modalsSlice.reducer
export const { openModal, closeModal } = modalsSlice.actions;
export default modalsReducer;