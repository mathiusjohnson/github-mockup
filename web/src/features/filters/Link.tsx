import React, {Validator} from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Link = ({ active, children, setVisibilityFilter, filter }: {active: boolean, children: Node, setVisibilityFilter: any, filter: Validator<any>}) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => setVisibilityFilter(filter)}
      disabled={active}
      style={{
        marginLeft: '4px'
      }}
    >
      {children}
    </button>
  )
}

export default Link
