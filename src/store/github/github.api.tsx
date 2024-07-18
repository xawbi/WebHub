import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IRepos, IUser, ServerResponse} from "../../models/models";

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),

  endpoints: build => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 9
        }
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),
    searchRepository: build.query<IRepos[], string>({
      query: (userLogin: string) => ({
        url: `users/${userLogin}/repos`
      })
    })
  })
})

export const {useSearchUsersQuery, useLazySearchRepositoryQuery} = githubApi