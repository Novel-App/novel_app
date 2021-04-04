import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="notfoundpage">
          Uh oh, looks like we can't find that page!
        </h1>
        <img
          className="error404"
          src="https://image.freepik.com/free-vector/design-404-error-page-is-lost-found-message-template-web-page-with-404-error-modern-line-design_6280-165.jpg"
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
