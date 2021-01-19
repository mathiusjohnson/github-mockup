import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import RepoList from './RepoList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectRepos = state => state
const selectFilter = state => state.visibilityFilter

const selectVisibleRepos = createSelector(
  [selectRepos, selectFilter],
  (repos, filter) => {
    const repoKeys = Object.keys(repos.repos.entities)
    const repoArr = []
    repoKeys.forEach(key => {
      repoArr.push(repos.repos.entities[key])
    })

    for (const language in VisibilityFilters) {
      const filteredLang = VisibilityFilters[language]
      if (filter === 'SHOW_ALL') {
        return repoArr
      }
      if (filter === filteredLang) {
        return repoArr.filter(t => t.language === filteredLang)
      }
    }
    throw new Error('Unknown filter: ' + filter)
  }
)

const mapStateToProps = state => ({
  repos: selectVisibleRepos(state)
})

export const VisibleRepoList = connect(mapStateToProps)(RepoList)
