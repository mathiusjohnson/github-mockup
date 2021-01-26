import React from 'react'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'

interface iProps {
  id: number,
  name: string,
  description: string,
  language: string,
  forks_count: number
}

const Repo = (props: iProps): JSX.Element => {

  const setCookie = () => {
    saveState(props)
  }

  return (
    <article className="border-2 border-black rounded-xl hover:shadow-xl py-4 px-3 flex flex-col justify-between " key={props.id}>
            <div className="space-y-2">

      <h3 className="text-xl font-bold text-center">{props.name}</h3>
      <div className="grid grid-cols-2  grid-rows-2 gap-3">

      {props.description !== null ? (
        <p className="col-span-2">
          Description: {props.description.substring(0, 100)}
        </p>
      ) : (
        <p>no description</p>
      )}
      {props.language !== undefined ? (
        <p>Language:{props.language}</p>
      ) : (
        <p>No languages</p>
      )}
      <p>Forks: {props.forks_count}</p>
      </div>
      <div className="flex justify-center">

      <Link
        className="btn btn-secondary w-2/3 text-green-500 mt-2"
        onClick={() => setCookie()}
        to={`/repos/${props.id}`}
      >
        View Repo
      </Link>
      </div>
      </div>
    </article>
  )
}

// Repo.propTypes = {
//   language: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   forks_count: PropTypes.number.isRequired,
// }

export default Repo
