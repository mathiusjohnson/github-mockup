import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
import axios from 'axios'

interface repoState {
  entities: Repos;
  ids: Array<number> [];
  status: string | undefined;
  error?: null;
  pending: string | null;
  fulfilled: string | null;
  rejected: null;
  repos: Repos;
  currentRepo: {}
}

interface Repos {
  [key: string]: iRepo,
}

interface iRepo {
  id: number,
  name: string,
  description: string,
  created_at: string,
  // ...
}

const url = 'http://localhost:4000/repos'

const reposAdapter = createEntityAdapter({
  sortComparer: (repoA: iRepo, repoB: iRepo) => repoB.created_at.localeCompare(repoA.created_at)
})

const initialState = reposAdapter.getInitialState({
  status: 'idle',
  error: null,
  pending: null,
  fulfilled: null,
  rejected: null,
  currentRepo: {}
}) as unknown as repoState

/* eslint-disable */

export const fetchRepos = createAsyncThunk<
// Return type of the payload creator
Repos,
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
    console.log("repos in thunk: ", response.data);

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

export default reposSlice.reducer

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
