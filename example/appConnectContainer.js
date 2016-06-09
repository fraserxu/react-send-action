import React, { PropTypes } from 'react'

import { Connect } from '../src/'
import App from './app'

export default Connect(
  (store, props) => {
    let { user } = store.state()
    return {
      user
    }
  }
)(App)
