import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilterLink from './FilterLink'
import { VisibilityFilters, addVisibilityFilter } from './filtersSlice'
import { selectAllLanguages } from '../languages/languagesSlice'

const Filter = () => {
  const dispatch = useDispatch()

  const languages = useSelector(selectAllLanguages)

  languages.forEach(language => {
    dispatch(addVisibilityFilter(language))
  })

  const filterKeys = Object.keys(VisibilityFilters)

  console.log(VisibilityFilters);
  const renderedFilters = filterKeys.map((filter, index) => {
    return (
      <FilterLink key={index} filter={VisibilityFilters[filter]}>
        {filter}
      </FilterLink>
    )
  })

  return (
    <div>
      <span>Show: </span>
      {renderedFilters}
    </div>
  )
}

export default Filter
