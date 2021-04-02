import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NotFound extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="wrapper">
        <h1 className="notfoundpage">
          Uh oh, looks like we can't find that page!
        </h1>
        <img
          className="error404"
          src="resources/images/PinClipart.com_stack-of-books-clip_5379893.png"
        />
        <span />
        <h4 className="notfoundpage">
          {' '}
          Check out some <Link to="/products">books</Link> in your area!!{' '}
        </h4>
      </div>
    )
  }
}

export default NotFound
