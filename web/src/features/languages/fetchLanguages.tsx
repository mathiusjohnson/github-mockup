import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages, selectAllLanguages } from './languagesSlice';
import { RootState } from '../../reducers/index';

export default function LanguageList() {
  const dispatch = useDispatch()
  const languages = useSelector(selectAllLanguages)

  let content

  const languageStatus = useSelector((state: RootState) => state.languages.status)
  const error = useSelector((state: RootState) => state.languages.error)

  useEffect(() => {
    if (languageStatus === 'idle') {
      dispatch(fetchLanguages())
    }
  }, [languageStatus, dispatch])

  if (languageStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (languageStatus === 'fulfilled') {
    content = languages
  } else if (languageStatus === 'rejected') {
    content = <div>{error}</div>
  }
  return <div>{content}</div>
}
