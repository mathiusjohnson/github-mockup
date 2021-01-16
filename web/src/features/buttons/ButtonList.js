import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages, selectAllLanguages } from './languagesSlice';
import Button from './Button';
// import store from '../../reducers/index';

// store.dispatch(fetchLanguages());

export default function RepoList ({languages}) {
  const dispatch = useDispatch();

  // let content;

  const languageStatus = useSelector((state) => state.languages.status);
  // const error = useSelector((state) => state.languages.error);

  // useEffect(() => {
  //   if (languageStatus === 'idle') {
  //     dispatch(fetchLanguages());
  //   }
  // }, [languageStatus, dispatch]);

  // if (languageStatus === 'loading') {
  //   content = <div className="loader">Loading...</div>;
  // } else if (languageStatus === 'succeeded') {
  //   content = languages
  // } else if (languageStatus === 'error') {
  //   content = <div>{error}</div>;
  // }

  // console.log(content);
  return (
    <ul>
      {/* {languages.map(language => (
        <Button key={language.id} {...language} />
      ))} */}
    </ul>
  )
}
