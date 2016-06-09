import test from 'tape'
import React from 'react'
import { render } from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Provider from '../src/provider'
import Connect from '../src/connect'

test('Connect component', function (t) {
  class Child extends React.Component {
    render () {
      return <div />
    }
  }

  Child.propTypes = {
    user: React.PropTypes.object.isRequired
  }

  const ChildContaier = Connect(
    (store, props) => {
      let { user } = store.state()
      return {
        user
      }
    }
  )(Child)

  const createStore = {
    actionHandler: function () {},
    initialState: {
      user: {
        name: 'fraserxu'
      }
    }
  }

  let container = document.createElement('div')
  container.setAttribute('id', 'test1')
  document.body.appendChild(container)

  let app

  t.doesNotThrow(() => {
    app = render((
      <Provider createStore={createStore}>
        <ChildContaier />
      </Provider>
    ), container)
  }, 'does not throw')

  const child = TestUtils.findRenderedComponentWithType(app, Child)

  t.equal(child.props.user.name, 'fraserxu', 'should get user from props')

  t.end()
})


