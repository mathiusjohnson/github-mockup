import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilterLink from './FilterLink'
import { VisibilityFilters, addVisibilityFilter } from './filtersSlice'
import { selectAllLanguages } from '../languages/languagesSlice'

const Filter = () => {
  const dispatch = useDispatch()

  // const languages = useSelector(selectAllLanguages)
  const languages = useSelector(state => state.languages.languages)

  const error = useSelector(state => state.languages.error)

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
