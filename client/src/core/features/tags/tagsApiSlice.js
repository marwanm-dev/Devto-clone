import apiSlice from '../api/apiSlice';

const tagsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query({
      query: () => '/tags',
    }),
    getNumTags: builder.query({
      query: () => '/tags/limit',
    }),
    getTagByName: builder.query({
      query: name => `/tags/${name}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetTagsQuery, useGetNumTagsQuery, useGetTagByNameQuery } = tagsApiSlice;
