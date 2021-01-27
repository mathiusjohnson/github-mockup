import { connect } from 'react-redux'
import {RootState} from '../../reducers'
import Repo from './RepoItem'
import {IRepos} from './repoSlice'

const mapStateToProps = (state: RootState, ownProps: IRepos) => ({
  currentRepo: ownProps.repo
})


export default connect(mapStateToProps)(Repo)
