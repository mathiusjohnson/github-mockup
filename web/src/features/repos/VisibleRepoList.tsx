import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import RepoList from './RepoList'
import { VisibilityFilters } from '../filters/filtersSlice'
import {RootState} from '../../reducers'
import {iRepo} from './repoSlice'

const selectRepos = (state: RootState) => state
const selectFilter = (state: RootState) => state.visibilityFilter

interface iRepoArr {
  filter: any
  push: any
  [key: number]: iRepo
}
const selectVisibleRepos = createSelector(
  [selectRepos, selectFilter],
  (repos, filter) => {
    const repoKeys = Object.keys(repos.repos.entities)
    const repoArr: iRepoArr = []
    repoKeys.forEach(key => {
      repoArr.push(repos.repos.entities[key])
    })

    for (const language in VisibilityFilters) {
      const filteredLang = VisibilityFilters[language]
      if (filter === 'SHOW_ALL') {
        return repoArr
      }
      if (filter === filteredLang) {
        return repoArr.filter((repo: iRepo) => repo.language === filteredLang)
      }
    }
    throw new Error('Unknown filter: ' + filter)
  }
)

const mapStateToProps = (state: RootState) => ({
  repos: selectVisibleRepos(state)
})

export const VisibleRepoList = connect(mapStateToProps)(RepoList)
