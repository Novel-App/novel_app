import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateUser} from '../../store/user'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profileImage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      profileImage: this.props.user.profileImage
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editUser({...this.state, id: this.props.user.id})
    this.props.history.push('/profile')
  }

  onFileChange(event) {
    this.setState({
      profileImageData: event.target.files
    })
  }

  render() {
    const {firstName, lastName, email} = this.state
    const {profileImage} = this.props.user

    return (
      <div id="edit-container" className="container rounded mt-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                src={profileImage}
                width="90"
              />
              <span className="font-weight-bold">{firstName}</span>
              <span className="font-weight-bold">{lastName}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5" />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Edit Profile</h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="input-field">
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="input-field">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="input-field">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="*****"
                  id="password"
                  // value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit" id="btn-primary">
                  Update
                </button>
                <Link to="/home">
                  <button type="button" id="btn-warning">
                    {' '}
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
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
    editUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
