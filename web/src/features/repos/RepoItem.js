import React from 'react'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'

const Repo = props => {
  const setCookie = id => {
    console.log('id in cookie fn:', id)
    saveState(props)
  }

  return (
    <article key={props.id}>
      <h3>Name: {props.name}</h3>
      {props.description !== null ? (
        <p className="repo-content">
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
      <Link
        onClick={() => setCookie(props.id)}
        to={`/repos/${props.id}`}
        className="button muted-button"
        state={{ id: props.id }}
      >
        View Repo
      </Link>
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
