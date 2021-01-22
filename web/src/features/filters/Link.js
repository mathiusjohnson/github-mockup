import React from 'react';

const Link = ({ active, children, setVisibilityFilter, filter }) => {
  return (
    <button
      className="btn"
      onClick={() => setVisibilityFilter(filter)}
      disabled={active}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
};

export default Link;
