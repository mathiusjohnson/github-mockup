import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
import axios from 'axios'

interface repoState {
  entities: IRepos;
  ids: Array<number> [];
  status: string | undefined;
  error?: null;
  pending: string | null;
  fulfilled: string | null;
  rejected: null;
}

export interface IRepos {
  [key: string]: IRepo,
  length: any,
  map: any
}

export interface User {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  owner: User;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  forks: number;
}


const url = 'http://localhost:4000/repos'

const reposAdapter = createEntityAdapter({
  sortComparer: (repoA: IRepo, repoB: IRepo) => repoB.created_at.localeCompare(repoA.created_at)
})

const initialState = reposAdapter.getInitialState({
  entities: {} as IRepos,
  status: 'idle',
  error: null,
  pending: null,
  fulfilled: null,
  rejected: null,
  currentRepo: {}
})

/* eslint-disable */

export const fetchRepos = createAsyncThunk<
// Return type of the payload creator
IRepos,
// pending: string | null,

// First argument to the payload creator (provide void if there isn't one)
void,
{state: repoState}
>('repos/fetch', async (_, thunkAPI) => {
  async () => {
    if (thunkAPI.getState().status !== 'idle') {
      return;
    }
  };

    const response = await axios.get(url)

    return response.data
  }
)
/* eslint-disable */

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRepos.pending, (state, action) => {
        if (state.status === 'idle') {

      state.status = 'idle'
        }
    })
      .addCase(fetchRepos.fulfilled, (state: any, action) => {
      state.status = 'succeeded'
      reposAdapter.upsertMany(state, action.payload)
    })
      .addCase(fetchRepos.rejected, (state: any, action) => {
      state.status = 'failed'
      state.error = action.error.message || null;
    })
  }
})

export default reposSlice.reducer;

export const {
  selectAll: selectAllRepos,
  selectById: selectRepoById,
  selectIds: selectRepoIds
} = reposAdapter.getSelectors((state: any) => state.repos)

// export const selectCurrentRepo = createSelector([
//   selectAllRepos,
//   (  state: unknown) => {
//     return state
//   }
// ])
export {}
