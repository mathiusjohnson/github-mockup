import { connect } from 'react-redux'
import { setCurrentRepo } from './repoSlice'
import Repo from './Repo'

const mapStateToProps = (state, ownProps) => ({
  currentRepo: ownProps.repo === state.repo
})

const mapDispatchToProps = { setCurrentRepo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repo)
