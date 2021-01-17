import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FilterLink from './FilterLink'
import { VisibilityFilters, addVisibilityFilter } from './filtersSlice'
import { selectAllLanguages } from '../buttons/languagesSlice'
const Footer = (
) => {
  const dispatch = useDispatch();

  const languages = useSelector(selectAllLanguages)
  console.log("languages in footer: ", languages);
  languages.forEach(language => {
    dispatch(addVisibilityFilter(language))
  })

  console.log(VisibilityFilters);
  return (
    <div>
      <span>Show: </span>
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
      <FilterLink filter={VisibilityFilters.JAVASCRIPT}>JAVASCRIPT</FilterLink>
      <FilterLink filter={VisibilityFilters.CSS}>CSS</FilterLink>
    </div>
  )
}

export default Footer


