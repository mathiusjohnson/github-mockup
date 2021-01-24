import { useSelector, useDispatch } from 'react-redux';
import { VisibilityFilters, addVisibilityFilter, IVisibilityFilters } from './filtersSlice';
import FilterLink from './FilterLink'
import { RootState } from '../../reducers/index';
import React from 'react';

const Filter = () => {
  const dispatch = useDispatch()

  // const languages = useSelector(selectAllLanguages)
  const languages = useSelector((state: RootState) => state.languages.languages)

  const error = useSelector((state: RootState) => state.languages.error)

  for (const language in languages) {
    if (Object.hasOwnProperty.call(languages, language)) {
      const languageElement = languages[language];
      dispatch(addVisibilityFilter(languageElement))

    }
  }
  // languages.forEach(language => {
  //   dispatch(addVisibilityFilter(language))
  // })
  console.log("languages in footer: ", languages);
  const filterKeys = Object.keys(VisibilityFilters)

  const renderedFilters = filterKeys.map((filter: any, index: number) => {
    return (
      <FilterLink key={index} filter={VisibilityFilters[filter as keyof IVisibilityFilters]}>
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
