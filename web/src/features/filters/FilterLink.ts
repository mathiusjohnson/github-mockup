import { connect } from 'react-redux'
import { setVisibilityFilter } from './filtersSlice'
import Link from './Link'

const mapStateToProps = (state: any, ownProps: any) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = { setVisibilityFilter }

export default connect(mapStateToProps, mapDispatchToProps)(Link)
