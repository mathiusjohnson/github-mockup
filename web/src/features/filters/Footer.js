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

  console.log(typeof VisibilityFilters);
  const filterKeys = Object.keys(VisibilityFilters)
  const renderedFilters = filterKeys.map((filter, index) => {
      return (
        <FilterLink key={index} filter={VisibilityFilters[filter]}>{filter}</FilterLink>
      )
    })

  return (
    <div>
      <span>Show: </span>
        {renderedFilters}
    </div>
  )
}

export default Footer


