import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1 className="align-self-center my-5">Sign Up </h1>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
        name={name}
      >
        <div className="form-group d-flex flex-column align-items-start">
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" required />
        </div>

        <div className="form-group d-flex flex-column align-items-start">
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" required />
        </div>

        <div className="form-group d-flex flex-column align-items-start">
          <label htmlFor="email">Email</label>
          <input name="email" type="text" required />
        </div>

        <div className="form-group d-flex flex-column align-items-start">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
        </div>

        <div>
          <button className="btn btn-outline-dark" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(
        register(email, password, firstName, lastName),
        history.push('/location-verification')
      )
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

/**
 * PROP TYPES
 */
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
