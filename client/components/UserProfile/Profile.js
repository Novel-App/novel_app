import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMe} from '../../store/user'

class Profile extends Component {
  componentDidMount() {
    this.props.getMe()
  }
  render() {
    const {firstName, lastName, email, profileImage, zipCode} = this.props.user
    return (
      <div className="main-content">
        <a
          className="h3 mb-0 text-uppercase d-none d-lg-inline-block"
          target="_blank"
        >
          User profile
        </a>
        <span />
        <div id="profile-container" className="container rounded mt-4">
          <h4>Hi {firstName}!</h4>
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  src={profileImage}
                  width="90"
                />
              </div>
            </div>
            <span className="font-weight-bold">First Name: {firstName}</span>
            <span className="font-weight-bold">Last Name: {lastName}</span>
            <span>Email: {email}</span>
            <span>Zip Code: {zipCode}</span>
          </div>
        </div>
        <div>
          <Link to="/profile/edit">
            <button
              type="button"
              className="justify-content-right btn btn-primary"
            >
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(getMe())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
