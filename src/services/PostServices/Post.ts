// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPost: builder.query<IPost[], void>({
      query: () => `/`,
      providesTags: ["Post"],
    }),

    getPostById: builder.query<IPost, string>({
      query: (id) => `/` + id,
      providesTags: ["Post"],
    }),

    getPostBySearch: builder.query<IPost, string>({
      // query: (param) => `/` + id,
      query: (name) => ({
        url: `/comments?name=${name}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    addPost: builder.mutation<{}, IPost>({
      query: (post) => ({
        url: "/",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation<void, IPost>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePostComplete: builder.mutation<void, IPost>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} = postApi
