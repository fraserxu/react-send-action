import React from 'react'
import { render } from 'react-dom'
import Provider from '../'

import AppContainer from './appContainer'
import initialState from './initialState'
import actionHandler from './actionHandler'

const createStore = {
  actionHandler,
  initialState
}

render((
  <Provider createStore={createStore}>
    <AppContainer />
  </Provider>
), document.body)
