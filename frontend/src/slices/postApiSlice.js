import { apiSlice } from './apiSlice'
const POSTS_URL = '/api/posts'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'DELETE',
        body: data,
      }),
    }),
    getTimeline: builder.query({
      query: () => ({
        url: `${POSTS_URL}/timeline/all`,
        method: 'GET',
      }),
    }),
    getUserTimeline: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/timeline/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetTimelineQuery,
  useGetUserTimelineQuery,
} = postsApiSlice
