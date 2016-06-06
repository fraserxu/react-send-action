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
