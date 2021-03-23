import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import updateUser from '../../store/user'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }
  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editUser(this.state)
  }

  render() {
    const {firstName, lastName, email, password} = this.state

    return (
      <div className="container">
        <form>
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
              placeholder="*****"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <Link to="/home">
              <button type="button" className="btn btn-warning">
                {' '}
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.defaultUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
