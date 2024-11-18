import { apiSlice } from './apiSlice'
const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}/follow`,
        method: 'PUT',
      }),
    }),
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}/unfollow`,
        method: 'PUT',
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'DELETE',
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
    }),
    getUserByUsername: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/find/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUserByUsernameQuery,
} = usersApiSlice
