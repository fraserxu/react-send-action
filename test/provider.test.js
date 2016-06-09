import test from 'tape'
import React from 'react'
import { render } from 'react-dom'

import Provider from '../src/provider'

test('Provider component', function (t) {
  const createStore = {
    actionHandler: function () {},
    initialState: {
      user: 'fraserxu'
    }
  }

  let container = document.createElement('div')
  container.setAttribute('id', 'test1')
  document.body.appendChild(container)

  let app

  t.doesNotThrow(() => {
    app = render((
      <Provider createStore={createStore}>
        <div />
      </Provider>
    ), container)
  }, 'does not throw')

  t.throws(() => {
    render((
      <Provider createStore={createStore}>
      </Provider>
    ), container)
  }, 'should have child')

  t.throws(() => {
    render((
      <Provider createStore={createStore}>
        <div />
        <div />
      </Provider>
    ), container)
  }, 'should only have one child')

  t.equal(typeof app.store, 'function', 'should have store')
  t.equal(app.store.state().user, 'fraserxu', 'should get user state')

  t.end()
})
