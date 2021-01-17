import React from 'react'
import { Link } from 'react-router-dom';

const Repo = ({ name, description, language, forks_count, created_at, id }) => (
  <article key={id}>
  <h3>Name: {name}</h3>
  {description !== null ? (
    <p className="repo-content">
      Description: {description.substring(0, 100)}
    </p>
  ) : (
    <p>no description</p>
  )}
  {language !== undefined ? (
    <p>Language:{language}</p>
  ) : (
    <p>No languages</p>
  )}
  <p>Forks: {forks_count}</p>
  <p>{created_at}</p>
  <Link to={`/repos/${id}`} className="button muted-button">
    View Repo
  </Link>
</article>
)

// Repo.propTypes = {
//   language: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   forks_count: PropTypes.number.isRequired,
// }

export default Repo;
