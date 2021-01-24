import React, {Validator} from 'react'

const Link = ({ active, children, setVisibilityFilter, filter }: {active: boolean, children: Node, setVisibilityFilter: Function, filter: Validator<any>}) => {
  return (
    <button
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
