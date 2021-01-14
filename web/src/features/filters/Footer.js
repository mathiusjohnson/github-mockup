import React from 'react';
import FilterLink from './FilterLink';
import { VisibilityFilters } from './filtersSlice';

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.JAVASCRIPT}>Javascript</FilterLink>
    <FilterLink filter={VisibilityFilters.TYPESCRIPT}>Completed</FilterLink>
  </div>
);

export default Footer;
