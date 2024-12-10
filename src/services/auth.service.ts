import { apiService } from "../api/apiService";

export const authService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: 'signup',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        })
    })
})