import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterLink from './FilterLink';
import { VisibilityFilters, addVisibilityFilter } from './filtersSlice';
import { selectAllLanguages } from '../languages/languagesSlice';
const Filter = () => {
  const dispatch = useDispatch();

  const languages = useSelector(selectAllLanguages);

  languages.forEach((language) => {
    dispatch(addVisibilityFilter(language));
  });

  const filterKeys = Object.keys(VisibilityFilters);

  const renderedFilters = filterKeys.map((filter, index) => {
    return (
      <FilterLink key={index} filter={VisibilityFilters[filter]}>
        {filter}
      </FilterLink>
    );
  });

  return (
    <div className="flex mt-3 items-center justify-center space-x-8">
      <span className="font-extrabold">Show: </span>
      <div className="flex justify-between">
        {renderedFilters}
      </div>
    </div>
  );
};

export default Filter;
