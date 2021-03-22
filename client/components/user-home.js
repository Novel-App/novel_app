import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import LocationVerification from './location-verification'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  return (
    <div>
      <div className="container-fluid" />
      <h3>Welcome, {firstName}</h3>
      <img
        className="heroImg"
        src="https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-superJumbo.jpg?quality=90&auto=webp"
      />
      <h3>
        Ready to expand your library?{' '}
        <Link to="/products">Browse titles in your area</Link>
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
