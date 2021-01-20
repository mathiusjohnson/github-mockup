import axios from 'axios';

// export interface Language {
//   [key: string]: unknown,
//   id: number,
//   language: string,
//   status: string,
//   error: string | undefined | undefined
// }

// interface GetLanguagesResult {
//   languages:  Language[];
// }

export interface Language {
  [key: string]: unknown,
  id: number,
  language: string,
  status: string,
  error: string | undefined | undefined
}

export interface GetLanguagesResult {
  languages: {
      [key: string]: Language
  };
}

export async function getLanguages(): Promise<GetLanguagesResult> {
  const url = 'http://localhost:4000/languages'

  const languagesResponse = await axios.get<{data: Language}>(url);

  console.log("data: ", typeof languagesResponse.data);
  return {
    languages: languagesResponse.data,
  };
}
