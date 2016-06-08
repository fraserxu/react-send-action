react-send-action
=================

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

react-send-action is a small library that hook up a `send-action` store into your React app, works not unlike [react-redux](https://github.com/reactjs/react-redux).

### Installation

```sh
$ npm i react-send-action --save
```

### What is `send-action`

> `send-action` is meant to be the smallest, simplest redux-like state management library. The focus is on providing a concise method for triggering actions, and on avoiding complex middleware & development dependencies.

> The API is significantly different from `redux`, but the pattern is similar.

> Using `send-action` you trigger actions, modify state based on those actions, and listen to the changes to render your application.

### Usage

#### Prepare `actionHandler` and `initialState` that will be used to `createStore`

* Create `initialState` for your whole application

```JavaScript
const initialState = {
  user: {
    name: 'fraserxu'
  }
}

export default initialState
```

* Create a `actionHandler.js` to trigger changes action and reduce new State

```JavaScript
/**
 * Store action handler
 * @param  {Object} action Object
 * @param  {Object} state  Object
 * @return {Object} new State
 */
export default function onaction (action, state) {
  switch (action.type) {
    case 'updateUser':
      const { user } = action.payload
      return {
        ...state,
        user
      }
  }
}
```

#### Hook your `createStore` object to the `Provider`, this step does two things:

1. Create a `store` object on the App `context`, so your `child` or `grand-child` component could have access to the store via `this.context.store`
2. Hook the `onchange` event to the `Provider` component itself so it could update the **internal** state and cause the app to do a **re-render**

`Provider` works on both client side and server side. To hook the store to your app, you can do:

**Provider(client side)**

```JavaScript
import { Provider } from 'react-send-action'
import React from 'react'
import { render } from 'react-dom'

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

```

**Provider(server side)**

```JavaScript
renderToString(
  <Provider createStore={createStore}>
    <AppContainer />
  </Provider>
)
```

There are three way to consume `state` and dispatch `action` in your child componet.

First way is to access to `store` object directly from `this.context.store`, which is **not recommended** as

> Using context makes your components more coupled and less reusable, because they behave differently depending on where they're rendered.

```JavaScript
import React from 'react'

class App extends React.Component {
  onClickHandler () {
    // dispatch an toggle event
    this.context.store(
      'type': 'updateUser',
      'payload': {
        name: 'someone else'
      }
    )
  }
  render () {
    const { user } = this.context.store.state()
    return (
      <div>
        <span>{user.name}</span>
        <button onClick={this.onClickHandler}>Toggle</button>
      </div>
    )
  }
}

App.contextTypes = {
  store: React.PropTypes.func.isRequired
}

export default App
```

The other way to use it is through `container component`. There are lots of reasons to use container component, the most obvious one is to seperate the data logic from your view component, most of your view should be `dumb` and only takes in props and render the view, so it's very easy to test and reuse.

You should always only handle your data logic inside the high order component, and pass down the `state` and `dispatchers` down through `props`.

First presume we have a dump home page component

```JavaScript
import React, { PropTypes } from 'react'

class App extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }
  render () {
    const { user } = this.props
    return (
      <span>{user.name}</span>
    )
  }
}

export default App
```

And then we use the a helper function to grab the `user` props from our store

```JavaScript
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
```

For more details, please check the `example` directory.

The last way and easiest way is to use the builtin `Connect` component which hook up the `props`, `actionsHandlers` and `static` method to the wrappedComponent.

```JavaScript
import React from 'react'

import App from './app'
import { fetchStats } from './common/utils/api'

const AppContainer = Connect(
  (store, props) => {
    const { user, stats } = store.state()
    return {
      user,
      stats
    }
  },
  (store, props) => {
    return {
      setUser: (user) => {
        store({
          type: 'userSignedIn',
          payload: {
            user
          }
        })
      }
    }
  },
  {
    actions: {
      stats: fetchStats
    }
  }
)(App)

export default AppContainer
```

### License

MIT

[npm-image]: https://img.shields.io/npm/v/react-send-action.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-send-action
[travis-image]: https://img.shields.io/travis/fraserxu/react-send-action/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/fraserxu/react-send-action
[downloads-image]: http://img.shields.io/npm/dm/react-send-action.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-send-action
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
