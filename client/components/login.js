import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'

/**
 * COMPONENT
 */
const LoginForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center ">
      <h1 className="align-self-center my-5">Login </h1>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
        name={name}
      >
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

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(login(email, password))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)

/**
 * PROP TYPES
 */
LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
