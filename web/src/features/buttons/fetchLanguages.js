import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLanguages, selectAllLanguages } from './languagesSlice'
// import Button from './Button';

export default function LanguageList({ languages }) {
  const dispatch = useDispatch()

  let content

  const languageStatus = useSelector(state => state.languages.status)
  const error = useSelector(state => state.languages.error)

  useEffect(() => {
    if (languageStatus === 'idle') {
      dispatch(fetchLanguages())
    }
  }, [languageStatus, dispatch])

  if (languageStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (languageStatus === 'succeeded') {
    content = languages
  } else if (languageStatus === 'error') {
    content = <div>{error}</div>
  }

  return <div>{content}</div>
}
