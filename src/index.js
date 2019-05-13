import { connect } from 'react-redux'
import {
  lensPath, view, over, set,
} from 'js-lens'

const toArray = x => (Array.isArray(x) ? x : [x])

export const safety = reducer => (state, action) => {
  if (action && (String(action.type).indexOf('@@SAFETY_MUTATE:') === 0)) {
    const { paths, updater } = action
    const lens = lensPath(toArray(paths))
    const newState = typeof updater === 'function'
      ? over(lens, updater, state)
      : set(lens, updater, state)
    return newState
  }

  return reducer(state, action)
}

const query = state => (paths) => {
  const lens = lensPath(toArray(paths))
  return view(lens, state)
}

const mutate = dispatch => (paths, updater, name) => {
  dispatch({
    type: `@@SAFETY_MUTATE:${JSON.stringify(paths)}${name ? ` ${name}` : ''}`,
    paths,
    updater,
  })
}

const empty = () => ({})

export const safetyConnect = (mapQueryToProps = empty, mapMutateToProps = empty) => {
  const mapStateToProps = (state, ownProps) => mapQueryToProps(query(state), ownProps)
  const mapDispatchToProps = (dispatch, ownProps) => mapMutateToProps(mutate(dispatch), ownProps)

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )
}
