import { connect } from 'react-redux'
import {RootState} from '../../reducers'
import Repo from './RepoItem'
import {iRepos} from './repoSlice'

const mapStateToProps = (state: RootState, ownProps: iRepos) => ({
  currentRepo: ownProps.repo
})


export default connect(mapStateToProps)(Repo)
