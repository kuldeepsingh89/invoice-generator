import {baseApiSlice} from "../api/baseApiSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData
            })
        })
    })
})

export const { useRegisterUserMutation } = authApiSlice;