import { IPostRequest, IPostResponse } from '@/app/interface/post'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const blogApi = createApi({
    reducerPath: 'blogApi',
    tagTypes: ['post'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://67e4e7e718194932a583a290.mockapi.io/post/' }),
    endpoints: (build) => ({
        getPosts: build.query<IPostResponse[], {page: number, limit: number}>({
            query: (params) =>  {
                console.log(params)
                return `posts?page=${params.page}&limit=${params.limit}`
            },
            providesTags: ['post'],
        }),
        getPost: build.query<IPostResponse, string>({
            query: (id) => `posts/${id}`,
            providesTags: ['post'],
        }),
        createPost: build.mutation<IPostResponse, IPostRequest>({
            query: (body) => ({
                url: `posts`,
                method: 'POST',
                body,
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            // providesTags: ['post'],
        }),
    }),
  })

  export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation } = blogApi