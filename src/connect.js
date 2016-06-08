import React, { PropTypes, Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'

/**
 * Map props and actions to child component
 * @param  {Object} mapProps
 * @param  {Function} mapActionHandlers
 * @return {Object} wrapped component
 */
export default function connect (mapProps, mapActionHandlers, statics) {
  return WrappedComponent => {
    class Connect extends Component {
      constructor (props, context) {
        super(props, context)
        this.store = props.store || context.store

        if (!this.store) {
          throw new Error(
            `Could not find "store" in either the context or ` +
            `props of "${this.constructor.displayName}". ` +
            `Either wrap the root component in a <Provider>, ` +
            `or explicity pass "client" as a prop to "${this.constructor.displayName}".`
          )
        }
      }
      render () {
        const actionHandlers = mapActionHandlers ? mapActionHandlers(this.store, this.props) : {}
        const mappedProps = mapProps ? mapProps(this.store, this.props) : {}
        return createElement(WrappedComponent, {
          ...mappedProps,
          ...actionHandlers,
          ...this.props
        })
      }
    }

    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      store: PropTypes.func
    }
    Connect.propTypes = {
      store: PropTypes.func
    }

    // map static method to `Connect` component
    // we use it for async data fetching from backend
    if (statics && typeof statics === 'object') {
      Connect = hoistStatics(Connect, statics)
    }

    return hoistStatics(Connect, WrappedComponent)
  }
}
