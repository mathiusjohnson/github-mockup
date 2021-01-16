import React from 'react'
import FilterLink from './FilterLink'
import { VisibilityFilters } from './filtersSlice'

const Footer = () => {
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
