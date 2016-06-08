import React, { Children, PropTypes } from 'react'
import sendAction from 'send-action'

/**
 * Connect send action store to React component
 * It's similar to what react-redux does for connecting redux store to React component
 * but simpler.
 *
 * @param {Object}   The target React component to be connected
 * @param {Function} actionHandler
 * @param {Object}   initialState
 * @return {Object} Connected Component
 */
class Provider extends React.Component {
  getChildContext () {
    return {
      store: this.store
    }
  }

  constructor (props, context) {
    super(props, context)
    this.store = this.createstore(props.createStore.actionHandler, props.createStore.initialState)
    this.state = this.store.state()
  }

  createstore (actionHandler, initialState) {
    return sendAction({
      onaction: actionHandler,
      onchange: this.onchange.bind(this),
      state: initialState
    })
  }

  onchange (action, state, oldState) {
    this.setState(state)
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  createStore: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  store: PropTypes.func.isRequired
}

export default Provider

