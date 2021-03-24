import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMe} from '../../store/user'

class Profile extends Component {
  componentDidMount() {
    this.props.getMe()
  }
  render() {
    const {firstName, lastName, email, profileImage} = this.props.user
    return (
      <div className="container">
        <h2>Hi {firstName}!</h2>
        <div className="row">
          <div className="col s12 m6">
            <div>
              <div>
                <span className="card-title">Profile</span>
                <div>
                  <p>Profile Image: {profileImage}</p>
                  <p>First Name: {firstName}</p>
                  <p>Last Name: {lastName}</p>
                  <p>Email: {email}</p>
                  <p>Password: ******</p>
                </div>
              </div>
              <div>
                <Link to="/profile/edit">Edit</Link>
              </div>
            </div>
          </div>
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
