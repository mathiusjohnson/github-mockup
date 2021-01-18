import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const Repo = ({ name, description, language, forks_count, id, setCurrentRepo }) => {

   return (
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
  <Link onClick={() => setCurrentRepo(id)} to={`/repos/${id}`} state={{id: id}}>
    View Repo
  </Link>
</article>
)}

// Repo.propTypes = {
//   language: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   forks_count: PropTypes.number.isRequired,
// }

export default connect(null)(Repo);
