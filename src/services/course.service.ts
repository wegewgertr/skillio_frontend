import { apiService } from "../api/apiService";

export const courseService = apiService.injectEndpoints({
    endpoints: (builder) =>({
        createCompany: builder.mutation({
            query: (data) => ({
                url: 'api/v1/companies',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: 'api/v1/courses',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        })
    })
})