import React, { PropTypes } from 'react'

import App from './app'

class AppContainer extends React.Component {
  render () {
    let { user } = this.context.store.state()
    return (
      <HomePage user={user} />
    )
  }
}

AppContainer.contextTypes = {
  store: PropTypes.func.isRequired
}

export default AppContainer
